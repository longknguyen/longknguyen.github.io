package com.longnguyen.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longnguyen.portfolio.email.ContactEmailService;
import com.longnguyen.portfolio.email.EmailDeliveryException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContactController.class)
@Import(CorsConfig.class)
class ContactControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ContactEmailService contactEmailService;

    @MockitoBean
    private ContactRateLimiter contactRateLimiter;

    @BeforeEach
    void allowContactRequestsByDefault() {
        given(contactRateLimiter.tryAcquire(anyString())).willReturn(true);
    }

    @Test
    void acceptsAndNormalizesAValidContactRequest() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody("  sender@example.com  ", "  Hello there.  ")))
                .andExpect(status().isOk())
                .andExpect(content().string("Message sent successfully. A confirmation email is on its way."));

        verify(contactEmailService).send(argThat(form ->
                "sender@example.com".equals(form.getEmail()) && "Hello there.".equals(form.getMessage())
        ));
    }

    @Test
    void rejectsAnInvalidEmailAddress() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody("not-an-email", "Hello there.")))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(
                        "Enter a valid email address and a message of 5,000 characters or fewer."
                ));

        verifyNoInteractions(contactEmailService);
    }

    @Test
    void rejectsAnOversizedMessage() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody("sender@example.com", "a".repeat(5001))))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(contactEmailService);
    }

    @Test
    void rejectsMalformedJsonWithoutInvokingEmailDelivery() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("The request body is invalid."));

        verifyNoInteractions(contactEmailService);
    }

    @Test
    void permitsTheProductionCorsOrigin() throws Exception {
        mockMvc.perform(options("/api/contact")
                        .header("Origin", "https://longuyen.co.uk")
                        .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://longuyen.co.uk"));
    }

    @Test
    void rejectsRequestsThatExceedTheRateLimit() throws Exception {
        given(contactRateLimiter.tryAcquire(anyString())).willReturn(false);

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody("sender@example.com", "Hello there.")))
                .andExpect(status().isTooManyRequests())
                .andExpect(content().string(
                        "Too many messages were sent recently. Please wait a few minutes and try again."
                ));

        verifyNoInteractions(contactEmailService);
    }

    @Test
    void doesNotExposeProviderErrors() throws Exception {
        doThrow(new EmailDeliveryException("Sensitive provider response"))
                .when(contactEmailService)
                .send(any(ContactForm.class));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody("sender@example.com", "Hello there.")))
                .andExpect(status().isBadGateway())
                .andExpect(content().string(
                        "The email service is temporarily unavailable. Please try again shortly."
                ));
    }

    private String requestBody(String email, String message) throws Exception {
        return objectMapper.writeValueAsString(Map.of("email", email, "message", message));
    }
}

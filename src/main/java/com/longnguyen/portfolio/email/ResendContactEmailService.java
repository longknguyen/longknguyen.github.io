package com.longnguyen.portfolio.email;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.longnguyen.portfolio.ContactForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class ResendContactEmailService implements ContactEmailService {
    private static final Logger logger = LoggerFactory.getLogger(ResendContactEmailService.class);

    private final ObjectMapper objectMapper;
    private final EmailTemplateRenderer templateRenderer;
    private final HttpClient httpClient;
    private final String apiBaseUrl;
    private final String apiKey;
    private final String toEmail;
    private final String fromEmail;

    public ResendContactEmailService(
            ObjectMapper objectMapper,
            EmailTemplateRenderer templateRenderer,
            @Value("${resend.api.base-url:https://api.resend.com}") String apiBaseUrl,
            @Value("${resend.api.key:}") String apiKey,
            @Value("${portfolio.contact.to-email:wnc2zb@virginia.edu}") String toEmail,
            @Value("${portfolio.contact.from-email:}") String fromEmail
    ) {
        this.objectMapper = objectMapper;
        this.templateRenderer = templateRenderer;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.toEmail = toEmail == null ? "" : toEmail.trim();
        this.fromEmail = fromEmail == null ? "" : fromEmail.trim();
    }

    @Override
    public void send(ContactForm form) {
        validateConfiguration();

        try {
            dispatch(buildOwnerNotificationRequest(form));
            dispatch(buildSenderConfirmationRequest(form));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new EmailDeliveryException("Email delivery was interrupted. Please try again.", e);
        } catch (IOException e) {
            throw new EmailDeliveryException("Could not reach the email provider. Please try again.", e);
        }
    }

    private void validateConfiguration() {
        if (apiKey.isBlank()) {
            throw new EmailDeliveryException("Email delivery is not configured yet. Missing RESEND_API_KEY.");
        }

        if (fromEmail.isBlank()) {
            throw new EmailDeliveryException("Email delivery is not configured yet. Missing CONTACT_FROM_EMAIL.");
        }

        if (toEmail.isBlank()) {
            throw new EmailDeliveryException("Email delivery is not configured yet. Missing CONTACT_TO_EMAIL.");
        }
    }

    private SendEmailRequest buildOwnerNotificationRequest(ContactForm form) {
        String html = templateRenderer.render("owner-notification.html", buildTemplateValues(form));
        String text = "New contact form submission%n%nFrom: %s%n%nMessage:%n%s"
                .formatted(form.getEmail(), form.getMessage().trim());

        return new SendEmailRequest(
                fromEmail,
                List.of(toEmail),
                "New portfolio enquiry from " + form.getEmail(),
                html,
                text,
                form.getEmail()
        );
    }

    private SendEmailRequest buildSenderConfirmationRequest(ContactForm form) {
        String html = templateRenderer.render("sender-confirmation.html", buildTemplateValues(form));
        String text = """
                Thanks for reaching out.

                Your message was received successfully and I will follow up as soon as I can.

                Copy of your message:
                %s

                Direct contact: %s
                """.formatted(form.getMessage().trim(), toEmail);

        return new SendEmailRequest(
                fromEmail,
                List.of(form.getEmail().trim()),
                "Thanks for reaching out to Long Nguyen",
                html,
                text,
                toEmail
        );
    }

    private Map<String, String> buildTemplateValues(ContactForm form) {
        return Map.of(
                "{{senderEmail}}", escapeHtml(form.getEmail().trim()),
                "{{senderMessageHtml}}", escapeHtml(form.getMessage().trim()).replace("\n", "<br/>"),
                "{{contactRecipientEmail}}", escapeHtml(toEmail)
        );
    }

    private void dispatch(SendEmailRequest payload) throws IOException, InterruptedException {
        String requestBody = objectMapper.writeValueAsString(payload);

        HttpRequest request = HttpRequest.newBuilder(URI.create(apiBaseUrl + "/emails"))
                .timeout(Duration.ofSeconds(15))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            String errorMessage = extractErrorMessage(response.body());
            logger.error("Resend email request failed with status {}: {}", response.statusCode(), errorMessage);
            throw new EmailDeliveryException(errorMessage);
        }
    }

    private String extractErrorMessage(String responseBody) {
        if (responseBody == null || responseBody.isBlank()) {
            return "Failed to send email.";
        }

        try {
            JsonNode root = objectMapper.readTree(responseBody);
            if (root.hasNonNull("message") && !root.get("message").asText().isBlank()) {
                return root.get("message").asText();
            }
        } catch (IOException ignored) {
            // Fall back to the raw response body when the provider response is plain text.
        }

        return responseBody.trim();
    }

    private String escapeHtml(String value) {
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private record SendEmailRequest(
            String from,
            List<String> to,
            String subject,
            String html,
            String text,
            @JsonProperty("reply_to") String replyTo
    ) {
    }
}

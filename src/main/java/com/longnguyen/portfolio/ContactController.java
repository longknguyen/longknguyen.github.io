package com.longnguyen.portfolio;

import com.longnguyen.portfolio.email.ContactEmailService;
import com.longnguyen.portfolio.email.EmailDeliveryException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private static final String DELIVERY_ERROR_MESSAGE =
            "The email service is temporarily unavailable. Please try again shortly.";
    private static final String RATE_LIMIT_ERROR_MESSAGE =
            "Too many messages were sent recently. Please wait a few minutes and try again.";

    private final ContactEmailService contactEmailService;
    private final ContactRateLimiter contactRateLimiter;

    public ContactController(ContactEmailService contactEmailService, ContactRateLimiter contactRateLimiter) {
        this.contactEmailService = contactEmailService;
        this.contactRateLimiter = contactRateLimiter;
    }

    @PostMapping
    public ResponseEntity<String> handleContactForm(
            @Valid @RequestBody ContactForm form,
            HttpServletRequest request
    ) {
        if (!contactRateLimiter.tryAcquire(request.getRemoteAddr())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(RATE_LIMIT_ERROR_MESSAGE);
        }

        try {
            contactEmailService.send(form);
        } catch (EmailDeliveryException e) {
            logger.error("Contact form email delivery failed", e);
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(DELIVERY_ERROR_MESSAGE);
        }

        return ResponseEntity.ok("Message sent successfully. A confirmation email is on its way.");
    }
}

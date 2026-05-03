package com.longnguyen.portfolio;

import com.longnguyen.portfolio.email.ContactEmailService;
import com.longnguyen.portfolio.email.EmailDeliveryException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactEmailService contactEmailService;

    public ContactController(ContactEmailService contactEmailService) {
        this.contactEmailService = contactEmailService;
    }

    @PostMapping
    public ResponseEntity<String> handleContactForm(@RequestBody ContactForm form) {
        if (form.getEmail() == null || form.getEmail().isEmpty() ||
                form.getMessage() == null || form.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Email and message are required.");
        }

        try {
            contactEmailService.send(form);
        } catch (EmailDeliveryException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

        return ResponseEntity.ok("Message sent successfully. A confirmation email is on its way.");
    }
}

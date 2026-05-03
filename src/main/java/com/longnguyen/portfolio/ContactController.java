package com.longnguyen.portfolio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderAddress;

    @PostMapping
    public ResponseEntity<String> handleContactForm(@RequestBody ContactForm form) {
        if (form.getEmail() == null || form.getEmail().isEmpty() ||
                form.getMessage() == null || form.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Email and message are required.");
        }

        // Prepare email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(senderAddress);
        mailMessage.setReplyTo(form.getEmail());
        mailMessage.setTo("wnc2zb@virginia.edu");  // receiving email
        mailMessage.setSubject("New Contact Form Submission from " + form.getEmail());
        mailMessage.setText(form.getMessage() + "\n\nFrom: " + form.getEmail());

        try {
            mailSender.send(mailMessage);
        } catch (Exception e) {
            logger.error("Failed to send contact form email from {}", form.getEmail(), e);
            return ResponseEntity.status(500).body("Failed to send email.");
        }

        return ResponseEntity.ok("Message received. Thank you!");
    }
}

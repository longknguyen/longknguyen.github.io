package com.longnguyen.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<String> handleContactForm(@RequestBody ContactForm form) {
        if (form.getEmail() == null || form.getEmail().isEmpty() ||
                form.getMessage() == null || form.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Email and message are required.");
        }

        // Prepare email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("wnc2zb@virginia.edu");  // receiving email
        mailMessage.setSubject("New Contact Form Submission from " + form.getEmail());
        mailMessage.setText(form.getMessage() + "\n\nFrom: " + form.getEmail());

        try {
            mailSender.send(mailMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send email.");
        }

        return ResponseEntity.ok("Message received. Thank you!");
    }
}

package com.longnguyen.portfolio.email;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class EmailTemplateRenderer {
    private final Map<String, String> templateCache = new ConcurrentHashMap<>();

    public String render(String templateName, Map<String, String> replacements) {
        String template = templateCache.computeIfAbsent(templateName, this::loadTemplate);
        String rendered = template;

        for (Map.Entry<String, String> entry : replacements.entrySet()) {
            rendered = rendered.replace(entry.getKey(), entry.getValue());
        }

        return rendered;
    }

    private String loadTemplate(String templateName) {
        ClassPathResource resource = new ClassPathResource("email-templates/" + templateName);

        try (InputStream inputStream = resource.getInputStream()) {
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("Could not load email template: " + templateName, e);
        }
    }
}

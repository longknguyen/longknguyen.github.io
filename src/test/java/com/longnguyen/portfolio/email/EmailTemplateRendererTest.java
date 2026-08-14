package com.longnguyen.portfolio.email;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class EmailTemplateRendererTest {
    private final EmailTemplateRenderer renderer = new EmailTemplateRenderer();

    @Test
    void replacesEveryOwnerNotificationPlaceholder() {
        String rendered = renderer.render("owner-notification.html", Map.of(
                "{{senderEmail}}", "sender@example.com",
                "{{senderMessageHtml}}", "Hello<br/>there",
                "{{contactRecipientEmail}}", "owner@example.com"
        ));

        assertThat(rendered)
                .contains("sender@example.com", "Hello<br/>there")
                .doesNotContain("{{senderEmail}}", "{{senderMessageHtml}}", "{{contactRecipientEmail}}");
    }
}

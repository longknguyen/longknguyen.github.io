import {EmailLayout, emailBlockStyles} from '../components/EmailLayout';

type ContactOwnerNotificationEmailProps = {
    senderEmail: string;
    senderMessageHtml: string;
};

export const ContactOwnerNotificationEmail = ({
    senderEmail,
    senderMessageHtml
}: ContactOwnerNotificationEmailProps) => {
    return (
        <EmailLayout
            preview={`New portfolio enquiry from ${senderEmail}`}
            eyebrow="Portfolio Contact"
            title="A new message just came in"
            footerNote="This notification was sent from your portfolio contact form."
        >
            <p style={emailBlockStyles.intro}>
                Someone reached out through your website. You can reply directly to this message and it will go back to the sender.
            </p>

            <div style={emailBlockStyles.card}>
                <p style={emailBlockStyles.label}>Sender</p>
                <p style={emailBlockStyles.muted}>
                    <a href={`mailto:${senderEmail}`} style={emailBlockStyles.emailLink}>
                        {senderEmail}
                    </a>
                </p>
            </div>

            <div style={emailBlockStyles.messageCard}>
                <p style={emailBlockStyles.label}>Message</p>
                <p style={emailBlockStyles.messageText} dangerouslySetInnerHTML={{__html: senderMessageHtml}}/>
            </div>
        </EmailLayout>
    );
};

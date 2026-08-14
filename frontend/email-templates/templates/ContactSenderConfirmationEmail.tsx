import {EmailLayout, emailBlockStyles} from '../components/EmailLayout';

type ContactSenderConfirmationEmailProps = {
    senderEmail: string;
    senderMessageHtml: string;
    contactRecipientEmail: string;
};

export const ContactSenderConfirmationEmail = ({
    senderEmail,
    senderMessageHtml,
    contactRecipientEmail
}: ContactSenderConfirmationEmailProps) => {
    return (
        <EmailLayout
            preview="Your message has been received."
            eyebrow="Message Received"
            title="Thanks for reaching out"
            footerNote="You received this confirmation because a message was sent through the Long Nguyen portfolio site."
        >
            <p style={emailBlockStyles.intro}>
                Hi {senderEmail}, your message came through successfully. I have included a copy below so you know exactly what was sent.
            </p>

            <div style={emailBlockStyles.messageCard}>
                <p style={emailBlockStyles.label}>Your message</p>
                <p style={emailBlockStyles.messageText}>{senderMessageHtml}</p>
            </div>

            <div style={emailBlockStyles.card}>
                <p style={emailBlockStyles.label}>What happens next</p>
                <ul style={emailBlockStyles.bulletList}>
                    <li>I will read your message and follow up as soon as I can.</li>
                    <li>If you need to add anything, you can reply to this email.</li>
                    <li>
                        Direct contact:
                        {' '}
                        <a href={`mailto:${contactRecipientEmail}`} style={emailBlockStyles.emailLink}>
                            {contactRecipientEmail}
                        </a>
                    </li>
                </ul>
            </div>

            <div style={emailBlockStyles.chip}>
                Confirmation sent to
                {' '}
                <span style={emailBlockStyles.emphasis}>{senderEmail}</span>
            </div>
        </EmailLayout>
    );
};

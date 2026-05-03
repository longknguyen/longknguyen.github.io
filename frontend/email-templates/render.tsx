import {renderToStaticMarkup} from 'react-dom/server';
import {ContactOwnerNotificationEmail} from './templates/ContactOwnerNotificationEmail';
import {ContactSenderConfirmationEmail} from './templates/ContactSenderConfirmationEmail';

const placeholderTokens = {
    senderEmail: '{{senderEmail}}',
    senderMessageHtml: '{{senderMessageHtml}}',
    contactRecipientEmail: '{{contactRecipientEmail}}'
};

const renderDocument = (markup: string) => `<!DOCTYPE html>${markup}`;

export const renderEmailTemplates = () => ({
    'owner-notification.html': renderDocument(
        renderToStaticMarkup(
            <ContactOwnerNotificationEmail
                senderEmail={placeholderTokens.senderEmail}
                senderMessageHtml={placeholderTokens.senderMessageHtml}
            />
        )
    ),
    'sender-confirmation.html': renderDocument(
        renderToStaticMarkup(
            <ContactSenderConfirmationEmail
                senderEmail={placeholderTokens.senderEmail}
                senderMessageHtml={placeholderTokens.senderMessageHtml}
                contactRecipientEmail={placeholderTokens.contactRecipientEmail}
            />
        )
    )
});

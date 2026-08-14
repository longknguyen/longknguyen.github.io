import {renderToStaticMarkup} from 'react-dom/server';
import {ContactOwnerNotificationEmail} from './templates/ContactOwnerNotificationEmail';
import {ContactSenderConfirmationEmail} from './templates/ContactSenderConfirmationEmail';

const placeholderTokens = {
    senderEmail: '{{senderEmail}}',
    senderMessageHtml: '{{senderMessageHtml}}',
    contactRecipientEmail: '{{contactRecipientEmail}}'
};

const generatedNotice = '<!-- Generated from frontend/email-templates. Do not edit directly. -->';
const renderDocument = (markup: string) => `<!DOCTYPE html>${generatedNotice}${markup}`;

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

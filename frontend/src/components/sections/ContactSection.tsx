import {SendHorizonal} from 'lucide-react';
import {useState, type FormEvent} from 'react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionShell} from '@/components/ui/SectionShell';

type FormState = {
    email: string;
    message: string;
};

const initialState: FormState = {
    email: '',
    message: ''
};

const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const GENERIC_ERROR_MESSAGE = 'Something went wrong while sending the message. Please try again.';

class ContactRequestError extends Error {}

const configuredContactApiBaseUrl = import.meta.env.VITE_CONTACT_API_URL?.trim().replace(/\/$/, '') ?? '';
const isLocalPreview = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const defaultProductionContactApiBaseUrl = 'https://czerny1728-github-io.onrender.com';
const contactApiBaseUrl = configuredContactApiBaseUrl || (isLocalPreview ? '' : defaultProductionContactApiBaseUrl);
const contactApiEndpoint = `${contactApiBaseUrl}/api/contact`;

export const ContactSection = () => {
    const [formState, setFormState] = useState<FormState>(initialState);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('Send a message and I will get back to you.');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('loading');
        setStatusMessage('Sending your message...');

        try {
            const response = await fetch(contactApiEndpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: formState.email.trim(),
                    message: formState.message.trim()
                })
            });
            const responseMessage = (await response.text()).trim();

            if (!response.ok) {
                throw new ContactRequestError(responseMessage || GENERIC_ERROR_MESSAGE);
            }

            setFormState(initialState);
            setStatus('success');
            setStatusMessage(responseMessage || 'Message sent successfully. Thanks for reaching out.');
        } catch (error) {
            setStatus('error');
            setStatusMessage(
                error instanceof ContactRequestError
                    ? error.message
                    : GENERIC_ERROR_MESSAGE
            );
        }
    };

    return (
        <SectionShell id="contact" title="Contact" className="pb-28 sm:pb-32">
            <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
                <Reveal className="h-full" direction="up" delay={90}>
                    <div className="contact-card flex h-full flex-col gap-8 p-7 sm:p-8">
                        <div>
                            <p className="label-text text-xs font-semibold uppercase tracking-[0.22em]">Direct contact</p>
                            <h3 className="heading-text mt-3 break-all text-2xl font-bold">wnc2zb@virginia.edu</h3>
                            <p className="body-copy mt-4 text-sm leading-7">
                                Contact me for any enquiries regarding opportunities, collaborations or projects.
                            </p>
                        </div>

                        <div
                            className="status-panel mt-auto rounded-[1.25rem] p-5"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <p className="label-text text-xs font-semibold uppercase tracking-[0.22em]">Status</p>
                            <p className={`mt-3 text-sm leading-7 ${
                                status === 'error' ? 'status-error' : status === 'success' ? 'status-success' : 'body-copy'
                            }`}>
                                {statusMessage}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="h-full" direction="up" delay={160}>
                    <form
                        className="contact-card flex h-full flex-col gap-4 p-7 sm:p-8"
                        aria-busy={status === 'loading'}
                        onSubmit={handleSubmit}
                    >
                        <label className="block">
                            <span className="heading-text mb-2 block text-sm font-semibold">Your email</span>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={formState.email}
                                onChange={(event) => setFormState((current) => ({...current, email: event.target.value}))}
                                required
                                maxLength={MAX_EMAIL_LENGTH}
                                className="form-input"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="flex flex-1 flex-col">
                            <span className="heading-text mb-2 block text-sm font-semibold">Your message</span>
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={(event) => setFormState((current) => ({...current, message: event.target.value}))}
                                required
                                maxLength={MAX_MESSAGE_LENGTH}
                                rows={6}
                                className="form-input min-h-44 max-h-72 resize-none overflow-y-auto"
                                placeholder="Tell me about the idea, role, or project you have in mind."
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="primary-button mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <SendHorizonal className={`h-4 w-4 ${status === 'loading' ? 'animate-pulse' : ''}`}/>
                            {status === 'loading' ? 'Sending...' : 'Send message'}
                        </button>
                    </form>
                </Reveal>
            </div>
        </SectionShell>
    );
};

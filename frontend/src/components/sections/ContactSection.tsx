import {Mail, SendHorizonal} from 'lucide-react';
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

export const ContactSection = () => {
    const [formState, setFormState] = useState<FormState>(initialState);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('Send a message and I will get back to you.');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setStatus('loading');
        setStatusMessage('Sending your message...');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            setFormState(initialState);
            setStatus('success');
            setStatusMessage('Message sent successfully. Thanks for reaching out.');
        } catch (error) {
            setStatus('error');
            setStatusMessage('Something went wrong while sending the message. Please try again.');
        }
    };

    return (
        <SectionShell
            title="Contact"
            icon={Mail}
        >
            <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
                <Reveal className="h-full" direction="left" delay={160}>
                    <div className="glass-panel flex h-full flex-col gap-8 p-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-blue-100/68">Direct contact</p>
                            <h3 className="mt-3 text-2xl font-semibold text-white">wnc2zb@virginia.edu</h3>
                            <p className="mt-4 text-sm leading-7 text-blue-50/78">
                                Contact me for any enquiries regarding opportunities, collaborations or projects.
                            </p>
                        </div>

                        <div className="mt-auto rounded-[1.5rem] border border-white/16 bg-white/10 p-5">
                            <p className="text-xs uppercase tracking-[0.28em] text-blue-100/68">Status</p>
                            <p
                                className={`mt-3 text-sm leading-7 ${
                                    status === 'error' ? 'text-rose-100' : status === 'success' ? 'text-emerald-100' : 'text-blue-50/78'
                                }`}
                            >
                                {statusMessage}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="h-full" direction="right" delay={260}>
                    <form className="glass-panel flex h-full flex-col gap-4 p-6" onSubmit={handleSubmit}>
                        <label className="block shrink-0">
                            <span className="mb-2 block text-sm font-medium text-blue-50/82">Your email</span>
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={(event) => setFormState((current) => ({
                                    ...current,
                                    email: event.target.value
                                }))}
                                required
                                className="form-input"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="flex min-h-0 flex-1 flex-col">
                            <span className="mb-2 block text-sm font-medium text-blue-50/82">Your message</span>
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={(event) => setFormState((current) => ({
                                    ...current,
                                    message: event.target.value
                                }))}
                                required
                                rows={6}
                                className="form-input h-full min-h-40 max-h-72 resize-none overflow-y-auto"
                                placeholder="Tell me about the idea, role, or project you have in mind."
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-auto inline-flex items-center gap-2 rounded-full border border-white/18 bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
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

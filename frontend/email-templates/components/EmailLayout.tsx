import type {ReactNode} from 'react';

type EmailLayoutProps = {
    preview: string;
    title: string;
    eyebrow: string;
    children: ReactNode;
    footerNote?: ReactNode;
};

const colors = {
    page: '#eff6ff',
    card: '#ffffff',
    border: '#dbeafe',
    text: '#102847',
    muted: '#476486',
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    band: '#0f2745'
};

const styles = {
    html: {
        backgroundColor: colors.page
    },
    body: {
        margin: '0',
        padding: '32px 16px',
        backgroundColor: colors.page,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: colors.text
    },
    preview: {
        display: 'none',
        overflow: 'hidden',
        lineHeight: '1px',
        opacity: '0',
        maxHeight: '0',
        maxWidth: '0'
    },
    shell: {
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        borderRadius: '28px',
        overflow: 'hidden',
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        boxShadow: '0 22px 55px rgba(15, 39, 69, 0.12)'
    },
    band: {
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #102847 0%, #1d4ed8 100%)'
    },
    eyebrow: {
        margin: '0',
        fontSize: '12px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'rgba(219, 234, 254, 0.84)'
    },
    title: {
        margin: '14px 0 0',
        fontSize: '28px',
        lineHeight: '1.25',
        fontWeight: '700',
        color: '#ffffff'
    },
    content: {
        padding: '32px'
    },
    footer: {
        padding: '0 32px 28px',
        fontSize: '13px',
        lineHeight: '1.7',
        color: colors.muted
    },
    footerDivider: {
        margin: '0 32px 24px',
        borderTop: `1px solid ${colors.border}`
    }
};

export const EmailLayout = ({preview, title, eyebrow, children, footerNote}: EmailLayoutProps) => {
    return (
        <html lang="en" style={styles.html}>
            <body style={styles.body}>
                <div style={styles.preview}>{preview}</div>
                <div style={styles.shell}>
                    <div style={styles.band}>
                        <p style={styles.eyebrow}>{eyebrow}</p>
                        <h1 style={styles.title}>{title}</h1>
                    </div>
                    <div style={styles.content}>{children}</div>
                    <div style={styles.footerDivider}/>
                    <div style={styles.footer}>
                        {footerNote ?? 'Long Nguyen Portfolio'}
                    </div>
                </div>
            </body>
        </html>
    );
};

export const emailBlockStyles = {
    intro: {
        margin: '0 0 18px',
        fontSize: '16px',
        lineHeight: '1.75',
        color: colors.text
    },
    muted: {
        margin: '0',
        fontSize: '15px',
        lineHeight: '1.75',
        color: colors.muted
    },
    label: {
        margin: '0 0 8px',
        fontSize: '12px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: colors.accent
    },
    card: {
        marginTop: '20px',
        padding: '20px 22px',
        borderRadius: '20px',
        backgroundColor: '#f8fbff',
        border: `1px solid ${colors.border}`
    },
    messageCard: {
        marginTop: '20px',
        padding: '22px',
        borderRadius: '22px',
        background: 'linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)',
        border: `1px solid ${colors.border}`
    },
    messageText: {
        margin: '0',
        fontSize: '15px',
        lineHeight: '1.8',
        color: colors.text,
        whiteSpace: 'normal' as const
    },
    bulletList: {
        margin: '18px 0 0',
        paddingLeft: '18px',
        color: colors.muted,
        fontSize: '15px',
        lineHeight: '1.8'
    },
    emailLink: {
        color: colors.accent,
        textDecoration: 'none'
    },
    chip: {
        display: 'inline-block',
        marginTop: '18px',
        padding: '8px 14px',
        borderRadius: '999px',
        backgroundColor: colors.accentSoft,
        color: colors.band,
        fontSize: '13px',
        fontWeight: '600'
    }
};

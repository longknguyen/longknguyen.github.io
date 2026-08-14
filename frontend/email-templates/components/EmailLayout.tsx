import type {ReactNode} from 'react';

type EmailLayoutProps = {
    preview: string;
    title: string;
    eyebrow: string;
    children: ReactNode;
    footerNote?: ReactNode;
};

const colors = {
    page: '#f4f5f7',
    surface: '#ffffff',
    surfaceSoft: '#f7f8fa',
    header: '#111827',
    headerMuted: '#c8d0dc',
    text: '#111827',
    muted: '#5f6978',
    subtle: '#7c8796',
    border: '#e2e6eb',
    borderStrong: '#cfd5dd',
    accent: '#2557d6',
    accentSoft: '#eaf0ff'
};

const styles = {
    html: {
        backgroundColor: colors.page
    },
    body: {
        margin: '0',
        padding: '32px 12px',
        backgroundColor: colors.page,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: colors.text
    },
    outerTable: {
        width: '100%',
        borderCollapse: 'collapse' as const
    },
    preview: {
        display: 'none',
        overflow: 'hidden',
        lineHeight: '1px',
        opacity: '0',
        maxHeight: '0',
        maxWidth: '0'
    },
    containerCell: {
        padding: '4px 0'
    },
    shellTable: {
        width: '100%',
        maxWidth: '640px',
        borderCollapse: 'separate' as const,
        borderSpacing: '0',
        backgroundColor: colors.surface,
        border: `1px solid ${colors.borderStrong}`,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 18px 50px rgba(15, 23, 42, 0.10)'
    },
    header: {
        padding: '30px 32px',
        backgroundColor: colors.header,
        borderBottom: `1px solid ${colors.header}`
    },
    headerTitleCell: {
        paddingRight: '20px',
        verticalAlign: 'middle' as const
    },
    monogramCell: {
        width: '54px',
        verticalAlign: 'middle' as const
    },
    monogram: {
        width: '52px',
        height: '52px',
        borderRadius: '999px',
        backgroundColor: colors.surface,
        color: colors.header,
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '52px',
        letterSpacing: '0.12em',
        textAlign: 'center' as const
    },
    eyebrow: {
        margin: '0',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: colors.headerMuted
    },
    title: {
        margin: '12px 0 0',
        fontSize: '27px',
        lineHeight: '1.25',
        fontWeight: '700',
        color: '#ffffff'
    },
    content: {
        padding: '30px 32px 32px',
        backgroundColor: colors.surface
    },
    footerDivider: {
        margin: '0 32px 18px',
        borderTop: `1px solid ${colors.border}`
    },
    footer: {
        padding: '0 32px 26px',
        fontSize: '12px',
        lineHeight: '1.7',
        color: colors.subtle
    }
};

export const EmailLayout = ({preview, title, eyebrow, children, footerNote}: EmailLayoutProps) => {
    return (
        <html lang="en" style={styles.html}>
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="color-scheme" content="light"/>
                <meta name="supported-color-schemes" content="light"/>
            </head>
            <body style={styles.body}>
                <div style={styles.preview}>{preview}</div>
                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={styles.outerTable}>
                    <tbody>
                        <tr>
                            <td align="center" style={styles.containerCell}>
                                <table
                                    role="presentation"
                                    width="640"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    style={styles.shellTable}
                                >
                                    <tbody>
                                        <tr>
                                            <td style={styles.header}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={styles.headerTitleCell}>
                                                                <p style={styles.eyebrow}>{eyebrow}</p>
                                                                <h1 style={styles.title}>{title}</h1>
                                                            </td>
                                                            <td style={styles.monogramCell}>
                                                                <div style={styles.monogram}>LN</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.content}>{children}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style={styles.footerDivider}/>
                                                <div style={styles.footer}>
                                                    {footerNote ?? 'Long Nguyen Portfolio'}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    );
};

export const emailBlockStyles = {
    intro: {
        margin: '0',
        fontSize: '16px',
        lineHeight: '1.7',
        color: colors.text
    },
    muted: {
        margin: '0',
        fontSize: '15px',
        lineHeight: '1.7',
        color: colors.muted
    },
    label: {
        margin: '0 0 8px',
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: colors.accent
    },
    card: {
        marginTop: '20px',
        padding: '18px 20px',
        borderRadius: '16px',
        backgroundColor: colors.surfaceSoft,
        border: `1px solid ${colors.border}`
    },
    messageCard: {
        marginTop: '20px',
        padding: '20px',
        borderRadius: '18px',
        backgroundColor: colors.surfaceSoft,
        border: `1px solid ${colors.border}`,
        borderLeft: `4px solid ${colors.accent}`
    },
    messageText: {
        margin: '0',
        fontSize: '15px',
        lineHeight: '1.75',
        color: colors.text,
        whiteSpace: 'normal' as const
    },
    bulletList: {
        margin: '14px 0 0',
        paddingLeft: '20px',
        color: colors.muted,
        fontSize: '15px',
        lineHeight: '1.75'
    },
    emailLink: {
        color: colors.accent,
        textDecoration: 'none',
        fontWeight: '600'
    },
    chip: {
        display: 'inline-block',
        marginTop: '18px',
        padding: '8px 13px',
        borderRadius: '999px',
        backgroundColor: colors.accentSoft,
        border: `1px solid ${colors.border}`,
        color: colors.accent,
        fontSize: '13px',
        fontWeight: '600'
    },
    emphasis: {
        color: colors.accent
    }
};

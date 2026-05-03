import type {ReactNode} from 'react';

type EmailLayoutProps = {
    preview: string;
    title: string;
    eyebrow: string;
    children: ReactNode;
    footerNote?: ReactNode;
};

const colors = {
    page: '#071933',
    pageMid: '#102847',
    pageEnd: '#050b16',
    shell: '#0c1b32',
    shellEdge: '#27496f',
    text: '#f8fbff',
    muted: '#b9cae3',
    accent: '#8bc4ff',
    accentStrong: '#4aa3ff',
    accentSoft: '#123761',
    panel: '#112748',
    panelDeep: '#0d203c',
    divider: '#1e3d63',
    orbA: '#2d69c7',
    orbB: '#183c6f',
    orbC: '#96d7ff'
};

const styles = {
    html: {
        backgroundColor: colors.page
    },
    body: {
        margin: '0',
        padding: '32px 16px',
        backgroundColor: colors.page,
        backgroundImage: `radial-gradient(circle at top, #284a7a 0%, ${colors.pageMid} 34%, ${colors.page} 72%, ${colors.pageEnd} 100%)`,
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
        padding: '6px 0'
    },
    shellTable: {
        width: '100%',
        maxWidth: '640px',
        borderCollapse: 'separate' as const,
        borderSpacing: '0',
        backgroundColor: colors.shell,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 18%, rgba(8,17,31,0.88) 100%)',
        border: `1px solid ${colors.shellEdge}`,
        borderRadius: '30px',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(3, 9, 19, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
    },
    band: {
        padding: '24px 28px 22px',
        background: 'linear-gradient(135deg, rgba(18,42,75,0.96) 0%, rgba(21,62,118,0.94) 58%, rgba(74,163,255,0.34) 100%)',
        borderBottom: `1px solid ${colors.divider}`
    },
    heroTitleCell: {
        paddingRight: '14px'
    },
    orbCell: {
        width: '118px',
        verticalAlign: 'middle' as const
    },
    eyebrow: {
        margin: '0',
        fontSize: '12px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'rgba(219, 234, 254, 0.8)'
    },
    title: {
        margin: '14px 0 0',
        fontSize: '26px',
        lineHeight: '1.25',
        fontWeight: '700',
        color: '#ffffff'
    },
    orbWrap: {
        textAlign: 'right' as const,
        fontSize: '0',
        lineHeight: '0',
        whiteSpace: 'nowrap' as const
    },
    orbLarge: {
        display: 'inline-block',
        width: '66px',
        height: '66px',
        borderRadius: '999px',
        backgroundColor: colors.orbA,
        backgroundImage: `radial-gradient(circle at 30% 30%, ${colors.orbC} 0%, ${colors.accentStrong} 22%, ${colors.orbA} 56%, ${colors.orbB} 100%)`,
        border: '1px solid rgba(219,234,254,0.26)',
        verticalAlign: 'middle' as const
    },
    orbMedium: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        borderRadius: '999px',
        backgroundColor: '#20549d',
        backgroundImage: 'radial-gradient(circle at 30% 30%, #d8f1ff 0%, #8bc4ff 28%, #20549d 100%)',
        border: '1px solid rgba(219,234,254,0.2)',
        marginLeft: '-12px',
        marginTop: '28px',
        verticalAlign: 'top' as const
    },
    content: {
        padding: '26px 28px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)'
    },
    footer: {
        padding: '0 28px 24px',
        fontSize: '13px',
        lineHeight: '1.7',
        color: colors.muted
    },
    footerDivider: {
        margin: '0 28px 20px',
        borderTop: `1px solid ${colors.divider}`
    }
};

export const EmailLayout = ({preview, title, eyebrow, children, footerNote}: EmailLayoutProps) => {
    return (
        <html lang="en" style={styles.html}>
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
                                            <td style={styles.band}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={styles.heroTitleCell}>
                                                                <p style={styles.eyebrow}>{eyebrow}</p>
                                                                <h1 style={styles.title}>{title}</h1>
                                                            </td>
                                                            <td style={styles.orbCell}>
                                                                <div style={styles.orbWrap}>
                                                                    <span style={styles.orbLarge}/>
                                                                    <span style={styles.orbMedium}/>
                                                                </div>
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
        padding: '18px 20px',
        borderRadius: '20px',
        backgroundColor: colors.panel,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 16%, rgba(5,11,22,0.18) 100%)',
        border: `1px solid ${colors.shellEdge}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 12px 28px rgba(4, 11, 23, 0.16)'
    },
    messageCard: {
        marginTop: '20px',
        padding: '20px',
        borderRadius: '22px',
        background: 'linear-gradient(180deg, rgba(98,177,255,0.18) 0%, rgba(24,51,91,0.72) 24%, rgba(9,20,38,0.86) 100%)',
        border: `1px solid ${colors.shellEdge}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 34px rgba(3, 9, 19, 0.2)'
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
        border: `1px solid ${colors.shellEdge}`,
        color: colors.text,
        fontSize: '13px',
        fontWeight: '600'
    },
    emphasis: {
        color: colors.accentStrong
    }
};

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
    pageHighlight: '#284a7a',
    pageMid: '#102847',
    pageEnd: '#050b16',
    shell: '#0c1b32',
    shellEdge: 'rgba(191, 219, 254, 0.18)',
    shellInset: 'rgba(255, 255, 255, 0.08)',
    text: '#f8fbff',
    muted: 'rgba(219, 234, 254, 0.74)',
    accent: '#8bc4ff',
    accentStrong: '#4aa3ff',
    accentSoft: 'rgba(74, 163, 255, 0.18)',
    panel: 'rgba(255, 255, 255, 0.07)',
    panelDeep: 'rgba(9, 20, 38, 0.78)',
    panelGlow: 'rgba(255, 255, 255, 0.04)',
    divider: 'rgba(191, 219, 254, 0.14)'
};

const styles = {
    html: {
        backgroundColor: colors.page
    },
    body: {
        margin: '0',
        padding: '32px 16px',
        backgroundColor: colors.page,
        backgroundImage: `radial-gradient(circle at top, ${colors.pageHighlight} 0%, ${colors.pageMid} 34%, ${colors.page} 72%, ${colors.pageEnd} 100%)`,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: colors.text
    },
    canvas: {
        position: 'relative' as const,
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '26px 0'
    },
    preview: {
        display: 'none',
        overflow: 'hidden',
        lineHeight: '1px',
        opacity: '0',
        maxHeight: '0',
        maxWidth: '0'
    },
    pageOrbTop: {
        position: 'absolute' as const,
        top: '-12px',
        left: '24px',
        width: '240px',
        height: '240px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(74,163,255,0.34) 0%, rgba(74,163,255,0.08) 42%, rgba(74,163,255,0) 74%)'
    },
    pageOrbRight: {
        position: 'absolute' as const,
        top: '110px',
        right: '-10px',
        width: '220px',
        height: '220px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(191,219,254,0.16) 0%, rgba(191,219,254,0.05) 46%, rgba(191,219,254,0) 76%)'
    },
    pageOrbBottom: {
        position: 'absolute' as const,
        bottom: '-8px',
        left: '50%',
        marginLeft: '-160px',
        width: '320px',
        height: '160px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(54,122,214,0.26) 0%, rgba(54,122,214,0.05) 44%, rgba(54,122,214,0) 76%)'
    },
    shell: {
        position: 'relative' as const,
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        borderRadius: '30px',
        overflow: 'hidden',
        backgroundColor: colors.shell,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 18%, rgba(8,17,31,0.88) 100%)',
        border: `1px solid ${colors.shellEdge}`,
        boxShadow: '0 30px 80px rgba(3, 9, 19, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
    },
    shellOrbLeft: {
        position: 'absolute' as const,
        top: '96px',
        left: '-90px',
        width: '220px',
        height: '220px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(74,163,255,0.22) 0%, rgba(74,163,255,0.08) 36%, rgba(74,163,255,0) 70%)'
    },
    shellOrbRight: {
        position: 'absolute' as const,
        top: '-30px',
        right: '-40px',
        width: '210px',
        height: '210px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(219,234,254,0.14) 0%, rgba(219,234,254,0.05) 34%, rgba(219,234,254,0) 72%)'
    },
    shellGrid: {
        position: 'absolute' as const,
        inset: '0',
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 22%, rgba(255,255,255,0.015) 100%)',
        pointerEvents: 'none' as const
    },
    band: {
        position: 'relative' as const,
        padding: '30px 32px 26px',
        background: 'linear-gradient(135deg, rgba(18,42,75,0.96) 0%, rgba(21,62,118,0.94) 58%, rgba(74,163,255,0.34) 100%)',
        borderBottom: `1px solid ${colors.divider}`
    },
    bandGlow: {
        position: 'absolute' as const,
        top: '-56px',
        right: '-28px',
        width: '220px',
        height: '220px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(139,196,255,0.34) 0%, rgba(139,196,255,0.10) 42%, rgba(139,196,255,0) 74%)'
    },
    bandGlowLeft: {
        position: 'absolute' as const,
        bottom: '-78px',
        left: '-38px',
        width: '190px',
        height: '190px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(74,163,255,0.20) 0%, rgba(74,163,255,0.07) 36%, rgba(74,163,255,0) 72%)'
    },
    eyebrow: {
        position: 'relative' as const,
        margin: '0',
        fontSize: '12px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'rgba(219, 234, 254, 0.8)'
    },
    title: {
        position: 'relative' as const,
        margin: '14px 0 0',
        fontSize: '28px',
        lineHeight: '1.25',
        fontWeight: '700',
        color: '#ffffff'
    },
    content: {
        position: 'relative' as const,
        padding: '30px 32px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)'
    },
    contentGlow: {
        position: 'absolute' as const,
        top: '18px',
        right: '24px',
        width: '180px',
        height: '180px',
        borderRadius: '999px',
        background: 'radial-gradient(circle, rgba(74,163,255,0.10) 0%, rgba(74,163,255,0.04) 38%, rgba(74,163,255,0) 74%)'
    },
    footer: {
        position: 'relative' as const,
        padding: '0 32px 28px',
        fontSize: '13px',
        lineHeight: '1.7',
        color: colors.muted
    },
    footerDivider: {
        margin: '0 32px 24px',
        borderTop: `1px solid ${colors.divider}`
    }
};

export const EmailLayout = ({preview, title, eyebrow, children, footerNote}: EmailLayoutProps) => {
    return (
        <html lang="en" style={styles.html}>
        <body style={styles.body}>
        <div style={styles.preview}>{preview}</div>
        <div style={styles.canvas}>
            <div style={styles.pageOrbTop}/>
            <div style={styles.pageOrbRight}/>
            <div style={styles.pageOrbBottom}/>
            <div style={styles.shell}>
                <div style={styles.shellOrbLeft}/>
                <div style={styles.shellOrbRight}/>
                <div style={styles.shellGrid}/>
                <div style={styles.band}>
                    <div style={styles.bandGlow}/>
                    <div style={styles.bandGlowLeft}/>
                    <p style={styles.eyebrow}>{eyebrow}</p>
                    <h1 style={styles.title}>{title}</h1>
                </div>
                <div style={styles.content}>
                    <div style={styles.contentGlow}/>
                    {children}
                </div>
                <div style={styles.footerDivider}/>
                <div style={styles.footer}>
                    {footerNote ?? 'Long Nguyen Portfolio'}
                </div>
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
        backgroundColor: colors.panel,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 18%, rgba(5,11,22,0.20) 100%)',
        border: `1px solid ${colors.shellEdge}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 12px 28px rgba(4, 11, 23, 0.16)'
    },
    messageCard: {
        marginTop: '20px',
        padding: '22px',
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

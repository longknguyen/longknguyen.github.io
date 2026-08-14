type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
};

export const SectionHeading = ({eyebrow, title, description}: SectionHeadingProps) => {
    return (
        <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
                <p className="section-eyebrow text-xs font-semibold uppercase tracking-[0.24em]">{eyebrow}</p>
            ) : null}
            <h2 className={`section-title text-3xl font-bold tracking-tight sm:text-4xl ${eyebrow ? 'mt-3' : ''}`}>
                {title}
            </h2>
            {description ? <p className="section-description mt-3 text-base leading-7">{description}</p> : null}
            <span className="section-heading-line mx-auto mt-5 block" aria-hidden="true"/>
        </div>
    );
};

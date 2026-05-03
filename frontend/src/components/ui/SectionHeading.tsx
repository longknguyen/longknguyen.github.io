type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
};

export const SectionHeading = ({eyebrow, title, description}: SectionHeadingProps) => {
    return (
        <div className="max-w-2xl" data-reveal="up">
            {eyebrow ?
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-blue-100/70">{eyebrow}</p> : null}
            <h2 className={`${eyebrow ? 'mt-4' : ''} text-3xl font-semibold tracking-tight text-white sm:text-4xl`}>{title}</h2>
            {description ? <p className="mt-4 text-base leading-8 text-blue-50/78">{description}</p> : null}
        </div>
    );
};

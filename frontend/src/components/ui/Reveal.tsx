import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';

type RevealProps = {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'left' | 'right' | 'scale';
    delay?: number;
};

type RevealStyle = CSSProperties & {
    '--reveal-delay': string;
};

export const Reveal = ({children, className = '', direction = 'up', delay = 0}: RevealProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, {rootMargin: '0px 0px -10% 0px', threshold: 0.12});

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            data-reveal={direction}
            data-visible={isVisible}
            style={{'--reveal-delay': `${delay}ms`} as RevealStyle}
            className={className}
        >
            {children}
        </div>
    );
};

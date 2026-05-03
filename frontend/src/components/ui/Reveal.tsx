import type {ReactNode} from 'react';

type RevealProps = {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'left' | 'right' | 'scale';
    delay?: number;
};

export const Reveal = ({children, className = '', direction = 'up', delay = 0}: RevealProps) => {
    return (
        <div
            data-reveal={direction}
            data-visible="true"
            style={{['--reveal-delay' as string]: `${delay}ms`}}
            className={className}
        >
            {children}
        </div>
    );
};

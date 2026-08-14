import {useEffect, useRef} from 'react';

type Particle = {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
};

const LINK_DISTANCE = 130;
const POINTER_DISTANCE = 165;

const randomVelocity = () => (Math.random() - 0.5) * 0.48;

export const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        const context = canvas?.getContext('2d');

        if (!canvas || !container || !context) {
            return;
        }

        const pointer = {x: -1000, y: -1000, active: false};
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let particles: Particle[] = [];
        let width = 0;
        let height = 0;
        let animationFrame = 0;

        const createParticles = () => {
            const count = Math.min(76, Math.max(34, Math.round((width * height) / 15000)));
            particles = Array.from({length: count}, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                velocityX: randomVelocity(),
                velocityY: randomVelocity(),
                radius: 1 + Math.random() * 1.25
            }));
        };

        const resizeCanvas = () => {
            const bounds = container.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = bounds.width;
            height = bounds.height;
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            createParticles();
        };

        const drawLine = (fromX: number, fromY: number, toX: number, toY: number, opacity: number) => {
            context.beginPath();
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            context.lineWidth = 0.8;
            context.stroke();
        };

        const draw = () => {
            context.clearRect(0, 0, width, height);

            particles.forEach((particle, index) => {
                if (!prefersReducedMotion) {
                    particle.x += particle.velocityX;
                    particle.y += particle.velocityY;

                    if (particle.x <= 0 || particle.x >= width) {
                        particle.velocityX *= -1;
                    }
                    if (particle.y <= 0 || particle.y >= height) {
                        particle.velocityY *= -1;
                    }
                }

                for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
                    const other = particles[otherIndex];
                    const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

                    if (distance < LINK_DISTANCE) {
                        drawLine(
                            particle.x,
                            particle.y,
                            other.x,
                            other.y,
                            (1 - distance / LINK_DISTANCE) * 0.18
                        );
                    }
                }

                const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
                const isNearPointer = pointer.active && pointerDistance < POINTER_DISTANCE;

                if (isNearPointer) {
                    drawLine(
                        particle.x,
                        particle.y,
                        pointer.x,
                        pointer.y,
                        (1 - pointerDistance / POINTER_DISTANCE) * 0.52
                    );
                }

                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius * (isNearPointer ? 1.45 : 1), 0, Math.PI * 2);
                context.fillStyle = `rgba(255, 255, 255, ${isNearPointer ? 0.82 : 0.42})`;
                context.fill();
            });

            if (!prefersReducedMotion) {
                animationFrame = window.requestAnimationFrame(draw);
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            const bounds = container.getBoundingClientRect();
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
            pointer.active = true;
        };

        const handlePointerLeave = () => {
            pointer.active = false;
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
            if (prefersReducedMotion) {
                draw();
            }
        });

        resizeObserver.observe(container);
        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);
        resizeCanvas();
        draw();

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true"/>;
};

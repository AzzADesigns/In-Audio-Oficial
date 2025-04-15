import { useRef, ReactNode, useEffect, useState, useCallback } from "react";

interface Props {
    children: ReactNode;
}

export const Effect: React.FC<Props> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
    const mousePosition = useRef({ x: 0, y: 0 });
    const colorToggle = useRef(false);
    const [isXL, setIsXL] = useState(window.innerWidth >= 1280);

    console.log("rere")
    useEffect(() => {
        const handleResize = () => setIsXL(window.innerWidth >= 1280);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const updateCells = useCallback(() => {
        if (!isXL || !containerRef.current) return;

        const cols = 10;
        const rows = 10;
        const cellWidth = containerRef.current.clientWidth / cols;
        const cellHeight = containerRef.current.clientHeight / rows;

        cellsRef.current.forEach((cell, index) => {
            if (!cell) return;

            const cellX = (index % cols) * cellWidth + cellWidth / 2;
            const cellY = Math.floor(index / cols) * cellHeight + cellHeight / 2;
            const distance = Math.sqrt(
                Math.pow(mousePosition.current.x - cellX, 2) +
                Math.pow(mousePosition.current.y - cellY, 2)
            );

            const color1 = "#D9D9D9";
            const color2 = "#00FFCC";
            const animatedColor = colorToggle.current ? color1 : color2;

            cell.style.boxShadow = distance < 200
                ? `0 0 18px 2px ${animatedColor}`
                : 'none';
        });

        requestAnimationFrame(updateCells);
    }, [isXL]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isXL || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, [isXL]);

    useEffect(() => {
        if (!isXL) return;

        window.addEventListener("mousemove", handleMouseMove);
        const animationId = requestAnimationFrame(updateCells);

        const interval = setInterval(() => {
            colorToggle.current = !colorToggle.current;
        }, 500);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
            clearInterval(interval);
        };
    }, [isXL, handleMouseMove, updateCells]);

    const setCellRef = (index: number) => (el: HTMLDivElement | null) => {
        cellsRef.current[index] = el;
    };

    return (
        <div
            ref={containerRef}
            className="bg-primary h-[95%] w-[95%] flex-center relative overflow-hidden"
        >
            {isXL && (
                <div className="absolute inset-0 grid  grid-cols-10 grid-rows-10 gap-10 z-0">
                    {Array.from({ length: 100 }).map((_, index) => (
                        <div
                            key={index}
                            ref={setCellRef(index)}
                            className="w-full aspect-square shadow-2xl rounded-4xl"
                            style={{
                                transition: "transform 0.2s ease-in-out, box-shadow 0.01s linear",
                            }}
                        />
                    ))}
                </div>
            )}
            {children}
        </div>
    );
};








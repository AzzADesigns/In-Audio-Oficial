import { useState, useEffect, useRef, useCallback, memo } from "react";

interface CubeGridProps {
    cols: number;
    rows: number;
    color?: string;
}

const CubeGridComponent: React.FC<CubeGridProps> = ({ cols, rows, color }) => {
    
    const STAGES = 3;
    const ANIMATION_SPEED = 0.1;
    const STAGE_DURATION = 200;

    const [currentHeights, setCurrentHeights] = useState<number[]>(Array(cols).fill(0));
    const [targetHeights, setTargetHeights] = useState<number[]>(Array(cols).fill(0));
    const [stage, setStage] = useState<number>(0);

    const animationRef = useRef<number>(0); 
    const lastUpdateTimeRef = useRef<number>(0); 


    const lerp = useCallback((start: number, end: number, t: number): number => {
        return start + (end - start) * t;
    }, []);

    const generateTargetHeights = useCallback((): number[] => {
        const timeFactor = Math.sin(Date.now() / 300); 
        switch (stage) {
            case 0:
                return Array.from({ length: cols }, (_, i) => 
                    Math.floor(Math.sin((i / cols + timeFactor * 50) * Math.PI * 20) * (rows - 10))
                );
            case 1:
                return Array.from({ length: cols }, (_, i) => 
                    Math.floor(Math.sin((i + timeFactor) * Math.PI * 500) * (rows / 100) + Math.random() * (rows / 0.4))
                );
            default:
                return Array.from({ length: cols }, (_, i) => 
                    Math.floor(Math.sin(timeFactor * (i + 1)) * 3 + Math.random() * (rows / 3))
                );
        }
    }, [stage, cols, rows]);

    useEffect(() => {
        const updateStage = () => {
            setStage((prev) => (prev + 1) % STAGES);
            setTargetHeights(generateTargetHeights());
        };

        const interval = setInterval(updateStage, STAGE_DURATION);
        return () => clearInterval(interval);
    }, [generateTargetHeights]);

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (timestamp - lastUpdateTimeRef.current > 16) {
                setCurrentHeights((prev) =>
                    prev.map((current, i) =>
                        Math.abs(current - targetHeights[i]) < 0.1
                            ? targetHeights[i]
                            : lerp(current, targetHeights[i], ANIMATION_SPEED)
                    )
                );
                lastUpdateTimeRef.current = timestamp;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [targetHeights, lerp]);

    return (
        <div
            className="grid w-fit h-fit"
            style={{
                gridTemplateColumns: `repeat(${cols}, 10px)`,
                gridTemplateRows: `repeat(${rows}, 10px)`,
                gap: '3px',
            }}
        >
            {Array.from({ length: cols * rows }).map((_, i) => {
                const colIndex = i % cols;
                const rowIndex = Math.floor(i / cols);
                const isActive = rowIndex >= rows - Math.round(currentHeights[colIndex]);

                return (
                    <div
                        key={`${colIndex}-${rowIndex}`}
                        className={`w-[6px] h-[6px] transition-opacity duration-100 ${isActive ? `bg-${color} opacity-100` : "opacity-0"}`}
                    />
                );
            })}
        </div>
    );
};

export const CubeGrid = memo(CubeGridComponent)
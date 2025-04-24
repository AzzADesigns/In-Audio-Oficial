import { useEffect, useState } from "react";

interface UnavailableMessageProps {
    trigger: boolean;
    duration?: number;
}

const UnavailableMessage: React.FC<UnavailableMessageProps> = ({ trigger, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (trigger) {
            setVisible(true);
            const timeout = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timeout);
        }
    }, [trigger, duration]);

    if (!visible) return null;

    return (
        <div className="absolute bottom-52 lg:bottom-28 left-1/2 transform -translate-x-1/2 p-4 bg-primary text-tertiary border border-secundary rounded-lg shadow-md">
            Available soon
        </div>
    );
};

export default UnavailableMessage;

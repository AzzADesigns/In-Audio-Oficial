interface MarqueeItemProps {
    text: string;
}

export const MarqueeItem: React.FC<MarqueeItemProps> = ({ text }) => {
    return (
        <div className="marquee-container w-72 flex">
            <p className="marquee-track flex justify-between gap-5">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </p>
        </div>
    );
};

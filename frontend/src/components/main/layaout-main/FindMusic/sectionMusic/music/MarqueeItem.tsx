interface MarqueeItemProps {
    text: string;
}

export const MarqueeItem: React.FC<MarqueeItemProps> = ({ text }) => {
    return (
        <div className="marquee-container w-32 md:w-40 lg:w-52  xl:w-72 2xl:w-80 flex">
            <p className="marquee-track flex justify-between gap-5 text-sm md:text-lg lg:text-xl 2xl:text-2xl ">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </p>
        </div>
    );
};

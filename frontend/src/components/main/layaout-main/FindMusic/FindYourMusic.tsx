import { PromotionAndMusic } from "./sectionMusic/PromotionAndMusic";
import "./titleMaquee.css";
import React, { RefObject } from "react";

interface ListenToMusicProps {
    musicRef: RefObject<HTMLDivElement | null>; 
}

export const ListenToMusic: React.FC<ListenToMusicProps> = ({ musicRef }) => {
    const titleText = "Find your favorite music";

    const titleRepeats = Array(6).fill(titleText);

    return (
        <div className="w-full">
            <div>
                <h1 className="text-4xl md:text-7xl 2xl:text-8xl font-dots text-tertiary bg-primary mb-10 marquee-container-find">
                    <div className="marquee-track-find gap-52">
                        {titleRepeats.map((text, index) => (
                            <div key={index} className="[&_div]:ml-70">
                                <span className="text-secundary">{text.charAt(0)}</span>{text.slice(1)}
                            </div>
                        ))}
                    </div>
                </h1>
            </div>
            <PromotionAndMusic musicRef={musicRef} />
        </div>
    );
};

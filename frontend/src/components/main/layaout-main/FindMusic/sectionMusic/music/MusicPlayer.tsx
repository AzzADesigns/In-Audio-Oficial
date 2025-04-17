import React, { useRef, useState } from 'react';
import {MarqueeItem} from "./MarqueeItem"
import { FaPlay } from "react-icons/fa6";
import "./MusicPlayer.css";
import { IoMdPause } from "react-icons/io";

interface MusicPlayerProps {
    title: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, artist, album, audioUrl }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTogglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false); 
    };

    return (
        <div className="text-2xl text-tertiary flex justify-between items-center border-t-2 gap-6 lg:gap-10 h-20 bg-primary">
            <section className="flex w-10">
                <button
                    onClick={handleTogglePlay}
                    className="px-3 py-1 rounded cursor-pointer"
                >
                    {isPlaying ? <IoMdPause /> : <FaPlay />}
                </button>
            </section>

            <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleEnded}
            ></audio>

            <MarqueeItem text={title} />
            <p>-</p>
            <MarqueeItem text={artist} />
            <p>-</p>
            <MarqueeItem text={album} />
        </div>
    );
};

import React, { useRef } from 'react';
import { MarqueeItem } from "./MarqueeItem";
import { FaPlay } from "react-icons/fa6";
import "./MusicPlayer.css";
import { IoMdPause } from "react-icons/io";
import { useAudio } from '../../../../../../contexts/AudioContext';


interface MusicPlayerProps {
    title: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, artist, album, audioUrl }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { currentAudio, setCurrentAudio, isPlaying, setIsPlaying } = useAudio();

    const handleTogglePlay = () => {
        if (!audioRef.current) return;

        if (currentAudio === audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentAudio) {
                currentAudio.pause();
            }
            setCurrentAudio(audioRef.current); 
            audioRef.current.play();
            setIsPlaying(true);
        }
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
                    {isPlaying && currentAudio === audioRef.current ? <IoMdPause /> : <FaPlay />}
                </button>
            </section>

            <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} />
            <MarqueeItem text={title} />
            <p>-</p>
            <MarqueeItem text={artist} />
            <p>-</p>
            <MarqueeItem text={album} />
        </div>
    );
};


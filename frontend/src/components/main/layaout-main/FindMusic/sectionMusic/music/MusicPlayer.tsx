import React from 'react';
import { MarqueeItem } from "./MarqueeItem";
import { FaPlay } from "react-icons/fa6";
import { IoMdPause } from "react-icons/io";
import { useAudio } from '../../../../../../contexts/AudioContext';
import "./MusicPlayer.css";

interface MusicPlayerProps {
    title: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, artist, album, audioUrl }) => {
    const { currentAudio, isPlaying, playTrack, trackList, setCurrentIndex, pauseTrack } = useAudio();

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            const index = trackList.findIndex(track => track.audioUrl === audioUrl);
            if (index !== -1) {
                setCurrentIndex(index);
                playTrack(trackList[index]);
            }
        }
    };

    const isThisTrackPlaying = currentAudio?.src === audioUrl && isPlaying;

    return (
        <div className="text-2xl text-tertiary flex justify-between items-center border-t-2 gap-6 lg:gap-10 h-20 bg-primary">
            <section className="flex w-10">
                <button
                    onClick={handlePlayPause}
                    className="px-3 py-1 rounded cursor-pointer"
                >
                    {isThisTrackPlaying ? <IoMdPause /> : <FaPlay />}
                </button>
            </section>

            <MarqueeItem text={title} />
            <p>-</p>
            <MarqueeItem text={artist} />
            <p>-</p>
            <MarqueeItem text={album} />
        </div>
    );
};

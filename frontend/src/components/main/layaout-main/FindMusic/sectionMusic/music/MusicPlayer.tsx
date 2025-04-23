import React from 'react';
import { MarqueeItem } from "./MarqueeItem";
import { FaPlay } from "react-icons/fa6";
import { IoMdPause } from "react-icons/io";
import { useAudio } from '../../../../../../contexts/AudioContext';
import "./MusicPlayer.css";

interface MusicPlayerProps {
    title: string;
    artist: string;
    genre: string;
    audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, artist, genre, audioUrl }) => {
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
        <div className="text-2xl w-full text-tertiary flex justify-between items-center border-t-2 gap-6 lg:gap-10 h-20 bg-primary">
            <section className="flex w-10">
                <button
                    onClick={handlePlayPause}
                    className="px-3 py-1 rounded cursor-pointer w-10 h-10"
                >
                    {isThisTrackPlaying ? <IoMdPause  className='w-8 h-8'/> : <FaPlay  className='w-8 h-8 hover:text-secundary hover:scale-110 hover:transition-all'/>}
                </button>
            </section>

            <MarqueeItem text={title} />
            <p>-</p>
            <p className=' w-40 md:w-32 lg:w-36 justify-center  xl:w-72 2xl:w-80 flex text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl  mr-5'>{artist}</p>
            <p className='hidden xl:flex'>-</p>
            <p className=' w-28 md:w-32 lg:w-36 justify-center  xl:w-72 2xl:w-80 xl:flex text-xs md:text-lg lg:text-lg xl:text-lg  2xl:text-2xl  hidden mr-5'>{genre[0]}</p>
        </div>
    );
};

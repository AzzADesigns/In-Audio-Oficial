import { RiLoginCircleFill } from "react-icons/ri";
import { BsMusicNoteList, BsFillPlayCircleFill, BsSkipBackward, BsSkipForward, BsPauseCircleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioContext";
import { motion } from 'framer-motion';
import React from "react";
import { FaMusic } from "react-icons/fa6";

const liIcons: JSX.Element[] = [
    <RiLoginCircleFill className="w-9 h-9 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <BsMusicNoteList className="w-10 h-10 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <IoSettings className="w-8 h-8 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
];

const liWords: string[] = [
    "Login",
    "Play Music",
    "Settings",
];

interface NavBarProps {
    scrollToMusic?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ scrollToMusic }) => {
    const [navItems, setNavItems] = useState<(string | JSX.Element)[]>([]);
    const { currentAudio, currentTrackInfo, setIsPlaying, isPlaying, nextTrack, prevTrack } = useAudio();
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const updateNavbar = () => {
            setNavItems(window.innerWidth >= 1536 ? liWords : liIcons);
        };

        updateNavbar();
        window.addEventListener("resize", updateNavbar);
        return () => window.removeEventListener("resize", updateNavbar);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (currentAudio) {
            interval = setInterval(() => {
                setProgress(currentAudio.currentTime / currentAudio.duration || 0);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [currentAudio]);

    const handlePlayPause = () => {
        if (!currentAudio) return;
        if (isPlaying) {
            currentAudio.pause();
            setIsPlaying(false);
        } else {
            currentAudio.play();
            setIsPlaying(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentAudio) return;
        const newTime = parseFloat(e.target.value) * currentAudio.duration;
        currentAudio.currentTime = newTime;
        setProgress(newTime / currentAudio.duration);
    };
    return (
        <motion.nav
            className={`fixed bottom-0 w-[80%] lg:w-[36%] z-50 bg-black/50 backdrop-blur-xl border-b-4 flex flex-col justify-center items-center border-secundary text-tertiary shadow-lg rounded-4xl xl:rounded-sm transition-all ${
                currentTrackInfo ? "h-52 xl:bottom-[80%]" : "h-20 xl:bottom-[90%]"
            }`}
            transition={{
                layout: {
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.5,
                },
            }}
        >
            <div className="w-full mx-auto flex flex-col justify-center items-center md:h-20 px-6 mt-5">
                <ul className={`w-[90%] justify-between flex items-center ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'}`}>
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                            onClick={() => {
                                if ((typeof item === "string" && item === "Play Music") || index === 1) {
                                    if (scrollToMusic) {
                                        scrollToMusic();
                                    }
                                }
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col items-center gap-2 mt-4 w-full">
                    {currentTrackInfo ? (
                        <>
                            <p className="text-sm text-center flex gap-5 items-center">
                                <FaMusic className="text-secundary" /> {currentTrackInfo.title} - {currentTrackInfo.artist}
                            </p>

                            <div className="flex gap-3 items-center">
                                {/* Botón de retroceder */}
                                <button
                                    onClick={prevTrack}
                                    className="px-4 py-2 text-secundary hover:text-tertiary cursor-pointer"
                                >
                                    <BsSkipBackward className="w-8 h-8" />
                                </button>

                                {/* Botón de play/pause */}
                                <button
                                    onClick={handlePlayPause}
                                    className="px-4 py-2 text-secundary hover:text-tertiary cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <BsPauseCircleFill className="w-8 h-8" />
                                    ) : (
                                        <BsFillPlayCircleFill className="w-8 h-8" />
                                    )}
                                </button>

                                {/* Botón de avanzar */}
                                <button
                                    onClick={nextTrack}
                                    className="px-4 py-2 text-secundary hover:text-tertiary cursor-pointer"
                                >
                                    <BsSkipForward className="w-8 h-8" />
                                </button>
                            </div>
                            <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.001}
                                    value={progress}
                                    onChange={handleSeek}
                                    className="w-full accent-secundary cursor-pointer"
                                />
                        </>
                    ) : null}
                </div>
            </div>
        </motion.nav>
    );
};

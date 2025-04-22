import { RiLoginCircleFill } from "react-icons/ri";
import { BsMusicNoteList, BsFillPlayCircleFill, BsSkipBackward, BsSkipForward, BsPauseCircleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioContext";
import { motion } from 'framer-motion';
import React from "react";
import { FaMusic } from "react-icons/fa6";

const liIcons: JSX.Element[] = [
    <RiLoginCircleFill className="w-5 h-5 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <BsMusicNoteList className="w-7 h-7 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <IoSettings className="w-5 h-5 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
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
    const [showMessage, setShowMessage] = useState(false);
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

    const showUnavailableMessage = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000); // Mensaje desaparece después de 3 segundos
    };

    return (
        <motion.nav
            layout
            className={`fixed bottom-16 w-[70%] max-w-[1200px] xl:w-[40%] 2xl:w-[45%] z-50 bg-black/50 backdrop-blur-xl border-t-4 flex flex-col justify-between border-secundary text-tertiary shadow-lg rounded-4xl transition-all ${
                currentTrackInfo ? 'py-3' : 'py-6'
            }`}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                }
            }}
        >
            {/* Card de mensaje de "Función aún no disponible" */}
            {showMessage && (
                <div className="absolute bottom-52 lg:bottom-28 left-1/2 transform -translate-x-1/2 p-4 bg-primary text-tertiary border border-secundary rounded-lg shadow-md">
                    Poximamente
                </div>
            )}

            <motion.div
                layout
                className={`flex justify-center items-center w-full mb-4 ${
                    currentTrackInfo ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                } transition-all duration-500`}
            >
                {/* CONTROLADORA DE SONIDO */}
                {currentTrackInfo && (
                    <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-4 px-4">
                        <div className="text-xs max-w-52 md:text-sm text-center flex gap-2 items-center text-tertiary">
                            <FaMusic className="text-secundary w-5 h-5 " /> 
                            <p className="w-40">{currentTrackInfo.title} - {currentTrackInfo.artist}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button onClick={prevTrack} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
                                <BsSkipBackward className="w-8 h-8" />
                            </button>
                            <button onClick={handlePlayPause} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
                                {isPlaying ? (
                                    <BsPauseCircleFill className="w-8 h-8" />
                                ) : (
                                    <BsFillPlayCircleFill className="w-8 h-8" />
                                )}
                            </button>
                            <button onClick={nextTrack} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
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
                            className="w-full md:w-1/2 accent-secundary cursor-pointer"
                        />
                    </div>
                )}
            </motion.div>

            {/* BARRA DE NAVEGACION */}
            <div className="w-full flex justify-center items-center">
                <ul className={`flex ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'} justify-between w-full px-5 items-center`}>
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                            onClick={() => {
                                if (index === 0 || index === 2) { // Login or Settings
                                    showUnavailableMessage();
                                } else if ((typeof item === "string" && item === "Play Music") || index === 1) {
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
            </div>
        </motion.nav>
    );
};

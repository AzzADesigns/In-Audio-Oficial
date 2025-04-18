import { RiLoginCircleFill } from "react-icons/ri";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioContext";
import { motion } from 'framer-motion';

const liIcons = [
    <RiLoginCircleFill className="w-9 h-9 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <BsFillPlayCircleFill className="w-10 h-10 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <IoSettings className="w-8 h-8 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
];

const liWords: string[] = [
    "Login",
    "Play Music",
    "Settings",
];

export const NavBar = () => {
    const [navItems, setNavItems] = useState<(string | JSX.Element)[]>([]);
    const { currentAudio, currentTrackInfo, setIsPlaying, isPlaying, nextTrack, prevTrack } = useAudio();
    const [progress, setProgress] = useState(0); // valor de 0 a 1

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

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <motion.nav className={`fixed bottom-0  w-[80%] lg:w-[36%] z-50 bg-black/50 backdrop-blur-xl border-b-4 flex flex-col justify-center items-center border-secundary text-tertiary shadow-lg rounded-4xl xl:rounded-sm transition-all  ${currentTrackInfo ? "h-52 xl:bottom-[80%] " : "h-20 xl:bottom-[90%]"} `}
        
        transition={{
            layout: { 
                type: "tween", 
                ease: "easeInOut", 
                duration: 0.5 
            }
        }}
        >
            <div className="w-full mx-auto flex flex-col justify-center items-center md:h-20 px-6 mt-5">
                <ul className={`w-[90%] justify-between flex items-center ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'}`}>
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                        >
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Reproductor de música */}
                <div className="flex flex-col items-center gap-2 mt-4 w-full">
                    {currentTrackInfo ? (
                        <>
                            <p className="text-sm text-center">
                                🎵 {currentTrackInfo.title} - {currentTrackInfo.artist}
                            </p>

                            {/* Controles Play/Pause */}
                            <button
                                onClick={handlePlayPause}
                                className="text-4xl text-secundary hover:scale-110 transition-all duration-300"
                            >
                                {isPlaying ? <BsPauseCircleFill /> : <BsFillPlayCircleFill />}
                            </button>

                            {/* Barra de progreso */}
                            <div className="flex items-center gap-2 w-full px-4">
                                <span className="text-xs">
                                    {currentAudio ? formatTime(currentAudio.currentTime) : "0:00"}
                                </span>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.001}
                                    value={progress}
                                    onChange={handleSeek}
                                    className="w-full accent-secundary"
                                />
                                <span className="text-xs">
                                    {currentAudio ? formatTime(currentAudio.duration) : "0:00"}
                                </span>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </motion.nav>
    );
};
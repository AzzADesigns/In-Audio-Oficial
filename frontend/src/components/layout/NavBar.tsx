import { useEffect, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import AudioControls from "./AudioControls";
import UnavailableMessage from "./UnavailableMessage";
import { BsMusicNoteList } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useAudio } from "../../contexts/AudioContext";

const liIcons: JSX.Element[] = [
    <RiLoginCircleFill className="w-5 h-5 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <BsMusicNoteList className="w-7 h-7 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
    <IoMdSettings className="w-5 h-5 text-tertiary hover:text-secundary hover:scale-105 transition-all duration-300" />,
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
    const [progress, setProgress] = useState(0);
    const { currentAudio } = useAudio();

    useEffect(() => {
        if (!currentAudio) return;
    
        const updateProgress = () => {
            if (currentAudio.duration) {
                setProgress(currentAudio.currentTime / currentAudio.duration);
            }
        };
    
        currentAudio.addEventListener("timeupdate", updateProgress);
    
        return () => {
            currentAudio.removeEventListener("timeupdate", updateProgress);
        };
    }, [currentAudio]);

    useEffect(() => {
        const updateNavbar = () => {
            setNavItems(window.innerWidth >= 1536 ? liWords : liIcons);
        };

        updateNavbar();
        window.addEventListener("resize", updateNavbar);
        return () => window.removeEventListener("resize", updateNavbar);
    }, []);

    const showUnavailableMessage = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
<motion.nav
    layout
    className="fixed bottom-16 w-[70%] max-w-[1200px] xl:w-[35%] 2xl:w-[35%] z-50 bg-black/50 backdrop-blur-xl border-t-4 flex flex-col justify-between border-secundary text-tertiary shadow-lg rounded-4xl transition-all py-6"
>
    {showMessage && <UnavailableMessage />}
    <AudioControls progress={progress} setProgress={setProgress} /> 

    <div className="w-full flex justify-center mt-5 items-center">
        <ul className={`flex ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'} justify-between w-full px-5 items-center`}>
            {navItems.map((item, index) => (
                <motion.li
                    key={index}
                    whileTap={{ scale: 0.9, opacity: 0.7}}
                    className="flex justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                    onClick={() => {
                        if (index === 0 || index === 2) {
                            showUnavailableMessage();
                        } else if ((typeof item === "string" && item === "Play Music") || index === 1) {
                            if (scrollToMusic) {
                                scrollToMusic();
                            }
                        }
                    }}
                >
                    {item}
                </motion.li>
            ))}
        </ul>
    </div>
</motion.nav>
    );
};

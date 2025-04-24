import { useState, useEffect } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import AudioControls from "./AudioControls";
import UnavailableMessage from "./UnavailableMessage";
import { BsMusicNoteList } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

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
    const [showLabels, setShowLabels] = useState<boolean[]>([false, false, false]);
    const [triggerUnavailable, setTriggerUnavailable] = useState(false);

    const showTemporaryLabel = (index: number) => {
        const updated = [...showLabels];
        updated[index] = true;
        setShowLabels(updated);

        setTimeout(() => {
            updated[index] = false;
            setShowLabels([...updated]);
        }, 2000);
    };

    const triggerMessage = () => {
        setTriggerUnavailable(false);
        setTimeout(() => setTriggerUnavailable(true), 0);
    };

    useEffect(() => {
        const updateNavbar = () => {
            setNavItems(window.innerWidth >= 1536 ? liWords : liIcons);
        };

        updateNavbar();
        window.addEventListener("resize", updateNavbar);
        return () => window.removeEventListener("resize", updateNavbar);
    }, []);

    return (
        <motion.nav
            layout
            className="fixed bottom-2 xl:bottom-16 w-[95%] max-w-[1200px] lg:w[75%] xl:w-[45%] 2xl:w-[35%] z-50 bg-black/50 backdrop-blur-xl border-t-4 flex flex-col justify-between border-secundary text-tertiary shadow-lg rounded-4xl transition-all py-6"
        >
            <UnavailableMessage trigger={triggerUnavailable} />
            <AudioControls />

            <div className="w-full flex justify-center mt-5 items-center">
                <ul className={`flex ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'} justify-between w-full px-5 items-center`}>
                    {navItems.map((item, index) => (
                        <motion.li
                            key={index}
                            whileTap={{ scale: 0.9, opacity: 0.7 }}
                            className="relative flex justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                            onClick={() => {
                                showTemporaryLabel(index);

                                if (index === 0 || index === 2) {
                                    triggerMessage();
                                } else if ((typeof item === "string" && item === "Play Music") || index === 1) {
                                    scrollToMusic?.();
                                }
                            }}
                        >
                            {item}
                            {navItems === liIcons && showLabels[index] && (
                                <span className="text-xs ml-2 rounded-lg bg-primaty text-secundary xl:hidden">
                                    {liWords[index]}
                                </span>
                            )}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

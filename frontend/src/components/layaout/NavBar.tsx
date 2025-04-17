import { RiLoginCircleFill } from "react-icons/ri";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const updateNavbar = () => {
            setNavItems(window.innerWidth >= 1536 ? liWords : liIcons);
        };

        updateNavbar();
        window.addEventListener("resize", updateNavbar);
        return () => window.removeEventListener("resize", updateNavbar);
    }, []);

    return (
        <nav className="fixed bottom-0  xl:bottom-[90%] w-[80%] lg:w-[36%] z-50 bg-black/50 backdrop-blur-xl border-b-4 border-secundary text-tertiary shadow-lg rounded-4xl xl:rounded-sm">
            <div>
                <img src="logo1.svg" alt="" />
            </div>
            <div className="max-w-7xl  mx-auto flex justify-center items-center h-16 md:h-20 px-6 ">
                <ul className={` w-[90%]  justify-between flex items-center ${navItems === liWords ? 'gap-12 text-lg' : 'gap-6'}`}>
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex  justify-center items-center cursor-pointer hover:text-secundary hover:scale-105 transition-all duration-300 font-uniq"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

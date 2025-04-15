import { RiLoginCircleFill } from "react-icons/ri";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";



const liIcons=[
    < RiLoginCircleFill className="w-9 h-9 text-tertiary hover:text-secundary hover:scale-105"/>,
    <BsFillPlayCircleFill className="w-10 h-10 text-tertiary hover:text-secundary hover:scale-105"/>,
    <IoSettings className="w-8 h-8 text-tertiary hover:text-secundary hover:scale-105"/>,
]

const liWords: string[] = [
    "Login",
    "Play Music",
    "Settings",
];

export const NavBar = () => {

    const [navItems, setNavItems] = useState<(string | JSX.Element)[]>([]);

    useEffect(() => {
        const updateNavbar = () => {
            setNavItems(window.innerWidth >= 1536 ? liWords : liIcons)
        };
    
        updateNavbar();
        window.addEventListener("resize",updateNavbar);
        return ()=> window.removeEventListener("resize", updateNavbar);
    },[])


    return (
        <div className="text-tertiary 
                        fixed bottom-2 2xl:bottom-32 
                        flex justify-center items-center 
                        bg-black/50 backdrop-blur-xl 
                        h-16 2xl:h-20 w-[80%] md:w-80 2xl:w-[40%]
                        px-5 2xl:px-16 
                        rounded-full 
                        border-4 border-secundary z-50">
            <ul className="flex w-full 2xl:w-full  lg:w-96 
                        justify-between items-center 
                        2xl:text-3xl 2xl:gap-0">
                {navItems.map((item, index) => (
                    <li key={index} 
                        className="flex justify-center items-center 
                                    2xl:w-auto
                                    cursor-pointer 
                                    hover:text-secundary hover:scale-105 
                                    transition-all duration-300 
                                    font-uniq">
                        {item}
                    </li>
                ))}
            </ul>
        </div>

    )
}

import { BsFillPlayCircleFill } from "react-icons/bs";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const Banner = () => {
    const { scrollYProgress } = useScroll();
    const pathProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });


    useEffect(() => {
        const img = new Image();
        img.src = "/banner.webp"; 
    }, []);

    return (
        <header className="flex-center h-[400px] lg:h-full  w-full 2xl:h-full ">
            <div className="2xl:w-full flex justify-between 2xl:pl-[23%] items-start 2xl:mr-12  2xl:pt-5">
                <img src="/banner.webp" alt="imagen del banner" className="mt-96 lg:mt-0" />
                <button className="2xl:mt-10 absolute xl:flex justify-center xl:ml-80 2xl:ml-0 xl:w-full 2xl:w-auto 2xl:top-0 2xl:relative mr-8 cursor-pointer text-tertiary hover:text-secundary">
                    <p className="xl:w-64 bg-primary  xl:ml-28 2xl:ml-5 gap-3 xl:h-32 xl:flex xl:justify-center xl:items-center 2xl:text-2xl font-dots underline underline-offset-10 decoration-4 transition-all duration-200 hidden 2xl:flex">
                        See genres <BsFillPlayCircleFill/>
                    </p>
                </button>
            </div>
            <figure className="absolute top-20 2xl:static 2xl:h-auto">
                <img
                    src="Logo1.webp"
                    alt=""
                    className="md:ml-[24%] 2xl:ml-0  2xl:absolute  2xl:left-[35%] 2xl:top-32 w-52 md:w-[50%] xl:w-[50%] 2xl:w-[30%]"
                />
            </figure>
            <blockquote className="absolute lg:w-10 xl:w-96 2xl:w-[500px] lg:top-[65%]  2xl:top-[30%] 2xl:left-0 left-[5%] bottom-0">
                <p className="hidden lg:flex text-tertiary z-10 relative bottom-96 2xl:bottom-60 2xl:left-16 text-xs md:text-lg 2xl:text-xl font-uniq tracking-[0.3em]">
                    “The sound of the unheard”
                </p>
            </blockquote>
            <figure className="flex justify-center  2xl:h-96">
                <svg 
                    width="100%" 
                    className="2xl:h-[900px] lg:h[300px] md:h-[250px] sm:h-[300px] xs:h-[200px] h-[200px]" 
                    viewBox="0 0 500 1000" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M250 0 C100 200, 400 300, 250 500 C50 700, 450 800, 250 1000"
                        stroke="#D9D9D9"
                        strokeWidth="10"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: pathProgress }}
                    />
                </svg>
            </figure>
        </header>
    );
};

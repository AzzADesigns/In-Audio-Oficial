import { BsFillPlayCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const Banner = () => {
    const { scrollYProgress } = useScroll();

    // Sensibilidad: cuanto menor sea el valor, más rápido se dibuja.
    const sensitivity = 0.1; 

    // Multiplicamos el scroll por un factor, y limitamos su valor a 1.
    const scaledProgress = useTransform(
        scrollYProgress,
        [0, sensitivity],
        [0, 1],
        { clamp: true }
    );

    const pathProgress = useSpring(scaledProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        const img = new Image();
        img.src = "banner.png"; 
    }, []);

    return (
        <header className="flex-center w-full h-full">
            <div className="h-96 md:h-[750px] 2xl:h-full w-full bg-red-200">
                <img src="/banner.png" alt="imagen del banner" className="w-full h-full object-cover" />

            </div>

            <figure className="absolute top-10 lg:top-24 2xl:static 2xl:h-auto">
                <img
                    src="Logo1.svg"
                    alt=""
                    className="md:ml-[24%] 2xl:ml-0 2xl:absolute 2xl:left-[35%] 2xl:top-32 w-52 md:w-[50%] xl:w-[50%] 2xl:w-[30%]"
                />
            </figure>

            <figure className="flex justify-center h-52 2xl:h-96">
                <svg width="100%" viewBox="0 0 500 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M250 0 C100 200, 400 300, 250 500 C50 700, 450 800, 250 1000"
                        stroke="#D9D9D9"
                        strokeWidth="20"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: pathProgress }}
                    />
                </svg>
            </figure>
        </header>
    );
};

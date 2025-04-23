import { memo } from "react";
import { Music } from "../uiEffects/musicEffect/Music";
import { motion } from "framer-motion";

export const Text = memo(() => {
    console.log('%cText render', 'color: orange');
    
    return (
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}  
            initial={{ opacity: 0, y: 50 }}     
            transition={{ duration: 0.8, ease: "easeOut" }}  
            className="w-full h-96 md:h-full bg-tertiary py-5 md:py-auto md:px-5 rounded-xl md:pb-10 xl:pb-14 xl:p-5 lg:h-max flex-center text-primary text-xs md:text-3xl lg:text-3xl xl:text-2xl 2xl:text-3xl font-dots"
        >
            <article className="leading-16 px-5 lg:px-0 2xl:leading-20 lg:tracking-wider">
                "Unleashing the 
                <motion.span
                    whileInView={{ opacity: 1, x: 0, scale: 1 }} 
                    initial={{ opacity: 0, x: -20, scale: 0.8 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex w-fit items-end text-primary"
                >
                    sound <span className="hidden lg:block"><Music/></span>  of tomorrow 
                </motion.span>
                <motion.span
                    whileInView={{ opacity: 1, x: 0, scale: 1 }} 
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}  
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-primary p-2 mr-2 ml-2 rounded-4xl text-secundary"
                >
                    empowering
                </motion.span> 
                artists, 
                <motion.span
                    whileInView={{ opacity: 1, x: 0, scale: 1 }} 
                    initial={{ opacity: 0, x: -20, scale: 0.8 }} 
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-primary p-2 mr-2 ml-2 rounded-4xl text-secundary"
                >
                    connecting
                </motion.span> global audiences, 
                and 
                <motion.span
                    whileInView={{ opacity: 1, x: 0, scale: 1 }} 
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}  
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-primary p-2 mr-2 ml-2 rounded-4xl text-secundary"
                >
                    redefining
                </motion.span> 
                the way we experience music.
                Discover a world where 
                <motion.span
                    whileInView={{ opacity: 1, x: 0, scale: 1 }} 
                    initial={{ opacity: 0, x: -20, scale: 0.8 }} 
                    transition={{ duration: 0.6, delay: 1 }}
                    className="bg-primary p-2 mr-2 ml-2 rounded-4xl text-secundary"
                >
                    every beat tells a story
                </motion.span>."
            </article>
        </motion.div>
    );
});

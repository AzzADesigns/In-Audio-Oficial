import { memo } from "react";
import { Carrusel } from "./carrusel/Carrusel";
import { Presentation } from "./TitleAndPresentation/Presentation";
import { TitleSectionGenre } from "./TitleAndPresentation/TitleSectionGenre";
import { motion } from "framer-motion";

export const OurGenres = memo(() => {
    return (
        <div className="w-full">
            <motion.section
                whileInView={{ opacity: 1, x: 0 }}  
                initial={{ opacity: 0, x: -50 }}    
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-16 lg:gap-20 xl:justify-between"
            >
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <TitleSectionGenre />
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }} 
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Presentation />
                </motion.div>
            </motion.section>
            <motion.section
                whileInView={{ opacity: 1, y: 0 }}  
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
                <Carrusel />
            </motion.section>
        </div>
    );
});


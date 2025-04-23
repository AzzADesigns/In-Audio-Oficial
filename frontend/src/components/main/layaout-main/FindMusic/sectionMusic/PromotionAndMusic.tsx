import React, { RefObject } from 'react';
import { motion } from 'framer-motion'; 
import { PromotionalMessage } from './promotion/PromotionalMessage';
import { ListMusic } from './music/ListMusic';


interface PromotionAndMusicProps {
    musicRef: RefObject<HTMLDivElement>;  
}

export const PromotionAndMusic: React.FC<PromotionAndMusicProps> = ({ musicRef }) => {
    return (
        <motion.section
            className="mt-10 xl:mt-52 flex flex-col-reverse md:flex-row bg-primary w-full justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}  
            transition={{ duration: 1 }}
        >
            <PromotionalMessage />
            <ListMusic ref={musicRef} />
        </motion.section>
    );
};

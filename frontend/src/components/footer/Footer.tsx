import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <motion.footer
            className="flex flex-col md:flex-row lg:h-14 md:justify-between w-full mt-20 lg:text-xl md:items-center text-tertiary text-md font-uniq mb-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <div className="">
                <motion.img
                    src="Logo1.svg"
                    alt=""
                    className="md:w-[80%]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                />
            </div>
            
            <section className="flex w-full justify-between mt-5">
                <motion.div
                    className="flex gap-5 lg:gap-7 justify-center xl:justify-end w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
                >
                    <p>Linkedin:{" "}
                        <a 
                            href="https://www.linkedin.com/in/azariel-moreno-4267ba254/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline cursor-pointer hover:text-secundary"
                        >
                            Azariel Moreno
                        </a>
                    </p>
                    <p>Github:{" "}
                        <a 
                            href="https://github.com/AzzADesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline cursor-pointer hover:text-secundary"
                        >
                            AzzADesigns
                        </a>
                    </p>
                </motion.div>
            </section>
        </motion.footer>
    );
};

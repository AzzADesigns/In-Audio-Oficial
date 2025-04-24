import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { genres } from "./data/gneres";

export const Carrusel = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [loadedImages, setLoadedImages] = useState(0);
    const wrapperRef = useRef<HTMLUListElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleImageLoad = () => {
        setLoadedImages((prev) => prev + 1);
    };

    useEffect(() => {
        if (!wrapperRef.current || loadedImages < genres.length) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        wrapperRef.current.style.setProperty(
            "--transition",
            "600ms cubic-bezier(0.22 , 0.61, 0.36, 1)"
        );

        timeoutRef.current = setTimeout(() => {
            wrapperRef.current?.style.removeProperty("--transition");
        }, 900);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [activeItem, loadedImages]);

    return (
        <div className='flex-center p-2 md:p-0 h-[1150px] md:h-[600px] w-full bg-tertiary rounded-4xl z-0 mt-10'>
            <div className="w-full max-w-full text-tertiary">
                <ul ref={wrapperRef} className="group flex flex-col md:flex-row justify-center h-[550px] gap-3">
                    {genres.map((genre, index) => (
                        <li
                            onClick={() => setActiveItem(index)}
                            aria-current={activeItem === index}
                            className={classNames(
                                "relative cursor-pointer md:w-[6%] md:first:w-[3%] md:last:w-[3%] md:[&[aria-current='true']]:w-[48%]",
                                "md:[transition:width_var(--transition,200ms_ease-in)]",
                                "before:hidden md:before-block before:absolute before:bg-red-300 before:top-0 before:bottom-0 before:left-[-10px] before:right-[-10px]",
                                "md:hover:w-[9%] md:[&:not(:hover):not(:first):not(:last)]:group-hover:w-[6%]"
                            )}
                            key={genre.genre}
                        >
                            <div className="relative overflow-hidden w-full h-full rounded-2xl">
                                <img
                                    onLoad={handleImageLoad}
                                    className={`${activeItem === index ? "" : "grayscale"} absolute w-24 h-auto md:w-[850px] right-0 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 md:h-[640px] object-cover`}
                                    src={genre.img}
                                    alt={genre.genre}
                                    width="850px"
                                    height="640px"
                                />
                                <div
                                    className={classNames(
                                        "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
                                        activeItem === index ? "md:opacity-100" : "md:opacity-0"
                                    )}
                                />
                                <div
                                    className={classNames(
                                        "left-0 top-72 md:w-[60%] xl:w-[600px] h-32 md:h-auto p-4 bg-primary transition-[transform,opacity] md:absolute md:p-5",
                                        activeItem === index
                                            ? "md:translate-x-0 md:opacity-100"
                                            : "md:translate-x-4 md:opacity-0"
                                    )}
                                >
                                    <p className="text-sm text-secundary uppercase font-dots md:text-lg">
                                        {genre.genre}
                                    </p>
                                    <p className="text-sm w-44 md:w-auto md:text-2xl text-tertiary font-uniq">
                                        {genre.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

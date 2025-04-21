import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { getMusic } from '../../../../../../api/getMusic';
import { useAudio } from '../../../../../../contexts/AudioContext';

interface PlayMusic {
    id: number;
    name: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const ListMusic = React.forwardRef<HTMLDivElement>((prop, ref) => {
    const [playMusic, setPlayMusic] = useState<PlayMusic[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { setTrackList, setOnEndReached } = useAudio();

    const fetchPlayMusic = async (newPage = page) => {
        setIsLoading(true);
        const data = await getMusic(newPage, 7);
        setPlayMusic(data);
        setTrackList(data.map(track => ({
            title: track.name,
            artist: track.artist,
            album: track.album,
            audioUrl: track.audioUrl
        })));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPlayMusic(page);
    }, [page]);

    useEffect(() => {
        setOnEndReached(() => () => {
            setPage(prev => prev + 1);
        });

        return () => setOnEndReached(null);
    }, [setOnEndReached]);

    return (
        <section ref={ref} className='xl:w-[68%] bg-primary'>
            <div>
                <h3 className='font-dots text-tertiary text-2xl md:text-3xl xl:text-6xl tracking-wider mb-10'>
                    <span className='text-secundary'>O</span>ur Music
                </h3>
            </div>

            <div className='w-full h-[660px] flex-center'>
                <div className='text-tertiary bg-primary w-full h-20 flex justify-between items-center font-uniq text-lg lg:text-3xl ml-12 p-10'>
                    <h2 className='lg:ml-9 xl:ml-20 2xl:ml-32'>Track</h2>
                    <h2 className='lg:mr-5'>Artist</h2>
                    <h2 className='xl:mr-14 2xl:mr-24'>Album</h2>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            className="text-tertiary text-2xl my-8 h-[600px] flex justify-center items-center font-dots"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Cargando...
                        </motion.div>
                    ) : (
                        <motion.div
                            key={page}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-[650px]"
                        >
                            {playMusic.map((file) => (
                                <div key={file.id} className='bg-primary h-20 w-full'>
                                    <MusicPlayer 
                                        title={file.name} 
                                        artist={file.artist} 
                                        album={file.album} 
                                        audioUrl={file.audioUrl} 
                                    />
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex justify-center lg:justify-end items-center  gap-4 mt-4">
                <button
                    className="px-4 py-2 bg-secundary text-primary rounded hover:bg-tertiary hover:text-primary transition cursor-pointer"
                    disabled={page === 1 || isLoading}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>
                <span className="text-tertiary text-lg">Página {page}</span>
                <button
                    className="px-4 py-2 bg-secundary text-primary rounded hover:bg-tertiary hover:text-primary  transition cursor-pointer"
                    disabled={isLoading}
                    onClick={() => setPage(page + 1)}
                >
                    Siguiente
                </button>
            </div>
        </section>
    );
});

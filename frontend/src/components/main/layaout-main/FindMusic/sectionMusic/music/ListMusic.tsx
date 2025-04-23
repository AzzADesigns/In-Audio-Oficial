import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { getMusic } from '../../../../../../api/getMusic';
import { useAudio } from '../../../../../../contexts/AudioContext';
import { PaginationControls } from './PaginationControls'; 

interface PlayMusic {
    id: number;
    name: string;
    artist: string;
    genre: string;
    audioUrl: string;
}

export const ListMusic = React.forwardRef<HTMLDivElement>((props, ref) => {
    const [playMusic, setPlayMusic] = useState<PlayMusic[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const { updateTrackList, setOnEndReached } = useAudio();

    const fetchPlayMusic = async (newPage = page) => {
        setIsLoading(true);
        try {
            const data = await getMusic(newPage, 7);
            setPlayMusic(data);

            updateTrackList(data.map(track => ({
                title: track.name,
                artist: track.artist,
                genre: track.genre,
                audioUrl: track.audioUrl
            })));

        } catch (error) {
            console.error('Error cargando música:', error);
        } finally {
            setIsLoading(false);
        }
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
        <section ref={ref} className='xl:w-[68%] mt-20 2xl:mr-20 bg-primary'>
            <div className='flex flex-col pt-5 lg:flex-row w-full justify-between'>
                <h3 className='font-dots text-tertiary text-2xl md:text-3xl xl:text-6xl tracking-wider '>
                    <span className='text-secundary'>O</span>ur Music
                </h3>
                <p className='text-secundary w-[95%] mt-2 lg:mt-0 lg:w-60 text-xs'>
                    Please note that the Jamendo API may take time to load, even if the songs appear.
                </p>
            </div>

            <div className='w-full md:w-[400px] mt-10 lg:mt-8 lg:w-[600px] xl:w-[850px] 2xl:w-[1190px] h-[590px] flex-center'>
                <div className='text-tertiary bg-primary w-full h-20 flex justify-between items-center font-uniq text-lg lg:text-3xl ml-12 p-10'>
                    <h2 className='ml-8 lg:ml-24 xl:ml-20 2xl:ml-32'>Track</h2>
                    <h2 className='mr-10 md:mr-10 lg:mr-10'>Artist</h2>
                    <h2 className='xl:mr-14 2xl:mr-28 hidden xl:block'>Genre</h2>
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
                            Loading...
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
                                <div key={file.name} className='bg-primary h-20 w-full'>
                                    <MusicPlayer 
                                        title={file.name} 
                                        artist={file.artist} 
                                        genre={file.genre} 
                                        audioUrl={file.audioUrl} 
                                    />
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            
            <PaginationControls
                page={page}
                isLoading={isLoading}
                onPrevious={() => setPage(prev => prev - 1)}
                onNext={() => setPage(prev => prev + 1)}
            />
        </section>
    );
});

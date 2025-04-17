import React, { useEffect, useState } from 'react';
import { MusicPlayer } from './MusicPlayer';
import { getMusic } from '../../../../../../api/getMusic';

interface PlayMusic {
    id: number;
    name: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const ListMusic = () => {
    const [playMusic, setPlayMusic] = useState<PlayMusic[]>([]);

    useEffect(() => {
        const fetchPlayMusic = async () => {
            const data = await getMusic();
            console.log("Datos obtenidos de getMusic:", data);
            setPlayMusic(data);
        };
        fetchPlayMusic();
    }, []);

    return (
        <section className='xl:w-[72%]'>
            <div>
                <h3 className='font-dots text-tertiary text-2xl md:text-3xl xl:text-6xl tracking-wider'>
                    <span className='text-secundary'>O</span>ur Music
                </h3>
            </div>
            <div className='w-full h-full flex-center bg-primary'>
                <div className='text-tertiary bg-primary w-full h-20 flex justify-between items-center font-uniq text-lg lg:text-3xl ml-12 p-10'>
                    <h2 className='lg:ml-9 xl:ml-20 2xl:ml-32'>Track</h2>
                    <h2 className='lg:mr-5'>Artist</h2>
                    <h2 className='xl:mr-14 2xl:mr-24'>Genre</h2>
                </div>
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
            </div>
        </section>
    );
}

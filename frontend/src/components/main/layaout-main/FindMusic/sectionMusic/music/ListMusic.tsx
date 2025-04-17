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

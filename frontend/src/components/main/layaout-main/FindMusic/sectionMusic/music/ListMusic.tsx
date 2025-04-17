import React from 'react'
import { MusicPlayer } from './MusicPlayer'

export const ListMusic = () => {

    const fileAudio=[1,2,3,4,5,6,7,8,9,10,11]

    return (
        <section className='xl:w-[72%]'>
            <div>
                <h3 className='font-dots text-tertiary text-2xl md:text-3xl xl:text-6xl tracking-wider'><span className='text-secundary'>O</span>ur Music</h3>
            </div>
            <div className='bg-tertiary w-full h-full gap-5'>
                {fileAudio.map((file, index)=>{
                    return(
                        <div className='bg-primary h-20 w-full'>
                            <MusicPlayer/>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

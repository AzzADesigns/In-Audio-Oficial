import React from 'react'
import { Presentation } from '../../sectionGenres/TitleAndPresentation/Presentation'

export const PromotionalMessage = () => {
  return (
    <section className='xl:w-[25%]  flex xl:flex-col justify-center items-center lg:items-start bg-primary'>
        <div className=''>
            <h4 className='font-dots flex  md:ml-0 md:flex-col gap-4 xl:gap-4 text-2xl md:text-4xl xl:text-4xl 2xl:text-6xl text-tertiary tracking-wider   mb-10 xl:mb-20'>
                <p>
                    <span className='text-secundary'>D</span>iscover
                </p>
                <p>
                    new songs
                </p>
            </h4>
            
            <div className='flex justify-center lg:justify-normal mb-16'>
                <img src="/ImgDiscover.png" alt="" className='w-[330px] md:w-[250px] xl:w-[340px] 2xl:w-[400px]' />
            </div>

            <div className=''>
                <Presentation/>
            </div>
        </div>
    </section>
  )
}

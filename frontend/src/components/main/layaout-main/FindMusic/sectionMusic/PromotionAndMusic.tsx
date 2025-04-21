import React from 'react'
import { PromotionalMessage } from './promotion/PromotionalMessage'
import { ListMusic } from './music/ListMusic'

export const PromotionAndMusic = ({ musicRef }) => {
    return (
        <section className='mt-10 xl:mt-52 flex flex-col-reverse md:flex-row bg-primary w-full justify-between'>
            <PromotionalMessage />
            <ListMusic ref={musicRef} />
        </section>
    );
}
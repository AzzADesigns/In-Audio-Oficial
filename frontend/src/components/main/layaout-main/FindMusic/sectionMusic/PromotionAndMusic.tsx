import React from 'react'
import { PromotionalMessage } from './PromotionalMessage'
import { ListMusic } from './ListMusic'

export const PromotionAndMusic = () => {
    return (
        <section className='mt-52 flex flex-col-reverse md:flex-row w-full justify-between'>
            <PromotionalMessage/>
            <ListMusic/>
        </section>
    )
}

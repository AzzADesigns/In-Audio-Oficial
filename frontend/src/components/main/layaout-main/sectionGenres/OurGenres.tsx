import { Carrusel } from "./carrusel/Carrusel"
import { Presentation } from "./TitleAndPresentation/Presentation"
import { TitleSectionGenre } from "./TitleAndPresentation/TitleSectionGenre"

export const OurGenres = () => {
    return (
        <div className=" w-full">
            <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-16 lg:gap-20 xl:justify-between">
                <div className="">
                    <TitleSectionGenre/>
                </div>
                <div>
                    <Presentation/>
                </div>
            </section>
            <section className="">
                <Carrusel/>
            </section>
        </div>
    )
}

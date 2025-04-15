import { LogoFace } from "../../../../common/LogoFace"

export const TitleSectionGenre = () => {
    return (
        <div className="font-dots 2xl:w-3xl shadow-tertiary text-tertiary md:ml-auto text-4xl md:text-7xl 2xl:text-8xl [&_span]:text-secundary ">
            <h1 className="w-[50%]  inline-flex items-baseline bg-primary rounded-4xl">
                <span className="mr-1 "><LogoFace/></span> Ur
            </h1>
            <h1 className="bg-primary rounded-4xl ">
                <span className="ml-16 md:ml-28 2xl:ml-64">G</span>enres
            </h1>
        </div>
    )
}
 
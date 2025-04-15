import { PromotionAndMusic } from "./sectionMusic/PromotionAndMusic"
import { Search } from "./sectionSearch/Search"


export const ListenToMusic = () => {
    return (
        <div className="w-full ">
            <h1 className="text-4xl md:text-7xl 2xl:text-8xl font-dots text-tertiary bg-primary  mb-10"><span className="text-secundary">F</span>ind your favorite music</h1>
            <div className=" w-full flex-center">
                <Search/>
            </div>
            <PromotionAndMusic/>
        </div>
    )
}

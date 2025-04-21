import { PromotionAndMusic } from "./sectionMusic/PromotionAndMusic"
import { Search } from "./sectionSearch/Search"
import "./titleMaquee.css"


export const ListenToMusic = ({ musicRef="string" }) => {
    return (
        <div className="w-full">
            <div className="">
            <h1 className="text-4xl md:text-7xl 2xl:text-8xl font-dots text-tertiary bg-primary mb-10 marquee-container-find">
                <div className="marquee-track-find gap-52">
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>    
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>
                    <div className="[&_div]:ml-70">
                        <span className="text-secundary">F</span>ind your favorite music
                    </div>
                </div>
            </h1>

            </div>
            <div className=" w-full flex-center">
                <Search />
            </div>
            <PromotionAndMusic musicRef={musicRef} />
        </div>
    );
}
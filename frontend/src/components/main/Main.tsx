import { ListenToMusic } from "./layaout-main/FindMusic/FindYourMusic";
import { OurGenres } from "./layaout-main/sectionGenres/OurGenres"
import { Text } from "./layaout-main/sectionText/Text"

export const Main = ({ musicRef }) => {
    console.log('%cMain render', 'color: red');
    return (
        <main className=" h-full flex lg:mt-0 lg:pt-0 flex-center justify-start mb-96 w-full flex-center gap-32 xl:gap-96 ">
            <div className="w-full 2xl:h-96 flex justify-center">
                <Text />
            </div>
            <div className="w-full h-full mt-20 xl:mt-60">
                <OurGenres />
            </div>
            <div className="w-full h-full mt-20 xl:mt-96">
                <ListenToMusic musicRef={musicRef} />
            </div>
        </main>
    );
}

//cambiar el h cuando agreges mas componentes

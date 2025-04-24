import { FC, RefObject } from "react";
import { ListenToMusic } from "./layaout-main/FindMusic/FindYourMusic";
import { OurGenres } from "./layaout-main/sectionGenres/OurGenres";
import { Text } from "./layaout-main/sectionText/Text";

interface MainProps {
    musicRef: RefObject<HTMLDivElement | null>; 
}

export const Main: FC<MainProps> = ({ musicRef }) => {
    return (
        <main className="h-full flex lg:mt-0 lg:pt-0 flex-center justify-start mb-32 w-full flex-center gap-32 xl:gap-32">
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
};


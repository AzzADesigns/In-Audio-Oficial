
import { Banner } from "./components/header/Banner";
import { NavBar } from "./components/layaout/NavBar";
import { Effect } from "./components/layaout/Effect";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import { AudioProvider } from "./contexts/AudioContext";
import React from "react";


function App() {
    const musicRef = React.useRef<HTMLDivElement>(null);

    return (
        <AudioProvider>
            <div className="min-h-screen flex-center bg-[linear-gradient(to_bottom_right,#013027,#01846a,#00c8a0,#017c63)]">
                <div className="bg-primary h-[95%] w-[95%] max-w-[1800px] flex-center relative overflow-hidden">
                    <div className=" flex-center z-50 w-[95%]">
                        <NavBar scrollToMusic={() => musicRef.current?.scrollIntoView({ behavior: 'smooth' })} />
                        <header className="w-full flex-center  xl:mb-0">
                            <Banner />
                        </header>
                        <main className="w-full h-full  flex-center">
                            <Main musicRef={musicRef} />
                        </main>
                        <footer className="w-full">
                            <Footer />
                        </footer>
                    </div>
                </div>
            </div>
        </AudioProvider>
    );
}

export default App;

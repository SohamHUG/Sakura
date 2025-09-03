import { useRef } from "react";
import Hero from "../components/modules/Hero";
import { useTrail } from "../hooks/useTrail";
import { About } from "../components/modules/About";


export default function HomePage() {
    const homeRef = useRef<HTMLDivElement>(null);
    const speedIndicatorRef = useRef<HTMLDivElement>(null);

    useTrail(homeRef, speedIndicatorRef)

    return (
        <div
            ref={homeRef}
            className={`bg-black min-w-screen min-h-screen relative z-10 flex flex-col items-center justify-center`}
        >
            <div ref={speedIndicatorRef} className="speed-indicator absolute top-2 right-2 text-white opacity-0 text-sm"></div>

            <div className="home-container min-h-screen w-full mx-auto lg:mx-0 lg:w-[71%] lg:ml-auto z-11">
                <Hero />
                <About />
            </div>
        </div>

    );
}

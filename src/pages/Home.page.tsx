import { useState, useEffect, useRef } from "react";
import Loader from "../components/layout/Loader";
// import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderPlayed } from "../store/slice/loaderSlice";
import Hero from "../components/modules/Hero";
import { useTrail } from "../hooks/useTrail";
import { firstTimeline } from "../Utils/firstTimeline";
import { About } from "../components/modules/About";


export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const homeRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef(null);
    const speedIndicatorRef = useRef<HTMLDivElement>(null);

    useTrail(homeRef, speedIndicatorRef) // l'arguement refObject<HTMLDivElement | null> n'est pas attribuable 

    const loaderPlayed = useSelector((state: any) => state.loader.played);
    const dispatch = useDispatch();



    useEffect(() => {
        if (!loaderPlayed) {
            const timer = setTimeout(() => {
                setLoading(false);
                dispatch(setLoaderPlayed(true))
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            setShowLoader(false)
            setShowLoader(false)
        }

    }, [dispatch]);

    useEffect(() => {
        // const tl = gsap.timeline();
        if (!loading && homeRef.current) {
            // tl
            firstTimeline.play()
                .fromTo(
                    homeRef.current,
                    { y: 1000, opacity: 1 },
                    { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" })
                .to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.1,
                    // delay: 1.5,
                    onComplete: () => {
                        setShowLoader(false)
                        // homeRef.current?.querySelector('.home-container')?.classList.add("w-[70%]");
                    },
                }, ">")
        }
    }, [loading]);

    return (
        <div className={`w-full h-full relative ${showLoader && 'overflow-hidden'}`}>
            {showLoader && (
                <div ref={loaderRef} className="absolute inset-0 z-5">
                    <Loader />
                </div>
            )}

            <div
                // ref={homeRef}
                className={`bg-black min-w-screen min-h-screen relative z-10 flex flex-col items-center justify-center`}
                style={{ opacity: loaderPlayed ? 1 : 0 }}
            >
                <div ref={speedIndicatorRef} className="speed-indicator absolute top-2 right-2 text-white opacity-0 text-sm"></div>

                <div ref={homeRef} className="home-container min-h-screen h-screen w-[90%] mx-auto lg:mx-0 lg:w-[70%] absolute left-auto lg:right-0 z-11">
                    <Hero />


                    <About />
                </div>

                {/* <div>
                    <About />
                </div> */}

            </div>
        </div>
    );
}

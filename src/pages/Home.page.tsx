import { useState, useEffect, useRef } from "react";
import Loader from "../components/layout/Loader";
import gsap from "gsap";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const homeRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && homeRef.current) {
            gsap.fromTo(
                homeRef.current,
                { y: -1000, opacity: 1 },
                { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
            );

            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                delay: 1.5, 
                onComplete: () => setShowLoader(false), 
            });
        }
    }, [loading]);

    return (
        <div className="w-full h-full relative">
            {showLoader && (
                <div ref={loaderRef} className="absolute inset-0 z-10">
                    <Loader />
                </div>
            )}

            <div
                ref={homeRef}
                className="bg-black flex flex-col w-full min-h-screen justify-center items-center z-20 relative"
                style={{ opacity: 0 }}
            >
                <h1 className="text-white">ACCUEIL</h1>
            </div>
        </div>
    );
}

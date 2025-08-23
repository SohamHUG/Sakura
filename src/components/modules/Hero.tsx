import AnimatedSVG from "./AnimatedSVG"
import { sakuraKatakana } from "../../data/svg"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

const Hero = () => {
    const [shouldDraw, setShouldDraw] = useState(false);
    const loaderPlayed = useSelector((state: any) => state.loader.played);
    const heroRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const tl = gsap.timeline();
        const headline = heroRef.current?.querySelectorAll<HTMLElement>('.headline') || []

        if (!loaderPlayed) {
            const timer = setTimeout(() => {
                setShouldDraw(true)
            }, 5500);

            return () => clearTimeout(timer);
        } else {
            setShouldDraw(true)
        }

        if (shouldDraw) {
            tl.fromTo(
                headline,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 })
        }

    }, [shouldDraw]);

    return (
        <div ref={heroRef} className="flex flex-col gap-10 items-center w-full">
            {shouldDraw && <AnimatedSVG svg={sakuraKatakana} />}
            <p className="headline opacity-0 text-white font-noto text-2xl font-extralight">Une expérience qui éveille les sens</p>
        </div>
    )
}

export default Hero
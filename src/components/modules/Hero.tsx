import AnimatedSVG from "./AnimatedSVG"
import { sakuraKatakana } from "../../data"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { MainButton } from "../ui/MainButton";
// import { useTrail } from "../../hooks/useTrail";
import { GoArrowRight, GoArrowDown } from "react-icons/go";
import { SecondaryButton } from "../ui/SecondaryButton";
import { useNavigate } from "react-router-dom";


const Hero = () => {
    const [shouldDraw, setShouldDraw] = useState(false);
    const loaderPlayed = useSelector((state: any) => state.loader.played);
    const heroRef = useRef<HTMLDivElement>(null);
    // const heroRef = useRef<HTMLDivElement>(null);
    // const speedIndicatorRef = useRef<HTMLDivElement>(null);

    // useTrail(heroRef, speedIndicatorRef)

    const navigate = useNavigate();

    const navToMenu = () => {
        navigate('/menu')
    }


    useEffect(() => {
        const tl = gsap.timeline();
        const headline = heroRef.current?.querySelectorAll<HTMLElement>('.headline') || []
        const button = heroRef.current?.querySelectorAll<HTMLElement>('.button-main') || []
        const buttonSecond = heroRef.current?.querySelectorAll<HTMLElement>('.button-second') || []
        const aboutTxt = heroRef.current?.querySelectorAll<HTMLElement>('.about-txt') || []

        if (!loaderPlayed) {
            const timer = setTimeout(() => {
                setShouldDraw(true)
            }, 5500);

            return () => {
                clearTimeout(timer);
                setShouldDraw(false);
            };
        } else {
            setShouldDraw(true)
        }

        if (shouldDraw) {
            tl.fromTo(
                headline,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: .5, ease: "power3.out", delay: 0.6 })
                .fromTo(
                    button,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: .3, ease: "power3.out", },)
                .fromTo(
                    buttonSecond,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: .4, ease: "power3.out", }, )
                .fromTo(
                    aboutTxt,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: .2, ease: "power3.out", }, '>+1')
        }

    }, [shouldDraw]);

    return (
        <div ref={heroRef} className="w-full z-11 flex flex-col min-h-screen justify-between">

            <div className="flex flex-1 flex-col gap-5 lg:gap-10 items-center justify-center">
                {shouldDraw && <AnimatedSVG svg={sakuraKatakana} />}
                <p className="headline opacity-0 text-white font-kaisei lg:text-2xl ">
                    Une expérience qui éveille les sens
                </p>

                <div className="button-main opacity-0">
                    <MainButton className="flex items-end text-2xl justify-around">
                        Réserver <GoArrowRight size={30} />
                    </MainButton>
                </div>

                <SecondaryButton
                    className="button-second opacity-0 text-white/90 underline underline-offset-4 hover:no-underline hover:text-black"
                    onClick={navToMenu}
                >
                    Voir le menu
                </SecondaryButton>
            </div>

            {/* Bloc bas */}
            <div className="about-txt opacity-0">
                <p className="text-white/70 font-noto font-extralight flex items-center gap-2 w-full justify-center mb-2 text-xs">
                    <GoArrowDown size={15} />
                    <span>À propos de nous</span>
                    <GoArrowDown size={15} />
                </p>
            </div>
        </div>

    )
}

export default Hero
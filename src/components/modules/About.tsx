import DraggableCarousel from "./DraggableCarousel"
import { imagesFood } from "../../data"
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     // const smoother = 
    //     ScrollSmoother.create({
    //         content: sectionRef.current,
    //         smooth: 3,
    //         effects: true,
    //         normalizeScroll: true
    //     });

    //     return () => {
    //         if (ScrollSmoother.get()) ScrollSmoother.get()?.kill();
    //     };

    //     // smoother.effects("img", { speed: "auto" });
    // }, []);

    return (
        <section ref={sectionRef} className="bg-black text-white w-full max-w-full flex flex-col gap-30 py-10">
            <article className="flex justify-around items-center h-[50vh]">
                <div className="w-[25%]">
                    <h2 className="uppercase font-kaisei text-2xl mb-2 text-white/90">
                        Le concept
                    </h2>
                    <p className="font-noto text-xl font-extralight text-white/80">
                        Sakura est une invitation à découvrir l’art culinaire japonais dans toute sa finesse. Ici, chaque plat est pensé comme une rencontre entre tradition et modernité
                    </p>
                </div>
                <div className="w-[50%] h-auto flex justify-between">
                    <div className="h-60" data-speed="1">
                        <img src="/img/img24.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-90 rounded overflow-hidden" data-speed="1.2">
                        <img src="/img/img27.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                </div>
            </article>

            <article className="flex flex-row-reverse justify-around items-center">
                <div className="w-[25%]">
                    <h2 className="uppercase font-kaisei text-2xl mb-2 text-white/90">
                        Cuisine Authentique
                    </h2>
                    <p className="font-noto text-xl font-extralight text-white/80">
                        De délicats sushis aux ramens généreux, nos spécialités sont préparées à partir d’ingrédients sélectionnés avec soin pour garantir fraîcheur et authenticité
                    </p>
                </div>
                <div className="w-[25%] h-auto flex flex-col gap-2">
                    <div className="h-50 " data-speed="1.1">
                        <img src="/img/img3.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-70 w-full rounded overflow-hidden " data-speed="1.5">
                        <img src="/img/img26.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="h-50 w-full rounded overflow-hidden " data-speed="1">
                        <img src="/img/img7.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                </div>
            </article>

            <article className="flex justify-around items-center">
                <div className="w-[25%]">
                    <h2 className="uppercase font-kaisei text-2xl mb-2 text-white/90">
                        Atmosphère Zen
                    </h2>
                    <p className="font-noto text-xl font-extralight text-white/80">
                        Un lieu apaisant au design sobre et raffiné, inspiré par l’esthétique japonaise, où chaque détail participe à une expérience unique
                    </p>
                </div>
                <div className="w-[25%] h-auto flex flex-col gap-2">
                    <div className="h-50" data-speed="1.2">
                        <img src="/img/img17.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-70 w-full rounded overflow-hidden " data-speed="1.1">
                        <img src="/img/img33.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                </div>
            </article>

            <article className="flex flex-row-reverse justify-around items-center">
                <div className="w-[25%]">
                    <h2 className="uppercase font-kaisei text-2xl mb-2 text-white/90">
                        Thés & Saveurs
                    </h2>
                    <p className="font-noto text-xl font-extralight text-white/80">
                        Notre carte propose également une sélection de thés verts japonais et de boissons artisanales qui subliment vos instants gourmands
                    </p>
                </div>

                <div className="w-[30%] h-auto flex flex-col gap-2">
                    <div className="h-full" data-speed="1.1">
                        <img src="/img/img32.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                </div>
            </article>

            <article className="w-full h-[50vh] overflow-hidden relative">
                {/* <h2 className="uppercase font-kaisei text-4xl mb-2 text-white/90 m-5">Sakura Restaurant</h2> */}
                <p className="font-noto text-xl font-extralight text-white/80 m-5" data-speed='1.2'>
                    Retrouvez-nous au 12 Rue des Cerisiers, Paris 75004, et laissez-vous emporter par l’élégance des saveurs japonaises
                </p>
                <DraggableCarousel
                    items={
                        imagesFood.map((src, i) =>
                            <img key={i} src={src}
                                className="h-full w-full object-cover rounded "
                            />
                        )
                    }
                    itemWidth={400}
                    gap={16}
                    height={350}
                />

            </article>

            {/* <div className="w-full h-[85vh]"></div> */}
        </section>
    )
}
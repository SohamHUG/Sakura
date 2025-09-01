import { useRef } from "react"
// import InfiniteCards from "./InfiniteCards"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const About = () => {

    const scrollRef = useRef<HTMLDivElement>(null)


    return (
        <section className="bg-black text-white max-w-full flex flex-col gap-60">
            <article className="flex justify-around items-center">
                <div className="w-[25%]">
                    <h2 className="uppercase font-kaisei text-2xl mb-2 text-white/90">
                        Le concept
                    </h2>
                    <p className="font-noto text-xl font-extralight text-white/80">
                        Sakura est une invitation à découvrir l’art culinaire japonais dans toute sa finesse. Ici, chaque plat est pensé comme une rencontre entre tradition et modernité
                    </p>
                </div>
                <div className="w-[25%] h-auto flex flex-col gap-2">
                    <div className="h-50">
                        <img src="/img/img24.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-90 w-full rounded overflow-hidden">
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
                    <div className="h-50">
                        <img src="/img/img3.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-70 w-full rounded overflow-hidden">
                        <img src="/img/img26.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="h-50 w-full rounded overflow-hidden">
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
                    <div className="h-50">
                        <img src="/img/img17.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-70 w-full rounded overflow-hidden">
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
                    <div className="h-full">
                        <img src="/img/img32.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                </div>
            </article>

            <article ref={scrollRef} className="w-full h-screen overflow-hidden relative">
                <div className="horizontal-scroll flex gap-6 h-full items-center absolute top-[10%] left-[35%] transform -translate-x-1/2">
                    <img src="/img/img1.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img2.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img3.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img4.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img4.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img4.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img4.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                    <img src="/img/img4.jpg" className="w-[30vw] h-[30vw] object-cover rounded" />
                </div>

                {/* <InfiniteCards items={['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6', 'Card 7']} /> */}
            </article>
        </section>
    )
}
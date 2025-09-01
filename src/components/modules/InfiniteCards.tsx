// components/InfiniteScrollCards.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface InfiniteScrollCardsProps {
    items: string[]; // contenus des cartes
}

const InfiniteCards: React.FC<InfiniteScrollCardsProps> = ({ items }) => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!galleryRef.current || !cardsRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>('li', cardsRef.current);
        const spacing = 0.1;
        const snap = gsap.utils.snap(spacing);

        function calculateVisibleItems(length: number) {
            if (length > 7) return 7;
            if (length > 5) return 5;
            return 3;
        }

        function buildEffect(itemsList: HTMLElement[], spacingVal: number) {
            const cardsVisible = calculateVisibleItems(itemsList.length);
            const cardDuration = Math.ceil(cardsVisible / 2) * spacingVal;
            const startTime = itemsList.length * spacingVal + cardDuration;
            const loopTime = startTime + (itemsList.length * spacingVal) - spacingVal;

            const rawSeq = gsap.timeline({ paused: true });
            const seamlessLoop = gsap.timeline({
                paused: true,
                repeat: -1,
                onRepeat() {
                    this._time === this._dur && (this._tTime += this._dur - 0.01);
                },
            });

            gsap.set(itemsList, { xPercent: 400, opacity: 0, scale: 0 });

            for (let i = 0; i < itemsList.length * 2 + cardsVisible; i++) {
                const index = i % itemsList.length;
                const item = itemsList[index];
                const time = i * spacingVal;

                rawSeq.fromTo(
                    item,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, zIndex: 100, duration: cardDuration, repeat: 1, yoyo: true, ease: 'power1.in', immediateRender: false },
                    time
                ).fromTo(
                    item,
                    { xPercent: 400 },
                    { xPercent: -400, duration: cardDuration * 2, ease: 'none', immediateRender: false },
                    time
                );
            }

            rawSeq.time(startTime);

            seamlessLoop.to(rawSeq, {
                time: loopTime,
                duration: loopTime - startTime,
                ease: 'none',
            });

            return seamlessLoop;
        }

        const seamlessLoop = buildEffect(cards, spacing);

        const scrub = gsap.to(seamlessLoop, {
            totalTime: 0,
            duration: 0.5,
            ease: 'power3',
            paused: true,
        });

        ScrollTrigger.create({
            trigger: galleryRef.current,
            start: 'top top',
            end: () => '+=' + (items.length * 500), // ajustable selon longueur scroll
            pin: galleryRef.current,
            onUpdate(self) {
                scrub.vars.totalTime = snap(self.progress * seamlessLoop.duration());
                scrub.invalidate().restart();
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            seamlessLoop.kill();
            scrub.kill();
        };
    }, [items]);

    return (
        <>

            <div className="section h-screen bg-gray-100 dark:bg-gray-800"></div>
            <div ref={galleryRef} className="gallery relative h-screen overflow-hidden bg-black flex justify-center items-center">
                <ul ref={cardsRef} className="cards relative w-full h-full">
                    {items.map((content, idx) => (
                        <li key={idx} className="absolute w-56 h-72 bg-purple-500 rounded-xl text-white text-2xl font-bold flex items-center justify-center">
                            {content}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="section h-screen bg-gray-100 dark:bg-gray-800"></div>
        </>
    );
};

export default InfiniteCards;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { images } from "../../data";

export default function Loader() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bands: HTMLDivElement[] = gsap.utils.toArray(".band");
        const logo = containerRef.current?.querySelectorAll<HTMLElement>('.logo') || []

        gsap.fromTo(
            bands,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                stagger: { amount: 0.8, from: "center" },
                ease: "power3.out",
            }
        );

        gsap.fromTo(
            logo,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 1.9
            }
        )

        bands.forEach((band, i) => {
            const track = band.querySelector(".track");

            gsap.to(track, {
                yPercent: i % 2 === 0 ? -50 : 50, // monte ou descend
                duration: 20,
                repeat: -1,
                ease: "linear",
            });
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 flex overflow-hidden bg-black"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="band flex-1 relative overflow-hidden mx-1">
                    <div className="track absolute -top-[200%] left-0 right-0 flex flex-col gap-2.5">
                        {Array.from({ length: 15 }).map((_, j) => {
                            const index = (i * 6 + j) % images.length;
                            return (
                                <img
                                    key={j}
                                    src={images[index]}
                                    alt="img"
                                    className="w-full object-cover flex-none"
                                />
                            );
                        })}
                    </div>
                </div>
            ))}

            <img
                src="/logo-sakura-white.png"
                alt="logo"
                className="logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                           w-100 h-100 object-contain z-50"
            />
        </div>
    );
}

import { NavLink, Outlet, useLocation } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../ui/NavBar";
import { MainButton } from "../ui/MainButton";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Loader from "../layout/Loader";
import { setLoaderPlayed } from "../../store/slice/loaderSlice";
import { firstTimeline } from "../../Utils/firstTimeline";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const MainTemplate = () => {
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navTabletRef = useRef<HTMLDivElement>(null);
    const navMobileRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    // const transiRef = useRef<HTMLDivElement>(null);

    const loaderPlayed = useSelector((state: any) => state.loader.played);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!loaderPlayed) {
            const overlay = document.getElementById("transition-overlay");

            const tl = gsap.timeline({
                onComplete: () => {
                    setShowLoader(false);
                    dispatch(setLoaderPlayed(true));
                }
            });

            tl.to({}, { duration: 4 });

            tl.to(overlay, {
                y: 0,
                duration: 1,
                ease: "power4.inOut"
            }, ">");

            tl.set(".z-50", { display: "none" });

            tl.to(overlay, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "+=0.3");

            return () => {
                tl.kill();
            };
        } else {
            setShowLoader(false);
        }
    }, [loaderPlayed, dispatch]);



    useEffect(() => {
        if (!showLoader) {
            const smoother = ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 2,
                effects: true,
                normalizeScroll: true
            });

            return () => {
                smoother.kill();
            };
        }
    }, [showLoader, location]);


    useEffect(() => {
        if (!loaderPlayed && location.pathname === "/") {
            firstTimeline.play();
            gsap.fromTo(
                sidebarRef.current,
                { x: -800, opacity: 1 },
                { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 5.3 }
            )

            gsap.fromTo(
                navTabletRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 6.3 }
            )

            gsap.fromTo(
                navMobileRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 6.3 }
            )
        } else {
            gsap.fromTo(
                navTabletRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 1.3 }
            )

            gsap.fromTo(
                navMobileRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 1.3 }
            )
        }
    }, [loaderPlayed]);

    return (
        <div className="overflow-x-hidden">
            {showLoader && (
                <div className="fixed z-50 bg-black overflow-hidden">
                    <Loader />
                    <div
                        id="transition-overlay"
                        className="fixed inset-0 bg-black z-[60]"
                        style={{ transform: "translateY(100%)" }}
                    />
                </div>
            )}
            <header>
                <div ref={navTabletRef} className="nav-mobile lg:hidden fixed top-0 left-0 z-20 w-full pt-3 opacity-0">
                    <div className="w-[90%] mx-auto flex items-center justify-between">
                        <NavLink to={'/'} className={''}>
                            <img src="/logo-sakura-white.png" alt="logo sakura" className="w-20 md:w-25" />
                        </NavLink>

                        <div className="hidden md:static md:w-full md:flex justify-center">
                            <NavBar />
                        </div>

                        <MainButton className="lg:hidden">
                            Réserver
                        </MainButton>
                    </div>
                </div>

                <div ref={navMobileRef} className="fixed bottom-2 md:hidden w-full flex justify-center z-20 opacity-0">
                    <NavBar />
                </div>

                <div className="hidden lg:block">
                    <SideBar ref={sidebarRef} />
                </div>
            </header>
            <main ref={mainRef} className={`w-screen max-w-screen flex sm:flex-col overflow-x-hidden items-center `}>
                <div id="smooth-wrapper" className="w-full">
                    <div id="smooth-content" className="w-full">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MainTemplate
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import NavBar from "../ui/NavBar";
import { MainButton } from "../ui/MainButton";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const MainTemplate = () => {

     const location = useLocation();

    const sidebarRef = useRef<HTMLDivElement>(null);
    const navTabletRef = useRef<HTMLDivElement>(null);
    const navMobileRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const loaderPlayed = useSelector((state: any) => state.loader.played);

    useEffect(() => {
        if (!loaderPlayed && location.pathname === "/") {
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

            ScrollSmoother.create({
                wrapper: mainRef.current,
                content: '#smooth-content',
                smooth: 1,
                effects: true,
                normalizeScroll: true
            });
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
            // ScrollSmoother.create({
            //     wrapper: mainRef.current,
            //     content: '#smooth-content',
            //     smooth: 1,
            //     effects: true,
            //     normalizeScroll: true
            // });
        }
    }, [loaderPlayed]);

    return (
        <>
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
            <main ref={mainRef} className="w-screen max-w-screen h-auto flex sm:flex-col overflow-x-hidden items-center">
                <div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </main>
            {/* <footer>
            </footer> */}
        </>
    )
}

export default MainTemplate
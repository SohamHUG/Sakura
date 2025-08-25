import { NavLink, Outlet } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import NavBar from "../ui/NavBar";

const MainTemplate = () => {

    const sidebarRef = useRef<HTMLDivElement>(null);
    const loaderPlayed = useSelector((state: any) => state.loader.played);

    useEffect(() => {
        if (!loaderPlayed) {
            gsap.fromTo(
                sidebarRef.current,
                { x: -800, opacity: 1 },
                { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 5.3 }
            );
        }

    }, [loaderPlayed]);

    return (
        <>
            {/* <header>
            </header> */}
            <main className="w-screen max-w-screen h-screen flex sm:flex-col overflow-x-hidden items-center">
                <div className="hidden lg:block">
                    <SideBar ref={sidebarRef} />
                </div>

                <div className="lg:hidden fixed top-0 left-0 z-20 flex items-center justify-center w-full">
                    {/* <NavLink to={'/'}>
                        <img src="/logo-sakura-white.png" alt="logo sakura" className="w-15" />
                    </NavLink> */}

                    <NavBar />
                </div>

                <Outlet />
            </main>
            {/* <footer>
            </footer> */}
        </>
    )
}

export default MainTemplate
import { Outlet } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";

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
            <main className="w-screen max-w-screen h-screen flex overflow-x-hidden">
                <SideBar ref={sidebarRef} />

                <Outlet />
            </main>
            {/* <footer>
            </footer> */}
        </>
    )
}

export default MainTemplate
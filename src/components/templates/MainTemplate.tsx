import { Outlet } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const MainTemplate = () => {

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            sidebarRef.current,
            { x: -800 },
            { x: 0, duration: 1.5, ease: "power3.out", delay: 5.3 }
        );
    }, []);

    return (
        <>
            {/* <header>
            </header> */}
            <main className="w-screen h-screen flex">
                <SideBar ref={sidebarRef} />

                <Outlet />
            </main>
            {/* <footer>
            </footer> */}
        </>
    )
}

export default MainTemplate
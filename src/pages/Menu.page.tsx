import { useDispatch } from "react-redux";
import SakuraMenu from "../components/modules/Menu";
import { setLoaderPlayed } from "../store/slice/loaderSlice";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const MenuPage = () => {
    const dispatch = useDispatch();
    // const sectionRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     ScrollSmoother.create({
    //         content: '#smooth-menu',
    //         smooth: 3,
    //         effects: true,
    //         normalizeScroll: true
    //     });

    //     return () => {
    //         if (ScrollSmoother.get()) ScrollSmoother.get()?.kill();
    //     };
    // }, []);

    useEffect(() => {
        dispatch(setLoaderPlayed(true));
    }, [dispatch]);

    return (

        <div className="min-h-screen w-[90%] mx-auto lg:mx-0 lg:w-[70%] lg:ml-auto">
            <SakuraMenu />
        </div>

    );
};

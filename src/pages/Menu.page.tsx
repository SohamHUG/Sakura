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

    useEffect(() => {
        dispatch(setLoaderPlayed(true));
    }, [dispatch]);

    return (

        <div className="min-h-screen w-full py-15 mx-auto lg:mx-0 lg:w-[70%] lg:ml-auto bg-black">
            <SakuraMenu />
        </div>

    );
};

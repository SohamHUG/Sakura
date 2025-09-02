import { useDispatch } from "react-redux";
import SakuraMenu from "../components/modules/Menu";
import { setLoaderPlayed } from "../store/slice/loaderSlice";
import { useEffect } from "react";

export const MenuPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoaderPlayed(true));
    }, [dispatch]);

    return (
        <div className="min-h-screen h-auto w-[90%] mx-auto lg:mx-0 lg:w-[70%] absolute left-auto lg:right-0 bg-black">
            <SakuraMenu />
        </div>
    );
};

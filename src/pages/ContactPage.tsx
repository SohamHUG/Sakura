import { useEffect, useRef } from "react";
import ContactForm from "../components/modules/ContactForm";
import { useDispatch } from "react-redux";
import { setLoaderPlayed } from "../store/slice/loaderSlice";
import gsap from "gsap";

export const ContactPage = () => {

    const pageRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const imgsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(setLoaderPlayed(true));
    }, [dispatch]);

    useEffect(() => {
        if (imgsRef.current) {
            gsap.fromTo(
                imgsRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    stagger: 0.1,
                }
            );
        }

        gsap.fromTo(
            formRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
            }
        );
    }, [])


    return (
        <div ref={pageRef} className={`bg-black min-w-screen min-h-screen relative z-10 flex flex-col items-center justify-center`}>

            <div className=" min-h-screen w-full md:w-[90%] mx-auto lg:mx-0 lg:w-[70%] lg:ml-auto z-11 flex items-center flex-col">
                <div ref={imgsRef} className="w-full h-screen flex flex-col md:flex-row justify-center items-center gap-2">
                    <div className="h-80 md:h-120" data-speed="1.3">
                        <img src="/img/img13.jpg" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="h-75 md:h-110 rounded overflow-hidden" data-speed="1.2">
                        <img src="/img/img11.jpg" className="h-full w-full object-cover object-center" />
                    </div>
                </div>
                <div className="w-full" ref={formRef}>
                    <ContactForm />
                </div>

            </div>

        </div>
    );
}

import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../ui/NavBar";

const SideBar = forwardRef<HTMLDivElement>((props, ref) => {
    console.log(props)
    return (
        <div
            ref={ref}
            className="bg-white min-h-screen h-screen w-[30%] fixed top-0 bottom-0 left-0 sidebar flex flex-col justify-center items-center p-10 z-15"
        >
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-8">
                    <NavLink to={'/'}>
                        <img src="/logo-sakura1.png" alt="logo sakura" className="w-30" />
                    </NavLink>
                    <p className="font-noto font-extralight">
                        Sakura, l’art des saveurs japonaises <br />
                        Tradition et raffinement à chaque bouchée<br /><br />
                        Lundi au Vendredi: <br />
                        12h – 14h30 / 19h – 23h<br /><br />
                        Samedi & Dimanche: <br />
                        12h – 15h / 19h – 23h30
                    </p>
                    <a href="#" className="text-main font-kaisei font-bold underline">Réserver une table</a>

                    <NavBar />
                </div>

            </div>

        </div>
    );
});

SideBar.displayName = "SideBar"; // nécessaire pour éviter un warning avec forwardRef

export default SideBar;

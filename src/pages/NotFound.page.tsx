import type { FC } from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage: FC = () => {
    return (
        <section className="relative w-full min-h-screen bg-black flex justify-center items-center overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
                <img src="/logo-sakura-white.png" alt="logo sakura" className="w-32 md:w-40 mb-6" />

                <h1 className="text-white text-5xl md:text-7xl font-kaisei font-bold tracking-wide">
                    404
                </h1>

                <p className="text-white text-lg md:text-xl font-noto max-w-md md:max-w-lg">
                    Oups… La page que vous cherchez s’est envolée comme un pétale au vent.
                </p>

                <NavLink
                    to="/"
                    className="mt-4 px-6 py-3 rounded-md border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black transition-colors duration-300 font-medium"
                >
                    Revenir à l’accueil
                </NavLink>
            </div>
        </section>
    );
}

export default NotFoundPage;

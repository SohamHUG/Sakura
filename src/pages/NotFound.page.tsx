import type { FC } from "react"
import { NavLink } from "react-router-dom";

const NotFoundPage: FC = () => {

    return (
        <div className="bg-black flex flex-col w-full min-h-screen justify-center items-center">
            <h1 className="text-white text-4xl">Page Introuvable</h1>
            <NavLink className="text-sky-300 text-2xl underline" to={'/'}>
                Revenir à l'accueil
            </NavLink>
        </div>
    )
}

export default NotFoundPage;
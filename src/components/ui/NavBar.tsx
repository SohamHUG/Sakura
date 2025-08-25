import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        return location.pathname === path;
    };

    return (
        <>
            <nav className="flex flex-row justify-center items-center text-11 gap-4 border border-white/20 lg:border-black/20 py-4 px-6 my-5 font-kaisei max-w-full w-[90%] lg:w-full text-md text-white lg:text-black">
                <NavLink to={'/'}
                    className={` ${isActive("/") ? "font-bold text-main" : "font-light hover:font-bold"
                        } duration-300`}
                >
                    Accueil
                </NavLink>
                <span>|</span>
                <NavLink to={'/menu'}
                    className={` ${isActive("/menu") ? "font-bold" : "font-light hover:font-bold"
                        } duration-300`}
                >
                    Menu
                </NavLink>
                <span>|</span>
                <NavLink to={'/contact'}
                    className={` ${isActive("/contact") ? "font-bold" : "font-light hover:font-bold"
                        } duration-300`}
                >
                    Contact
                </NavLink>
            </nav>
        </>
    )
}

export default NavBar;
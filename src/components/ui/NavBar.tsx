import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        return location.pathname === path;
    };

    return (
        <>
            <nav className="flex flex-row justify-center items-center text-11 gap-4 border border-black/20 py-4 my-5 font-kaisei max-w-full w-full text-md">
                <NavLink to={'/'}
                    className={` ${isActive("/") ? "font-bold" : "font-light hover:font-bold"
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
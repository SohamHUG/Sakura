import { Outlet } from "react-router-dom";

const MainTemplate = () => {
    return (
        <>
            {/* <header>
            </header> */}
            <main className="max-w-screen overflow-x-hidden">
                <Outlet />
            </main>
            {/* <footer>
            </footer> */}
        </>
    )
}

export default MainTemplate
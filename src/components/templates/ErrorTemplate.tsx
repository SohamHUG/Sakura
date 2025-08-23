import { Outlet } from "react-router-dom";

const ErrorTemplate = () => {


    return (
        <>
            <main className="w-screen max-w-screen h-screen flex overflow-x-hidden">
                <Outlet />
            </main>
        </>
    )
}

export default ErrorTemplate
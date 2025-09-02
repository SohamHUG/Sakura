import { Route, Routes } from "react-router-dom";
import MainTemplate from "./components/templates/MainTemplate";
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/NotFound.page";
import ErrorTemplate from "./components/templates/ErrorTemplate";
import { MenuPage } from "./pages/Menu.page";

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainTemplate />}>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/menu'} element={<MenuPage />} />
        </Route>

        <Route element={<ErrorTemplate />}>
          <Route path={'*'} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
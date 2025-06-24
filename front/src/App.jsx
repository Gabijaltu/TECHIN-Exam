import { Routes, Route } from "react-router";
import LoginPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ItemCreationForm from "./pages/ItemCreationFormPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import NavLinks from "./components/NavLinks.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";


function App() {
  return (
    <>
      <div  className="justify-between h-screen w-screen box-border">
        <NavLinks />
        <div className="flex-1 w-full pt-[3rem]">
          <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/item-creation-form" element={<ItemCreationForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

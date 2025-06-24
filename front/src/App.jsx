import { Routes, Route } from "react-router";
import LoginPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ItemCreationForm from "./pages/ItemCreationFormPage.jsx";
import ItemRegistrationForm from "./pages/ItemRegistration.jsx";
import NotFound from "./pages/NotFound.jsx";
import NavLinks from "./components/NavLinks.jsx";
import Footer from "./components/Footer.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import MyItemsPage from "./pages/MyItemsPage.jsx";
import RegistrationApproval from "./pages/RegistrationApproval.jsx";
import ItemRegistrationPage from "./pages/ItemRegistrationPage.jsx";


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
            <Route
              path="/item-registration-form"
              element={<ItemRegistrationPage />}/>
            <Route path="/item-creation-form" element={<ItemCreationForm />} />
            <Route path="/my-items" element={<MyItemsPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/registration-approval" element={<RegistrationApproval/>} />
            <Route path="/items/:id" element={<ItemRegistrationPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

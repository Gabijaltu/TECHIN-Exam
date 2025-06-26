import { Routes, Route } from "react-router";
import LoginPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import NavLinks from "./components/NavLinks.jsx";
import EditServicePage from "./pages/EditServicePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ServiceCreationForm from "./pages/ServiceCreationFormPage.jsx";


function App() {
  return (
    <>
      <div className="justify-between h-screen w-screen box-border">
        <NavLinks />
        <div className="flex-1 w-full pt-[3rem]">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/service-creation-form"
              element={<ServiceCreationForm />}
            />
            <Route path="/services/:id/edit" element={<EditServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

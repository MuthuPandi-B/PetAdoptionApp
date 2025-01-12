import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePetPage from "./pages/CreatePetPage";
import PetDetails from "./components/PetDetails";
import Footer from "./components/Footer";
import CreateApplicationPage from "./pages/CreateApplicationPage";
import ShelterApplicationsPage from "./pages/ShelterApplicationPages";
import UserApplicationsPage from "./pages/UserApplicationPage";
import EditApplicationPage from "./pages/EditApplicationPage";
import ContactPage from "./pages/ContactPage";
import FosterFosteringPets from "./components/FosterFosteringPets";
import ShelterFosteringPets from "./components/ShelterFosteringPets";
import CreateFosterPet from "./pages/CreateFosterPet";
import CreateAppointmentPage from "./pages/CreateAppointmentPage";
import MessagesPage from "./pages/MessagesPage";
import ContactMessagesPage from "./pages/ContactMessagesPage";
import FavoritePage from "./pages/FavoritesPage";
import ReviewPage from "./pages/ReviewPage";
import EditPetPage from "./pages/EditPetPage";
import ShelterAppointments from "./components/ShelterAppointments";
import AdopterAppointments from "./components/AdopterAppointments";
import FosteredPets from "./components/FosteredPets";
import AboutPage from "./pages/AboutPage";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createApplication" element={<ProtectedRoutes adopterOnly><CreateApplicationPage /></ProtectedRoutes>}/>
          <Route path="/createpet" element={<ProtectedRoutes shelterOnly><CreatePetPage /></ProtectedRoutes> } />
          <Route path="/pets/:id" element={<ProtectedRoutes><PetDetails /></ProtectedRoutes>} />
          <Route path="pets/edit/:id" element={<ProtectedRoutes shelterOnly><EditPetPage /></ProtectedRoutes>} />
          <Route path="/application/user" element={<ProtectedRoutes><UserApplicationsPage /></ProtectedRoutes>} />
          <Route path="/application/all" element={<ProtectedRoutes shelterOnly><ShelterApplicationsPage/></ProtectedRoutes>} />
          <Route path="/application/edit/:id" element={<ProtectedRoutes ><EditApplicationPage/></ProtectedRoutes>} />
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/message" element={<ProtectedRoutes ><MessagesPage/></ProtectedRoutes>}/>
          <Route path="/appointments/schedule" element={<ProtectedRoutes ><CreateAppointmentPage/></ProtectedRoutes>}/>
          <Route path="/contact/messages" element={<ProtectedRoutes shelterOnly><ContactMessagesPage/></ProtectedRoutes>}/>
          <Route path="/favorites" element={<ProtectedRoutes><FavoritePage/></ProtectedRoutes>}/>
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/shelter/fosteringpets" element={<ProtectedRoutes shelterOnly><ShelterFosteringPets /></ProtectedRoutes>} />
          <Route path="/foster/fosteringpets" element={<ProtectedRoutes fosterOnly><FosterFosteringPets/></ProtectedRoutes>} />
          <Route path="/fosteredpets" element={<ProtectedRoutes fosterOnly><FosteredPets/></ProtectedRoutes>} />
          <Route path="/fosterpets/create" element={<ProtectedRoutes shelterOnly><CreateFosterPet /></ProtectedRoutes>} />
          <Route path="/allappointments" element={<ProtectedRoutes shelterOnly><ShelterAppointments/></ProtectedRoutes>} />
          <Route path="/userappointments" element={<AdopterAppointments/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

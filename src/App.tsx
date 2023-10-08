import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/admin/dashboard";
import DataAdmin from "./pages/admin/dataAdmin";
import ChatService from "./pages/admin/chatService";
import DataOfficer from "./pages/admin/dataOfficer";
import Case from "./pages/admin/case";
import DetailJob from "./pages/officer/detailJob";
import HistoryJob from "./pages/officer/history";
import ProfilePetugas from "./pages/officer/profile";
import Profile from "./pages/user/profile";
import LandingPage from "./pages/user/landingPage";
import LocationShare from "./pages/user/location";
import Message from "./pages/user/message";
import { Toaster } from "react-hot-toast";
import DataGoverment from "./pages/admin/dataGoverment";
import History from "./pages/user/history";
import DashboardPetugas from "./pages/officer/dashboard";
import DataUser from "./pages/admin/dataUser";
import LoginPetugas from "./pages/officer/login";
import RegisterPetugas from "./pages/officer/register";
import DataVehicle from "./pages/admin/dataVehicle";
import Forgot from "./pages/forgot";
import Verify from "./pages/verify";
import Landing from "./pages/landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<LoginPetugas />} path="/login-petugas" />
        <Route element={<Register />} path="/register" />
        <Route element={<RegisterPetugas />} path="/register-petugas" />
        
        <Route element={<Forgot />} path="/forgot-password" />
        <Route element={<Verify />} path="/verify-email/:key" />

        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<DataAdmin />} path="/data-admin" />
        <Route element={<DataUser />} path="/data-user" />
        <Route element={<ChatService />} path="/chat-layanan" />
        <Route element={<DataOfficer />} path="/data-petugas" />
        <Route element={<DataGoverment />} path="/data-goverment" />
        <Route element={<DataVehicle />} path="/data-vehicle" />
        <Route element={<Case />} path="/kasus" />

        <Route element={<DashboardPetugas />} path="/dashboard-petugas" />
        <Route element={<DetailJob />} path="/detail-pekerjaan" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<ProfilePetugas />} path="/profile-petugas" />
        <Route element={<HistoryJob />} path="/riwayat-petugas" />

        <Route element={<LandingPage />} path="/beranda" />
        <Route element={<LocationShare />} path="/lokasi" />
        <Route element={<Message />} path="/chat" />
        <Route element={<History />} path="/riwayat" />

      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

import React from "react";
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
import Profile from "./pages/officer/profile";
import LandingPage from "./pages/user/landingPage";
import LocationShare from "./pages/user/location";
import Message from "./pages/user/message";
import { Toaster } from "react-hot-toast";
import DataGoverment from "./pages/admin/dataGoverment";
import DriverDashboard from './pages/driver/dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Register />} path="/register" />

        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<DataAdmin />} path="/data-admin" />
        <Route element={<ChatService />} path="/chat-layanan" />
        <Route element={<DataOfficer />} path="/data-petugas" />
        <Route element={<DataGoverment />} path="/data-goverment" />
        <Route element={<Case />} path="/kasus" />


        <Route element={<DetailJob />} path="/detail-pekerjaan" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<HistoryJob />} path="/riwayat" />

        <Route element={<LandingPage />} path="/beranda" />
        <Route element={<LocationShare />} path="/lokasi" />
        <Route element={<Message />} path="/chat" />

        <Route element={<DriverDashboard />} path="/petugas/dashboard" />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

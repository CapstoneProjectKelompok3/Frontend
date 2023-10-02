import React from "react";
import Card from "../../../component/Card";
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Dashboard = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  return (
    <section className="px-5 pt-10 pb-5">
      <div>
        <div>Halo,</div>
        <div className="font-semibold">Petugas Damkar</div>
      </div>
      <div className="mt-8">
        <div className="font-bold mb-2 text-xl">Tugas Terbaru</div>
        <Card title="Desripsi laporan 1" job={true} />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[12vh] px-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-row justify-between place-items-center justify-center h-full px-5">
          <div className="flex flex-col place-items-center">
            <i className="fa-solid fa-house"></i>
            <div>Beranda</div>
          </div>
          <div className="flex flex-col place-items-center">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <div>Riwayat</div>
          </div>
          <div className="flex flex-col place-items-center">
            <i className="fa-solid fa-user"></i>
            <div>Profile</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

import sirine from '../../../assets/sirine.png'
import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const LandingPage = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   if(!token) {
  //     navigate('/login')
  //     setTimeout(() => {
  //       toast.error("Silahkan Login Terlebih Dahulu")
  //     }, 200);
  //   }
  // }, [])
  const handleLokasi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem('userLatitude', latitude)      
      localStorage.setItem('userLongitude', longitude)      
    });

    navigate('/lokasi')
  }

  return (
    <div className="h-screen w-full relative">
      <div className="container mx-auto relative z-10">
        <div className="py-5 px-4 flex justify-between items-center">
          <div className="text-lg">
            Halo, <span className="font-semibold">User</span>
          </div>
          <div>
            <button className="w-8 h-8 p-0 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-circle-info fa-xl"></i>
            </button>
          </div>
        </div>
        <div className='flex justify-center py-2'>
          Emergency CallCenter Indonesia
        </div>
        <div className="flex justify-center items-center w-full h-[60vh]">
          <div className='transition hover:scale-95 w-56 h-56 flex rounded-full justify-center items-center bg-none border-2 border-[#f4c9c9]'>
            <div className="w-48 h-48 flex drop-shadow-xl shadow-[#F89192]  justify-center items-center rounded-full bg-[#F89192] cursor-pointer">
              <div className='w-36 h-36 flex justify-center items-center bg-primary rounded-full'>
                <img src={sirine} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center font-semibold'>
        Tekan Tombol untuk Meminta bantuan
        </div>
        <button onClick={() => handleLokasi()}>Tekan</button>
      </div>
      <div className="circleBg absolute z-0 bottom-36 right-5 w-72 h-72 rounded-full">
      </div>
    </div>
  )
}

export default LandingPage
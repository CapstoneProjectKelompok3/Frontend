import Card from '../../../component/Card'
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const HistoryJob = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()
  const pathname= location.pathname

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])
  const role = Cookie.get('role')
  useEffect(() => {
    if (role === 'user') {
      navigate('/beranda')
    } else if (role === 'superadmin' || role === 'admin') {
      navigate('/dashboard')
    }
  })

  return (
    <section className="px-5 pt-10 pb-5">
      <div className="mt-8">
        <div className="font-bold mb-2 text-xl">Riwayat Tugas</div>
        <Card title="Desripsi laporan 1" job={true} />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[12vh] px-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-row justify-between place-items-center h-full px-5">
          <div onClick={() => navigate('/dashboard-petugas')} className={`flex flex-col place-items-center ${pathname === '/dashboard-petugas' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-house"></i>
          </div>
          <div onClick={() => navigate('/riwayat-petugas')} className={`flex flex-col place-items-center ${pathname === '/riwayat-petugas' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div onClick={() => navigate('/profile-petugas')} className={`flex flex-col place-items-center ${pathname === '/profile' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoryJob
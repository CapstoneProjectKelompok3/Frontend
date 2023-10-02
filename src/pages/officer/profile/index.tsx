import profile from '../../../assets/profile.png'
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Profile = () => {
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
    <div className="h-screen w-full">
      <div>
        <div className='container mx-auto'>
          <div className="w-full h-64 bg-primary">
            <div className="py-5 px-4 font-semibold text-white">
              Profile
            </div>
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white">
                <img src={profile} className='w-full h-full bg-cover rounded-full' alt="" />
              </div>
            </div>
          </div>
          <div className='py-5 px-4 space-y-2'>
            <div>
              <p className='text-secondary font-medium'>Nama Lengkap</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
                <i className="fa-regular fa-circle-user"></i>
                <p>Udin Saputra</p>
              </div>
            </div>
            <div>
              <p className='text-secondary font-medium'>Email</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
              <i className="fa-regular fa-envelope"></i>
                <p>email@email.com</p>
              </div>
            </div>
            <div>
              <p className='text-secondary font-medium'>NIK</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
              <i className="fa-regular fa-credit-card"></i>
                <p>351202827380001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
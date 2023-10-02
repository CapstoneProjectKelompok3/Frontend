import profile from '../../../assets/profile.png'
import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useFormik } from 'formik';
import axios from 'axios'
import Popup from '../../../component/Popup';
import Input from '../../../component/Input';
import Button from '../../../component/Button';
const Profile = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
  const pathname = location.pathname
  const handleEdit = (elementId: number) => {
    setEdit(true)
    setId(elementId)
  }
  const handleEditClose = () => {
    setEdit(false)
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      fullname: '',
      nik: '',
      gender: 'L'
    },
    onSubmit: (values) => {
      axios.put(`https://api.flattenbot.site/users/update/${id}`, {
        username: values.username,
        email: values.email,
        fullname: values.fullname,
        nik: values.nik,
        gender: values.gender,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error.response.data)
      })
    }
  })

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("role");

    navigate("/login");
    toast.success("Berhasil Logout");
  };
  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  return (
    <div className="h-screen w-full">
      <div className=' bg-primary h-60'>
        <div className='container mx-auto'>
          <div className="w-full ">
            <div className="py-5 px-4 font-semibold text-white">
              Profile
            </div>
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white">
                <img src={profile} className='w-full h-full bg-cover rounded-full' alt="" />
              </div>
            </div>
          </div>
          <div className='py-10 px-4 space-y-2'>
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
            <div className='pt-10'>
              <ul className="list-none">
                <div onClick={() => handleLogout()}>
                  <li className="flex flex-row gap-x-4 align-middle rounded-md py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
                    <div>
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div>Logout</div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {
        edit && (
          <Popup onConfirm={handleEditClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative w-96 bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Edit User
                  </div>
                  <form onSubmit={formik.handleSubmit} className="space-y-4" action="#">
                    <div>
                      <Input label='Username' onChange={formik.handleChange} name='username' placeholder='Masukkan Username' star={true} />
                    </div>
                    <div>
                      <Input label='Nama Lengkap' onChange={formik.handleChange} name='fullname' placeholder='Masukkan Email' star={true} />
                    </div>
                    <div>
                      <Input label='Email' onChange={formik.handleChange} name='email' placeholder='Masukkan Email' star={true} />
                    </div>
                    <div>
                      <label className='text-secondary'>Jenis Kelamin</label>
                      <select name="gender" className='select select-bordered w-full max-w-xs bg-white' onChange={formik.handleChange}>
                        <option value={'L'}>Laki - Laki</option>
                        <option value={'P'}>Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <Input label='Nik' onChange={formik.handleChange} placeholder='Masukkan Nik' name='nik' star={true} />
                    </div>
                    <div className="py-2">
                      <Button type='submit' label='Tambahkan' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )
      }

      <div className="fixed bottom-0 left-0 w-full h-[12vh] px-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-row justify-between place-items-center h-full px-5">
          <div onClick={() => navigate('/beranda')} className={`flex flex-col place-items-center ${pathname === '/beranda' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-house"></i>
          </div>
          <div onClick={() => navigate('/riwayat')} className={`flex flex-col place-items-center ${pathname === '/riwayat' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div onClick={() => navigate('/profile')} className={`flex flex-col place-items-center ${pathname === '/profile' ? 'text-black fa-lg' : 'text-secondary'} `}>
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
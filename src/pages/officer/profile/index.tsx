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
import { validateProfile, validateReset } from '../../../validate/auth';
const Profile = () => {
  const token = Cookie.get("token");
  const id = Cookie.get("uid");
  const role = Cookie.get("role");
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [reset, setReset] = useState(false)
  const [data, setData] = useState({
    username: '',
    email: '',
    fullname:'',
    goverment_name:"",
    document: {
      fullname: '',
      gender: '',
      nik: '',
    }
  })
  const pathname = location.pathname
  const handleEditClose = () => {
    setEdit(false)
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      gender: '',
    },
    validationSchema: validateProfile,
    onSubmit: (values) => {
      console.log("ini edit")
      axios.put(`https://api.flattenbot.site/users/update`, {
        username: values.username,
        fullname: values.fullname,
        gender: values.gender,
    
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        toast.success(response.data.message)
        setEdit(false)
      }).catch((error) => {
        console.log(error.response.data)
        toast.error(error.response.data.message)
      })
    }
  })
  const formikReset = useFormik({
    initialValues: {
      currentPass: '',
      newPass: '',
      repeatPass: '',
    },
    validationSchema: validateReset,
    onSubmit: (values) => {
      console.log('sdsd')
      axios.put(`https://api.flattenbot.site/users/changepass`, {
        currentPass: values.currentPass,
        newPass: values.newPass,
        repeatPass: values.repeatPass,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        toast.success('Berhasil Ganti Password')
        setReset(false)

      }).catch((error) => {
        console.log(error.response.data)
        toast.error(error.response.data.message)
      })
    }
  })

  const getData = async () => {
    try {
      const response = await axios.get(`https://belanjalagiyuk.shop/driver/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("role");
    Cookie.remove("uid");
    Cookie.remove("roomid");
    localStorage.removeItem('userLatitude')
    localStorage.removeItem('userLongitude');
    localStorage.removeItem('speach-text');

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
  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="h-screen w-full">
      <div className=' bg-primary h-60'>
        <div className='container mx-auto'>
          <div className='flex px-5 justify-between items-center'>
            <div className="py-5 px-4 font-semibold text-white">
              Profile
            </div>
            <div>
              <div onClick={() => setModal(true)} className='flex gap-2 cursor-pointer justify-center items-center px-4 h-10 text-secondary text-sm font-semibold bg-white rounded-md'>
                <i className="fa-solid fa-sliders"></i>
              </div>
              {
                modal && (
                  <div className='absolute top-0 z-10 right-0 w-screen md:w-96 lg:md:w-96 h-screen drop-shadow-lg bg-white'>
                    <div className='flex w-full justify-end px-4 pt-6' >
                      <i onClick={() => setModal(false)} className="fa-regular cursor-pointer fa-circle-xmark fa-lg"></i>
                    </div>
                    <div className='pt-4'>
                      <hr />
                    </div>
                    <div className='p-5 '>
                      <ul className="py-2 space-y-3 text-sm text-gray-700 font-semibold">
                        <li onClick={() => { setEdit(true), setModal(false) }}>
                          <div className="flex gap-4 px-4 py-2 hover:bg-gray-300 hover:text-white cursor-pointer"><i className="fa-solid fa-user-pen"></i>Edit Profile</div>
                        </li>
                        <li onClick={() => { setReset(true), setModal(false) }}>
                          <div className="flex gap-4 px-4 py-2 hover:bg-gray-300 hover:text-white cursor-pointer"><i className="fa-solid fa-user-pen"></i>Ubah Kata Sandi</div>
                        </li>
                        <li onClick={handleLogout}>
                          <div className="flex gap-4 px-4 py-2 hover:bg-gray-300 hover:text-white cursor-pointer"><i className="fa-solid fa-right-from-bracket"></i>Log Out</div>
                        </li>
                      </ul>
                    </div>

                  </div>
                )
              }
            </div>

          </div>
          <div className="w-full">
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white">
                <img src={profile} className='w-full h-full bg-cover rounded-full' alt="" />
              </div>
            </div>
          </div>  
          <div className='py-10 px-4 space-y-2'>
            <div>
              <p className='text-secondary font-medium'>Governtment Name</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
                <i className="fa-regular fa-circle-user"></i>
                <p>{data.goverment_name}
                {/* {JSON.stringify(data)} */}
                </p>
              </div>
            </div>
            <div>
              <p className='text-secondary font-medium'>Nama Lengkap</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
                <i className="fa-regular fa-circle-user"></i>
                <p>{data?.fullname }</p>
              </div>
            </div>
            <div>
              <p className='text-secondary font-medium'>Email</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
                <i className="fa-regular fa-envelope"></i>
                <p>{data?.email}</p>
              </div>
            </div>
            <div>
              <p className='text-secondary font-medium'>Jenis Kelamin</p>
              <div className='flex gap-4 py-4 items-center font-medium'>
                <i className="fa-solid fa-venus-mars"></i>
                <p>{data?.document?.gender ? data.document?.gender : 'Laki Laki'}</p>
              </div>
            </div>
          </div>
        </div>
      </div >
      {
        edit && (
          <Popup onConfirm={handleEditClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative w-96 bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Edit User
                  </div>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        label='Username'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name='username' placeholder='Masukkan Username' star={true} />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                          {formik.errors.username}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        label='Nama Lengkap'
                        onChange={formik.handleChange}
                        name='fullname' placeholder='Masukkan Email' star={true} />
                      {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                          {formik.errors.fullname}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label className='text-secondary'>Jenis Kelamin</label>
                      <select name="gender"  className='select select-bordered w-full max-w-xs bg-white' onChange={formik.handleChange}>
                        <option value={'male'}>Pilih Jenis Kelamin</option>
                        <option value={'male'}>Laki - Laki</option>
                        <option value={'female'}>Perempuan</option>
                      </select>
                    </div>
                    <div className="py-2 flex justify-end">
                      <Button type='submit' label='Tambahkan' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )
      }
      {
        reset && (
          <Popup onConfirm={handleEditClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative w-96 bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Ubah Kata Sandi
                  </div>
                  <form onSubmit={formikReset.handleSubmit} className="space-y-4" action="#">
                    <div>
                      <Input
                        label='Password Sekarang'
                        onBlur={formikReset.handleBlur}
                        onChange={formikReset.handleChange}
                        name='currentPass' placeholder='Masukkan Password Saat ini' star={true} />
                      {formikReset.touched.currentPass && formikReset.errors.currentPass ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                          {formikReset.errors.currentPass}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        label='Nama Lengkap'
                        onChange={formikReset.handleChange}
                        name='newPass' placeholder='Masukkan Password Baru' star={true} />
                      {formikReset.touched.newPass && formikReset.errors.newPass ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                          {formikReset.errors.newPass}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        label='Email'
                        onChange={formikReset.handleChange}
                        name='repeatPass' placeholder='Ulangi Password Baru' star={true} />
                      {formikReset.touched.repeatPass && formikReset.errors.repeatPass ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                          {formikReset.errors.repeatPass}
                        </div>
                      ) : null}
                    </div>
                    <div className="py-2 flex justify-end">
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
    </div >
  )
}

export default Profile
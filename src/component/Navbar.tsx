import axios from 'axios'
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Navbar = () => {

  const token = Cookie.get('token')
  const id = Cookie.get('uid')
  const [data, setData] = useState<any>([])

  const getUserById = () => {
    axios.get(`https://api.flattenbot.site/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setData(res?.data?.data)
    })
    .catch((err) => {
      if (err.response?.data?.status_code === 404) {
        toast.error('Data Tidak Ditemukan')
      }
    })
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div className='ml-[20vw] bg-white w-[80vw] fixed h-20 flex justify-end px-10 items-center gap-x-4'>
      <div className='flex flex-row gap-x-2 items-center'>
        <div className='flex flex-col leading-4 text-end'>
          <div className='font-semibold text-lg'>Welcome</div>
          <div className='font-medium text-sm'>{data.username}</div>
        </div>
        <div className='bg-line w-10 h-10 rounded-full'>
          <img src="" alt="" />
        </div>
      </div>
      <div className='text-primary text-[22px]'>
        <i className="fa-solid fa-bell"></i>
      </div>
    </div>
  )
}

export default Navbar
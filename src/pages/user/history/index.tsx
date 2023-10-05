import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Popup from "../../../component/Popup";
import Button from "../../../component/Button";
import axios from "axios";

const History = () => {
  const token = Cookie.get("token");
  const role = Cookie.get("role");

  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  const [emergencies, setEmergencies] = useState(0)
  const pathname = location.pathname;

  const handleClose = () => {
    setOpenModal(false)
  }
  console.log(rating)
  const star = Array(5).fill(0)
  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  const idUser = Cookie.get('id')
  const handleFeedback = () => {
    axios.post(`https://api.flattenbot.site/feedback/${idUser}`, {
      content: content,
      rating: rating,
      emergencies_id: 2
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response)
      // toast.success(response.data.message)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }

  useEffect(() => {
    if (role === 'admin' || role === 'superadmin') {
      navigate('/dashboard')
    }
  })
  const handleClick = (value: number) => {
    setRating(value)
  }
  return (
    <div className='h-screen w-full'>
      <div className='container mx-auto'>
        <div className="py-5 px-4 font-semibold">
          History Laporan
        </div>
        <div className="w-full px-5 space-y-4">
          <div className='w-full h-1/2 px-5 py-3 bg-primary rounded-xl '>
            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-xl bg-white">
                <i className="fa-regular fa-file-check text-black"></i>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <div className="font-semibold text-white">
                    Laporan 1
                  </div>
                  <div className="text-white font-light text-sm">
                    10:30 AM - 12-09-2023
                  </div>
                </div>
                <div onClick={() => setOpenModal(true)} className="drop-shadow-xl shadow-lg px-10 py-2 font-semibold hover:bg-gray-200 cursor-pointer bg-white rounded-md">
                  Nilai
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        openModal && (
          <Popup onConfirm={handleClose}>
            <div className="relative w-96 bg-white rounded-lg shadow">
              <div className="px-10 py-10 space-y-3 ">
                <div className="space-y-2">
                  <h3 className="text-xl text-start font-bold text-black">
                    Berikan Rating
                  </h3>
                  <div className="space-y-5 py-2">
                    <div className="w-full bg-primary text-white font-semibold p-5 rounded-md">
                      <div className="flex flex-col">
                        <div className="font-semibold text-white">
                          Laporan 1
                        </div>
                        <div className="text-white font-light text-sm">
                          10:30 AM - 12-09-2023
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5 py-2">
                    <label className="text-md font-medium text-start">
                      Deskripsi
                    </label>
                    <div>
                      <textarea name="" onChange={(e) => setContent(e.target.value)} className='textarea w-full bg-white textarea-bordered' >
                      </textarea>
                    </div>
                  </div>
                  <div className="space-y-5 py-2">
                    <label className="text-md font-medium">Rating</label>
                    <div className="flex gap-5">
                      {
                        star.map((_, index) => {
                          return (
                            <div key={index}>
                              <i onClick={() => handleClick(index + 1)} className={`fa-solid fa-star fa-xl ${rating > index ? 'text-yellow-400' : ''}`}></i>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-10 py-5 flex justify-end">
                <Button onClick={handleFeedback} label='Submit' />
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

export default History
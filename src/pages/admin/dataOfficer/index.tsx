import Button from '../../../component/Button';
import Navbar from '../../../component/Navbar'
import Popup from '../../../component/Popup';
import Sidebar from '../../../component/Sidebar'
import Input from '../../../component/Input';
import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from 'axios';

interface Driver {
  driving_status: string
  fullname: string
  email: string
  goverment_type: string
  status: boolean
}
const DataOfficer = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [driver, setDriver] = useState<Driver[]>([])
  const token = Cookie.get("token");
  const navigate = useNavigate()

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
    } else if (role === 'superadmin') {
      navigate('/dashboard')
    }
  })

  useEffect(() => {
    getAllDriver()
  }, [])

  const getAllDriver = async () => {
    try {
      const response = await axios.get(`https://belanjalagiyuk.shop/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDriver(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleclick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleEdit = () => {
    setEdit(true)
  }
  const handleEditClose = () => {
    setEdit(false)
  }

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input placeholder="Cari Petugas" className="p-3 w-full" search={<i className="fa-solid text-secondary fa-magnifying-glass"></i>} />
            </div>
            <div>
              <Button onClick={handleclick} label='Tambah' />
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Driving Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  driver && driver.length > 0 ? (
                    driver.map((element, index) => {
                      return (
                        <tr key={index} className="bg-gray-300-200 items-center border-none font-medium">
                          <td>
                            <div>{index + 1}</div>
                          </td>
                          <td>
                            {element.fullname}
                          </td>
                          <td>
                            {element.email}
                          </td>
                          <td>
                            {element.goverment_type}
                          </td>
                          <td>
                            {element.driving_status}
                          </td>
                          <td>
                            {element.status === true ? 'Aktif' : 'Belum Aktif'}
                          </td>
                          <td>
                            <div className='flex gap-7'>
                              <div className='cursor-pointer hover:text-primary'>
                                <i className="fa-solid fa-trash text-md"></i>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center font-semibold w-full"
                      >
                        Tidak Ada Data
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>
        </div>
        {
          open && (
            <Popup onConfirm={handleClose}>
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative w-96 bg-white rounded-lg shadow">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="mb-4 text-xl text-center font-bold text-black">
                      Tambah Petugas
                    </div>
                    <form className="space-y-4" action="#">
                      <div>
                        <Input label='Nama' placeholder='Masukkan Nama' star={true} />
                      </div>
                      <div>
                        <Input label='Email' placeholder='Masukkan Email' star={true} />
                      </div>
                      <div>
                        <Input label='Nik' placeholder='Masukkan Nik' star={true} />
                      </div>
                      <div className="py-2">
                        <Button onClick={handleclick} label='Tambahkan' />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Popup>
          )
        }
        {
          edit && (
            <Popup onConfirm={handleEditClose}>
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative w-96 bg-white rounded-lg shadow">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="mb-4 text-xl text-center font-bold text-black">
                      Edit Petugas
                    </div>
                    <form className="space-y-4" action="#">
                      <div>
                        <Input label='Nama' placeholder='Masukkan Nama' star={true} />
                      </div>
                      <div>
                        <Input label='Email' placeholder='Masukkan Email' star={true} />
                      </div>
                      <div>
                        <Input label='Nik' placeholder='Masukkan Nik' star={true} />
                      </div>
                      <div className="py-2">
                        <Button onClick={handleclick} label='Tambahkan' />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Popup>
          )
        }
      </div>
    </section>
  )
}

export default DataOfficer
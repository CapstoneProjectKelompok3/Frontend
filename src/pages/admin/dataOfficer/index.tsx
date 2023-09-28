import { useState } from 'react';
import Button from '../../../component/Button';
import Navbar from '../../../component/Navbar'
import Popup from '../../../component/Popup';
import Sidebar from '../../../component/Sidebar'

const DataOfficer = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";
  const [open, setOpen] = useState(false)
  
  const handleclick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-24 px-8">
        <div className="flex justify-between py-2 gap-4">
          <div className="w-full relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa-solid fa-magnifying-glass text-secondary"></i>
            </div>
            <input type="text" className="input input-bordered bg-white w-1/4 px-10 text-secondary font-medium input-md max-w-lg" placeholder="Cari Kasus" />
          </div>
          <Button onClick={handleclick} label='Tambah' />
        </div>
        <div className="overflow-x-auto border p-2 rounded-md">
          <table className="table">
            <thead>
              <tr className="bg-primary border-none rounded-md text-white text-lg">
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>NIK</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-300-200 items-center border-none font-medium">
                <td>
                  <div>1</div>
                </td>
                <td>
                  Petugas 1
                </td>
                <td>
                  email@email.com
                </td>
                <td>
                  351220009883777
                </td>
                <td>
                  <div className='flex gap-8'>
                    <div className='cursor-pointer hover:text-primary'>
                      <i className="fa-solid fa-trash text-2xl"></i>
                    </div>
                    <div className='cursor-pointer hover:text-primary'>
                      <i className="fa-solid fa-pen-to-square text-2xl"></i>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
                        <label className="block py-1 text-sm font-medium text-black">
                          Nama <span className='text-primary'>*</span>
                        </label>
                        <input type="text" className="input input-bordered bg-white w-full text-secondary font-medium input-md max-w-lg" placeholder="Masukkan Nama" />
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Email <span className='text-primary'>*</span>
                        </label>
                        <input type="text" className="input input-bordered bg-white w-full text-secondary font-medium input-md max-w-lg" placeholder="Masukkan Email" />
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          NIK <span className='text-primary'>*</span>
                        </label>
                        <input type="text" className="input input-bordered bg-white w-full text-secondary font-medium input-md max-w-lg" placeholder="Masukkan NIK" />
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
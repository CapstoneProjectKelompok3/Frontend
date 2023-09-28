import { useState } from 'react';
import Button from '../../../component/Button';
import Navbar from '../../../component/Navbar'
import Popup from '../../../component/Popup';
import Sidebar from '../../../component/Sidebar'
import Input from '../../../component/Input';

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
      <div className="ml-[20vw] pt-32 px-8">
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
                    <div className='flex gap-7'>
                      <div className='cursor-pointer hover:text-primary'>
                        <i className="fa-solid fa-trash text-lg"></i>
                      </div>
                      <div className='cursor-pointer hover:text-primary'>
                        <i className="fa-solid fa-pen-to-square text-lg"></i>
                      </div>
                    </div>
                  </td>
                </tr>
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
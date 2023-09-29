import Button from "../../../component/Button"
import Input from "../../../component/Input"
import Navbar from "../../../component/Navbar"
import Popup from "../../../component/Popup"
import Sidebar from "../../../component/Sidebar"
import { useState } from 'react'

const DataAdmin = () => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

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

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input
                placeholder="Cari Admin"
                className="p-3 w-full"
                search={
                  <i className="fa-solid text-secondary fa-magnifying-glass"></i>
                }
              />
            </div>
            <div>
              <Button onClick={handleclick} label="Tambah" />
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-300-200 items-center border-none font-medium">
                  <td>
                    <div>1</div>
                  </td>
                  <td>Admin 1</td>
                  <td>admin@email.com</td>
                  <td>
                    <div className='flex gap-7'>
                      <div onClick={handleEdit} className='cursor-pointer hover:text-primary'>
                        <i className="fa-solid fa-pen-to-square text-md"></i>
                      </div>
                      <div className='cursor-pointer hover:text-primary'>
                        <i className="fa-solid fa-trash text-md"></i>
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
                      Tambah Admin
                    </div>
                    <form className="space-y-4" action="#">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Nama Admin<span className='text-primary'>*</span>
                        </label>
                        <Input placeholder="Masukkan Nama Admin" className="p-3 w-full" />
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Alamat <span className='text-primary'>*</span>
                        </label>
                        <Input placeholder="Masukkan Alamat Admin" className="p-3 w-full" />
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
                      Edit Admin
                    </div>
                    <form className="space-y-4" action="#">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Nama Admin<span className='text-primary'>*</span>
                        </label>
                        <Input placeholder="Masukkan Nama Admin" className="p-3 w-full" />
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Alamat <span className='text-primary'>*</span>
                        </label>
                        <Input placeholder="Masukkan Alamat Admin" className="p-3 w-full" />
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
  );
};

export default DataAdmin;

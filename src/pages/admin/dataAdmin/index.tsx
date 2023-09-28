import Button from "../../../component/Button"
import Input from "../../../component/Input"
import Navbar from "../../../component/Navbar"
import Sidebar from "../../../component/Sidebar"

const DataAdmin = () => {
  const handleclick = () => {

  }
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-32 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input placeholder="Cari Admin" className="p-3 w-full" search={<i className="fa-solid text-secondary fa-magnifying-glass"></i>} />
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-300-200 items-center border-none font-medium">
                  <td>
                    <div>1</div>
                  </td>
                  <td>
                    Admin 1
                  </td>
                  <td>
                    admin@email.com
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
        </div>
      </div>
    </section >
  )
}

export default DataAdmin
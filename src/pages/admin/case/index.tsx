import Input from "../../../component/Input"
import Navbar from "../../../component/Navbar"
import Sidebar from "../../../component/Sidebar"

const Case = () => {
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-32 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input placeholder="Cari Kasus" className="p-3 w-full" search={<i className="fa-solid text-secondary fa-magnifying-glass"></i>} />
            </div>
            <div>
              <select className="select select-bordered bg-white text-secondary p-2 font-medium w-56 h-full select-md">
                <option disabled selected>Pilih Kasus</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-lg">
                  <th>No</th>
                  <th>Deskripsi Kasus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-300-200 border-none font-medium">
                  <td>
                    <div>1</div>
                  </td>
                  <td>
                    Kebakaran Persimpangan Tiga
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Case
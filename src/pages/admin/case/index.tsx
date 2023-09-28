import Navbar from "../../../component/Navbar"
import Sidebar from "../../../component/Sidebar"

const Case = () => {
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
          <select className="select select-bordered bg-white text-secondary font-medium w-52 select-md max-w-lg">
            <option disabled selected>Pilih Kasus</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="overflow-x-auto border p-2 rounded-md">
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
    </section>
  )
}

export default Case
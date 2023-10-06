import Button from "../../../component/Button";
import Navbar from "../../../component/Navbar";
import Popup from "../../../component/Popup";
import Sidebar from "../../../component/Sidebar";
import Input from "../../../component/Input";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const DataOfficer = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const token = Cookie.get("token");
  const navigate = useNavigate();
  const role = Cookie.get("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (role === "user") {
      navigate("/beranda");
    } else if (role === "superadmin") {
      navigate("/dashboard");
    }
  });

  const getOfficer = () => {
    axios
      .get("https://belanjalagiyuk.shop/drivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch(() => {
        toast.error("Gagal mendapatkan petugas");
      });
  };

  useEffect(() => {
    getOfficer();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
  };

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input
                placeholder="Cari Petugas"
                className="p-3 w-full"
                search={
                  <i className="fa-solid text-secondary fa-magnifying-glass"></i>
                }
              />
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Goverment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr className="bg-gray-300-200 items-center border-none font-medium">
                        <td>{index+1}</td>
                        <td>{item.fullname}</td>
                        <td>{item.email}</td>
                        <td>{item.goverment_name}</td>
                        <td className="uppercase">{item.driving_status}</td>
                        <td>
                          <div className="flex gap-7">
                            <div
                              onClick={handleEdit}
                              className="cursor-pointer hover:text-primary"
                            >
                              <i className="fa-solid fa-pen-to-square text-md"></i>
                            </div>
                            <div className="cursor-pointer hover:text-primary">
                              <i className="fa-solid fa-trash text-md"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-0">
                    <td colSpan={6} className="text-center font-semibold">
                      Tidak Ada Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {edit && (
          <Popup onConfirm={handleEditClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative w-96 bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Edit Petugas
                  </div>
                  <form className="space-y-4" action="#">
                    <div>
                      <Input
                        label="Nama"
                        placeholder="Masukkan Nama"
                        star={true}
                      />
                    </div>
                    <div>
                      <Input
                        label="Email"
                        placeholder="Masukkan Email"
                        star={true}
                      />
                    </div>
                    <div>
                      <Input
                        label="Nik"
                        placeholder="Masukkan Nik"
                        star={true}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </section>
  );
};

export default DataOfficer;

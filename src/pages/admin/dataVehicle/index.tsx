import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Sidebar from "../../../component/Sidebar";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import Popup from "../../../component/Popup";
import { useFormik } from "formik";
import { validateVehicle } from "../../../validate/auth";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

function Vehicle() {
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [goverment, setGoverment] = useState<any>([]);
  const [vehicle, setVehicle] = useState<any>([]);
  const [updateVehicle, setUpdateVehicle] = useState<any>([]);
  const token = Cookie.get("token");

  const unSelectGoverment = goverment.filter(item => {
    return item.id !== updateVehicle.goverment_id
  });
    
  const formik = useFormik({
    initialValues: {
      plate: "",
      goverment_id: "",
    },
    validationSchema: validateVehicle,
    onSubmit: (values) => {
      axios
        .post(
          `https://belanjalagiyuk.shop/vehicles`,
          {
            plate: values.plate,
            goverment_id: parseInt(values.goverment_id),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Data vehicle berhasil dibuat");
          setAdd(false);
          getVehicle();
        })
        .catch((error) => {
          toast.error("Data Vehicle gagal dibuat");
        });
    },
  });

  const updateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      plate: updateVehicle.plate,
      goverment_id: "",
    },
    validationSchema: validateVehicle,
    onSubmit: (values) => {
      axios
        .post(
          `https://belanjalagiyuk.shop/vehicles`,
          {
            plate: values.plate,
            goverment_id: parseInt(values.goverment_id),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Data vehicle berhasil dibuat");
          setAdd(false);
          getVehicle();
        })
        .catch((error) => {
          toast.error("Data Vehicle gagal dibuat");
        });
    },
  });

  const getVehicle = () => {
    axios
      .get("https://belanjalagiyuk.shop/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVehicle(res?.data?.data);
      })
      .catch(() => {
        toast.error("Gagal mendapatkan data");
      });
  };

  const getGoverment = () => {
    axios
      .get("https://belanjalagiyuk.shop/governments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGoverment(res?.data?.data);
      })
      .catch(() => {
        toast.error("Data tidak berhasil di dapatkan");
      });
  };

  const handleEdit = (id: string) => {
    setEdit(!edit);

    axios
      .get(`https://belanjalagiyuk.shop/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUpdateVehicle(res?.data?.data);
      })
      .catch(() => {
        toast.error("Gagal mendapatkan data");
      });
  };

  const handleDelete = (id: number) => {
    
  }

  useEffect(() => {
    getGoverment();
    getVehicle();
  }, []);

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input
                placeholder="Cari User"
                className="p-3 w-full"
                search={
                  <i className="fa-solid text-secondary fa-magnifying-glass"></i>
                }
              />
            </div>
            <div>
              <Button
                className="drop-shadow-xl"
                label="Tambah Kendaraan"
                onClick={() => setAdd(!add)}
              />
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                  <th>No</th>
                  <th>No Plat</th>
                  <th>Goverment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicle &&
                  vehicle.map((item, index) => {
                    return (
                      <tr className="bg-gray-300-200 items-center border-none font-medium">
                        <td>
                          <div>{index + 1}</div>
                        </td>
                        <td>{item.plate}</td>
                        <td>{item.goverment.name_goverment}</td>
                        <td>
                          <div className="flex gap-7">
                            <div
                              className="cursor-pointer hover:text-primary"
                              onClick={() => handleEdit(item.id)}
                            >
                              <i className="fa-solid fa-pen-to-square text-md"></i>
                            </div>
                            <div className="cursor-pointer hover:text-primary" onClick={() => handleDelete(item.id)}>
                              <i className="fa-solid fa-trash fa-lg"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {add && (
            <Popup onConfirm={() => setAdd(false)}>
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative w-96 bg-white rounded-lg shadow">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="mb-4 text-xl text-center font-bold text-black">
                      Tambah Vehicle
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="space-y-4"
                      action="#"
                    >
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          No Plat <span className="text-primary">*</span>
                        </label>
                        <Input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="plate"
                          placeholder="Masukkan No Plat"
                          className="p-3 w-full"
                        />
                        {formik.touched.plate && formik.errors.plate ? (
                          <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                            {formik.errors.plate}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Goverment <span className="text-primary">*</span>
                        </label>
                        <select
                          name="goverment_id"
                          className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {goverment &&
                            goverment.map((item: any, index: number) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="py-2 flex justify-end">
                        <Button type="submit" label="Tambahkan" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Popup>
          )}
          {edit && (
            <Popup onConfirm={() => setEdit(false)}>
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative w-96 bg-white rounded-lg shadow">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="mb-4 text-xl text-center font-bold text-black">
                      Edit Vehicle
                    </div>
                    <form
                      onSubmit={updateFormik.handleSubmit}
                      className="space-y-4"
                      action="#"
                    >
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          No Plat <span className="text-primary">*</span>
                        </label>
                        <Input
                          onChange={updateFormik.handleChange}
                          onBlur={updateFormik.handleBlur}
                          name="plate"
                          placeholder="Masukkan No Plat"
                          className="p-3 w-full"
                          value={updateFormik.values.plate}
                        />
                        {updateFormik.touched.plate && updateFormik.errors.plate ? (
                          <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                            {updateFormik.errors.plate}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Goverment <span className="text-primary">*</span>
                        </label>
                        <select
                          name="goverment_id"
                          className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md"
                        >
                          <option value={updateVehicle.goverment_id} selected>
                            {updateVehicle?.goverment?.name_goverment}
                          </option>
                          {unSelectGoverment &&
                            unSelectGoverment.map((item: any, index: number) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="py-2 flex justify-end">
                        <Button type="submit" label="Tambahkan" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </div>
      </div>
    </section>
  );
}

export default Vehicle;

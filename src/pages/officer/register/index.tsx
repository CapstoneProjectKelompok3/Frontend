import { useEffect, useState } from "react";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validateRegisterOffice } from "../../../validate/auth";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const [data, setData] = useState<any>([]);
  const defaultVehicle = data[0];
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()

  const getVehicle = () => {
    axios
      .get("https://belanjalagiyuk.shop/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch(() => toast.error("Gagal mendapatkan kendaraan"));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    });
  }, []);

  useEffect(() => {
    getVehicle();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      vehicle: " ",
      government_id: " ",
      latitude: " ",
      longitude: " ",
    },
    validationSchema: validateRegisterOffice,
    onSubmit: (values: any) => {
      values.vehicle = defaultVehicle.id;
      values.government_id = defaultVehicle.goverment_id      ,
      values.latitude = latitude
      values.longitude = longitude

      axios
        .post("https://belanjalagiyuk.shop/drivers", {
          email: values.email,
          fullname: values.fullname,
          vehicle_id: values.vehicle,
          password: values.password,
          government_id: values.government_id,
          latitude: values.latitude,
          longitude: values.longitude
        })
        .then((res) => {
          toast.success("Daftar Akun Berhasil");
          navigate("/login-petugas");
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.error("Silahkan Periksa Ulang");
          } else {
            toast.error("Server tidak merespon. Mohon coba lagi nanti");
          }
        });
    },
  });

  return (
    <section className="flex flex-row h-screen">
      <div className="flex flex-col justify-center place-items-center md:w-[40vw] w-full">
        <div className="w-full md:px-20 px-6">
          <div className="flex flex-col md:place-items-center">
            <div>
              <img
                src="../../../public/logo.png"
                alt=""
                className="w-28 mb-3 md:block hidden"
              />
            </div>
            <div className="md:text-[14px] text-[18px]">Silahkan Bergabung</div>
            <div className="font-semibold md:text-[26px] text-[30px] tracking-wide md:mb-8 mb-10">
              Daftar
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Input
                  placeholder="Masukkan Fullname"
                  label="Fullname"
                  name="fullname"
                  type="text"
                  className="w-full"
                  icon={<i className="fa-solid fa-user"></i>}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div className="text-red-500 focus:outline-red-500 text-sm font-semibold">
                    {formik.errors.fullname}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder="Masukkan Email"
                  label="Email"
                  name="email"
                  type="email"
                  className="w-full"
                  icon={<i className="fa-solid fa-user"></i>}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 focus:outline-red-500 text-sm font-semibold">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder="*************"
                  label="Password"
                  type="password"
                  name="password"
                  icon={<i className="fa-solid fa-key"></i>}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 focus:outline-red-500 text-sm font-semibold">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="text-secondary">Kendaraan</label>
                <select
                  className="border-b border-line w-full bg-transparent py-2 focus:border-b focus:border-line overflow-y-scroll"
                  name="vehicle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {data &&
                    data.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.plate}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <Button
                  label="Daftar"
                  type="submit"
                  className="w-full md:mt-6 mt-12 mb-2"
                />
              </div>
            </form>
            <div className="text-center">
              Sudah punya akun?{" "}
              <Link
                to="/login-petugas"
                className="text-red-500 hover:text-red-700"
              >
                Masuk Disini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

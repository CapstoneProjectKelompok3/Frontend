import { useEffect } from "react";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validateRegister } from "../../../validate/auth";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      nik: "",
      password: "",
    },
    validationSchema: validateRegister,
    onSubmit: (values: any) => {
      axios
        .post("https://belanjalagiyuk.shop/drivers", {
          email: values.email,
          username: values.username,
          nik: values.nik,
          password: values.password,
        })
        .then((res) => {
          toast.success('Daftar Akun Berhasil')
          navigate('/login-petugas')
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.error('Silahkan Periksa Ulang')
          } else {
            toast.error('Server tidak merespon. Mohon coba lagi nanti')
          }
        })
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
                  placeholder="Masukkan Username"
                  label="Username"
                  name="username"
                  type="text"
                  className="w-full"
                  icon={<i className="fa-solid fa-user"></i>}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 focus:outline-red-500 text-sm font-semibold">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder="123141213123"
                  label="NIK"
                  type="text"
                  name="nik"
                  icon={<i className="fa-solid fa-address-card"></i>}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nik && formik.errors.nik ? (
                  <div className="text-red-500 focus:outline-red-500 text-sm font-semibold">
                    {formik.errors.nik}
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
                <Button
                  label="Daftar"
                  type="submit"
                  className="w-full md:mt-6 mt-12 mb-2"
                />
              </div>
            </form>
            <div className="text-center">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-red-500 hover:text-red-700">
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

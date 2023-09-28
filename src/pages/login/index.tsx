import React from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validateLogin } from "../../validate/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validationSchema: validateLogin
  //   onSubmit: (values) => {
  //     axios.post('/login', {
  //       email: values.email,
  //       password: values.password
  //     })
  //     .then((res) => {

  //     })
  //     .catch((err) => {
  //       if(err.response && err.response.status === 500) {
  //         toast.
  //       }
  //     })
  //   }
  // })

  return (
    <section className="flex flex-row h-screen">
      <div className="flex flex-col justify-center place-items-center md:w-[40vw] w-full">
        <div className="w-full md:px-20 px-6">
          <div className="flex flex-col md:place-items-center">
            <div>
              <img src="../../../public/logo.png" alt="" className="w-28 mb-3 md:block hidden" />
            </div>
            <div className="md:text-[14px] text-[18px]">Silahkan Bergabung</div>
            <div className="font-semibold md:text-[26px] text-[30px] tracking-wide md:mb-8 mb-16">
              Masuk
            </div>
          </div>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <div>
            <Input
              placeholder="Masukkan Email"
              label="Email"
              name="email"
              type="email"
              className="w-full mb-9 md:mb-4"
              icon={<i className="fa-solid fa-user"></i>}
              // onChange={formik.handleChange}
            />
          </div>
          <div>
            <Input
              placeholder="*************"
              label="Password"
              type="password"
              name="password"
              icon={<i className="fa-solid fa-key"></i>}
              className="w-full"
              // onChange={formik.handleSubmit}
            />
          </div>
          <div>
            <Button label="Masuk" type="submit" className="w-full md:mt-6 mt-12 mb-2" />
          </div>
          {/* </form> */}
          <div className="text-center">
            Belum punya akun? <Link to="/register" className="text-red-500 hover:text-red-700">Daftar Disini</Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[60vw] h-screen">
        <img
          src="../../../public/loginBackground.png"
          alt=""
          className="h-screen"
        />
      </div>
    </section>
  );
};

export default LoginPage;

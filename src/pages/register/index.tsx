import React from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Link } from "react-router-dom";

const Register = () => {
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
            <div>
              <Input
                placeholder="Masukkan Username"
                label="Username"
                name="username"
                type="text"
                className="w-full"
                icon={<i className="fa-solid fa-user"></i>}
                // onChange={formik.handleChange}
              />
            </div>
            <div>
              <Input
                placeholder="Masukkan Email"
                label="Email"
                name="email"
                type="email"
                className="w-full"
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
              <Input
                placeholder="123141213123"
                label="NIK"
                type="number"
                name="nik"
                icon={<i className="fa-solid fa-address-card"></i>}
                className="w-full"
                // onChange={formik.handleSubmit}
              />
            </div>
            <div>
              <Button
                label="Daftar"
                type="submit"
                className="w-full md:mt-6 mt-12 mb-2"
              />
            </div>
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

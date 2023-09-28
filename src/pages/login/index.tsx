import React from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="grid grid-cols-2 h-screen">
      <div className="flex flex-col ">
        <div>
          <img src="../../../public/logo.png" alt="" className="w-28"/>
        </div>
        <div className="text-[14px]">Silahkan Bergabung</div>
        <div className="font-semibold text-[20px]">Masuk</div>
        <div>
          <Input
            placeholder="Masukkan Email"
            label="Email"
            icon={<i className="fa-solid fa-user"></i>}
          />
        </div>
        <div>
          <Input
            placeholder="*************"
            label="Password"
            icon={<i className="fa-solid fa-key"></i>}
          />
        </div>
        <div>
          <Button label="Masuk"/>
        </div>
        <div>
        Belum punya akun? <Link to='/register'>Daftar Disini</Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          src="../../../public/loginBackground.png"
          alt=""
          className="h-96"
        />
      </div>
    </section>
  );
};

export default LoginPage;

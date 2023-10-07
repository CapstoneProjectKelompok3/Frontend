import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { useState } from 'react'
import { motion } from 'framer-motion'
const Sidebar = () => {
  const role = Cookie.get("role");
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("role");
    Cookie.remove("id");
    Cookie.remove("roomid");

    navigate("/login");
    toast.success("Berhasil Logout");
  };

  const variant = {
    expand: { width: '5%' },
    nonExpand: { width: '15%' },
  };
  return (
    <motion.div
      animate={open ? 'expand' : 'nonExpand'}
      variants={variant}
      className={`h-[100vh] bg-white text-black fixed px-3 py-16 flex flex-col justify-between`}>
      <div>
        <div className={`w-full flex ${!open ? 'justify-end' : 'justify-center px-3'}`}>
          <div
            onClick={() => setOpen(!open)}
            className={`w-10 h-10  rounded-lg cursor-pointer shadow-lg bg-gray-100 flex justify-center items-center`}
          >
            {open ? <i className="fa-solid fa-caret-right"></i> : <i className="fa-solid fa-caret-left"></i>}
          </div>
        </div>

        {
          !open ? (
            <div className="text-center font-bold text-[20px]">
              Emergency <span className="text-primary">CallCenter</span>{" "}
              <div className="text-[20px]">Indonesia</div>
            </div>
          ) : null
        }


        <ul className="list-none px-3 mt-4">
          <Link to="/dashboard">
            <li
              className={`${pathname === "/dashboard" ? "bg-primary text-white font-semibold" : ""
                } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md   ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
            >
              <div>
                <i className="fa-solid fa-house"></i>
              </div>
              {
                !open ? (
                  <div>Dashboard</div>
                ) : null
              }
            </li>
          </Link>
          {role === "superadmin" ? (
            <div>
              <Link to='/data-user'>
                <li
                  className={`${pathname === "/data-user" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md  ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
                >
                  <div>
                    <i className="fa-solid fa-users"></i>
                  </div>
                  {
                    !open ? (
                      <div>Data Admin</div>
                    ) : null
                  }
                </li>
              </Link>
            </div>

          ) : null}
          {role === "admin" ? (
            <>
              <Link to="/data-goverment">
                <li
                  className={`${pathname === "/data-goverment" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md  ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
                >
                  <div>
                    <i className="fa-regular fa-building"></i>
                  </div>
                  {
                    !open ? (
                      <div>Data Goverment</div>
                    ) : null
                  }

                </li>
              </Link>
              <Link to='/data-user'>
                <li
                  className={`${pathname === "/data-user" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md  ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
                >
                  <div>
                    <i className="fa-solid fa-users"></i>
                  </div>
                  {
                    !open ? (
                      <div>Data User</div>
                    ) : null
                  }

                </li>
              </Link>
              <Link to="/chat-layanan">
                <li
                  className={`${pathname === "/chat-layanan" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md   ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
                >
                  <div>
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  {
                    !open ? (
                      <div>Chat Service</div>
                    ) : null
                  }
                </li>
              </Link>
              <Link to="/kasus">
                <li
                  className={`${pathname === "/kasus" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md   ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}
                >
                  <div>
                    <i className="fa-solid fa-copy"></i>
                  </div>
                  {
                    !open ? (
                      <div>Kasus</div>
                    ) : null
                  }
                </li>
              </Link>
              <Link to="/data-petugas">
                <li
                  className={`${pathname === "/data-petugas" ? "bg-primary text-white font-semibold" : ""
                    } hover:scale-105 transition hover:drop-shadow-xl flex flex-row gap-x-4 align-middle rounded-md  ${!open ? 'px-10' : 'px-5 justify-center'} py-3 mb-3 w-full hover:bg-primary hover:text-white hover:font-semibold`}>
                  <div>
                    <i className="fa-solid fa-users"></i>
                  </div>
                  {
                    !open ? (
                      <div>Data Petugas</div>
                    ) : null
                  }
                </li>
              </Link>
            </>
          ) : null}
        </ul>
      </div>
      <div>
        <ul className="list-none px-3">
          <div onClick={() => handleLogout()}>
            <li className={`flex flex-row gap-x-4 align-middle rounded-md ${!open ? 'px-10' : 'px-5'} py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold`}>
              <div>
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              {
                !open ? (
                  <div>Logout</div>
                ) : null
              }
            </li>
          </div>
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;

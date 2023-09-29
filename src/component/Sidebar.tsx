import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20vw] h-[100vh] bg-white text-black fixed px-3 py-16 flex flex-col justify-between">
      <div>
        <div className="text-center font-bold text-[20px]">
          Emergency <span className="text-primary">CallCenter</span> <div className="text-[20px]">Indonesia</div>
        </div>
        <ul className="list-none px-3 mt-4">
          <Link to='/dashboard'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md bg-primary text-white px-10 py-3 mb-3 font-semibold">
              <div>
                <i className="fa-solid fa-house"></i>
              </div>
              <div>Dashboard</div>
            </li>
          </Link>
          <Link to='/data-admin'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
              <div>Data Admin</div>
            </li>
          </Link>
          <Link to='/data-goverment'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
              <i className="fa-regular fa-building"></i>
              </div>
              <div>Data Goverment</div>
            </li>
          </Link>
          <Link to='/chat-layanan'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md  px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
                <i className="fa-solid fa-headset"></i>
              </div>
              <div>Chat Service</div>
            </li>
          </Link>
          <Link to='/kasus'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md  px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
                <i className="fa-solid fa-copy"></i>
              </div>
              <div>Kasus</div>
            </li>
          </Link>
          <Link to='/data-petugas'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md  px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
                <i className="fa-solid fa-users"></i>
              </div>
              <div>Data Petugas</div>
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="list-none px-3">
          <Link to='/'>
            <li className="flex flex-row gap-x-4 align-middle rounded-md px-10 py-3 mb-3 hover:bg-primary hover:text-white hover:font-semibold">
              <div>
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              <div>Logout</div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

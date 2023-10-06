import Button from "../../../component/Button";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Message = () => {
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, []);
  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      navigate("/dashboard");
    }
  });

  return (
    <div className="h-screen w-full">
      <div>
        {/* navbar chat */}
        <div className="h-16 bg-primary shadow-sm rounded-sm">
          <div className="flex gap-5 items-center justify-between h-full px-5">
            <div onClick={() => navigate('/lokasi')} className="bg-none  w-15 h-15 flex items-center justify-center ">
              <i className="fa-solid fa-location-dot text-2xl text-white"></i>
            </div>
            <div className="font-semibold text-white">Costumer Service</div>
            <div onClick={() => navigate('/riwayat')} className="bg-none  w-15 h-15 flex items-center justify-center ">
              <i className="fa-solid fa-clock-rotate-left text-2xl text-white"></i>
            </div>
          </div>
        </div>

        <div className="overflow-y-scroll w-full">
          {/* content chat  */}
          <div className="p-5 max-h-[80vh] overflow-y-scroll space-y-4 mb-24">
            <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
              <p>Halo Perkenalkan saya admin</p>
            </div>
            <div className="flex justify-end">
              <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                <p className="text-white">
                  Halo saya membutuhkan ambulance tolong segera mengirmkan
                </p>
              </div>
            </div>
          </div>
          {/* bottom input and btn  */}
          <div className="p-4 absolute bottom-0 w-full">
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="bg-white input-bordered text-white input input-md w-full"
                placeholder="Masukkan Pesan"
              />
              <Button label="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

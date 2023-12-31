import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import sirine from "../../../assets/sirine.png";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const LandingPage = () => {
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [buttonSpeach, setButtonSpeach] = useState<boolean>(false);
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
    if (role !== "user") {
      navigate("/dashboard");
    }
  }, []);

  const StartRecording = () => {
    SpeechRecognition.startListening({ continuous: true, language: "id" });
    setButtonSpeach(true);
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const StopRecording = () => {
    setButtonSpeach(false);
    SpeechRecognition.stopListening();

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("userLatitude", latitude);
          localStorage.setItem("userLongitude", longitude);
          localStorage.setItem("isConfirm", false);
          navigate("/lokasi");
          axios
            .post(
              `https://09ae-103-171-182-11.ngrok-free.app/message/newmessage`,
              {
                message: transcript,
                latitude: latitude,
                longitude: longitude
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              Cookie.set("roomid", response.data.room);
              Cookie.set("admin", response.data.admin);
              navigate("/lokasi");
            })
            .catch((error: any) => {
              console.log(error.response);
            });
        },
        () => {
          toast.error("Gagal mendapatkan lokasi");
        }
      );
    }, 1500);
  };

  useEffect(() => {
    localStorage.setItem("speach-text", transcript);
  }, [transcript, browserSupportsSpeechRecognition]);

  return (
    <div className="h-screen w-full relative">
      <div className="container mx-auto relative z-10">
        <div className="py-5 px-4 flex justify-between items-center">
          <div className="text-lg">
            Halo, <span className="font-semibold">User</span>
          </div>
          <div>
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="w-8 h-8 p-0 cursor-pointer rounded-full flex items-center justify-center">
              <i className="fa-solid fa-circle-info fa-xl"></i>
            </button>
          </div>
          {
            hover ? (
              <div className="absolute top-10 right-10 z-10 w-64 h-32 bg-gray-100 rounded-lg">
                <div className="p-3 text-sm font-thin">
                  Klik tombol di bawah ini, dan Anda akan terhubung langsung ke admin kami untuk memberi tahu kami apa yang Anda butuhkan.
                </div>
              </div>
            ) : null
          }
        </div>
        <div className="flex justify-center py-2">
          Emergency CallCenter Indonesia
        </div>
        <div className="flex justify-center items-center w-full h-[60vh]">
          <div className="transition hover:scale-95 w-56 h-56 flex rounded-full justify-center items-center bg-none border-2 border-[#f4c9c9]">
            {buttonSpeach === false ? (
              <div
                onClick={() => StartRecording()}
                className="w-48 h-48 flex drop-shadow-xl shadow-[#F89192]  justify-center items-center rounded-full bg-[#F89192] cursor-pointer"
              >
                <div className="w-36 h-36 flex justify-center items-center bg-primary rounded-full">
                  <img src={sirine} alt="" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => StopRecording()}
                className="w-48 h-48 flex drop-shadow-xl shadow-[#F89192]  justify-center items-center rounded-full bg-[#F89192] cursor-pointer"
              >
                <div className="w-36 h-36 flex justify-center items-center bg-primary rounded-full">
                  <div>
                    <i className="fa-solid fa-xmark text-white text-5xl"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center font-semibold">
          Tekan Tombol untuk Meminta bantuan
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[12vh] px-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-row justify-between place-items-center h-full px-5">
          <div
            onClick={() => navigate("/beranda")}
            className={`flex flex-col place-items-center ${
              pathname === "/beranda" ? "text-black fa-lg" : "text-secondary"
            } `}
          >
            <i className="fa-solid fa-house"></i>
          </div>
          <div
            onClick={() => navigate("/riwayat")}
            className={`flex flex-col place-items-center ${
              pathname === "/riwayat" ? "text-black fa-lg" : "text-secondary"
            } `}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div
            onClick={() => navigate("/profile")}
            className={`flex flex-col place-items-center ${
              pathname === "/profile" ? "text-black fa-lg" : "text-secondary"
            } `}
          >
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

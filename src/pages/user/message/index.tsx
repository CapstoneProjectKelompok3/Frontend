import Button from "../../../component/Button";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import io, { Socket } from "socket.io-client";
import axios from "axios";

interface Message {
  content: string;
  senderId: number | string;
}
const Message = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<string>("");

  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const navigate = useNavigate();
  const idUser = Cookie.get("uid");
  const idRoom = Cookie.get("roomid");
  const adminName = Cookie.get('admin')
  const socket: Socket = io("https://09ae-103-171-182-11.ngrok-free.app");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
      if (!idRoom) {
        navigate("/beranda");
      }
    }
  }, []);
  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    getDataMessage();
  });

  useEffect(() => {
    socket.on("userMenerima", (message: any) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { content: message.content, senderId: message.iduser },
        ];
      });
    });

    return () => {
      socket.off("userMenerima");
    };
  }, []);

  const sendMessage = async () => {
    socket.emit("userMessage", {
      content: chat,
      idroom: Number(idRoom),
      iduser: Number(idUser),
    });
    setChat("");
  };

  const getDataMessage = async () => {
    console.log(idRoom)
    try {
      const response = await axios.get(
        `https://api.flattenbot.site/message/getmessage/${idRoom}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full">
      <div>
        {/* navbar chat */}
        <div className="h-16 bg-primary shadow-sm rounded-sm">
          <div className="flex gap-5 items-center justify-between h-full px-5">
            <div onClick={() => navigate('/lokasi')} className="bg-none  w-15 h-15 flex items-center justify-center ">
              <i className="fa-solid fa-location-dot text-2xl text-white"></i>
            </div>
            <div className="font-semibold text-white">{adminName}</div>
            <div onClick={() => navigate('/riwayat')} className="bg-none  w-15 h-15 flex items-center justify-center ">
              <i className="fa-solid fa-clock-rotate-left text-2xl text-white"></i>
            </div>
          </div>
        </div>

        <div className="p-5 max-h-[80vh] overflow-y-scroll">
          {messages &&
            messages.map((element, index) => {
              console.log(element, "iniuser");
              console.log(element, "inielement");
              return (
                <div key={index}>
                  {element.senderId.toString() !== idUser?.toString() ? (
                    <div className="flex justify-start py-2">
                      <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
                        <p>{element.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end py-2">
                      <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                        <p className="text-white">{element.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div className="p-4 absolute bottom-0 w-full">
          <div className="flex items-center gap-4">
            <input
              type="text"
              required
              value={chat}
              className="bg-white  input-bordered  input input-md w-full"
              onChange={(e) => setChat(e.target.value)}
              placeholder="Masukkan Pesan"
            />
            {chat ? (
              <Button onClick={() => sendMessage()} label="send" />
            ) : (
              <Button
                className="cursor-not-allowed"
                disabled
                onClick={() => sendMessage()}
                label="send"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

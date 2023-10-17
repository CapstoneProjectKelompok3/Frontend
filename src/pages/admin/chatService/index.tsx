import { useState } from "react";
import Button from "../../../component/Button";
import Navbar from "../../../component/Navbar";
import Sidebar from "../../../component/Sidebar";
import Input from "../../../component/Input";
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import io, { Socket } from "socket.io-client";
import axios from "axios";

interface Message {
  content: string;
  senderId: number | string;
}

interface Room {
  idRoom: number;
  username: string;
  emergencyId: number;
  senderId: number | string;
}
const ChatService = () => {
  let [police, setPolice] = useState<number>(0);
  let [damkar, setDamkar] = useState<number>(0);
  let [ambulance, setAmbulance] = useState<number>(0);
  let [sar, setSar] = useState<number>(0);
  let [dishub, setDishub] = useState<number>(0);

  const [checkedPolice, setCheckedPolice] = useState<boolean>(false);
  const [checkedDamkar, setCheckedDamkar] = useState<boolean>(false);
  const [checkedAmbulance, setCheckedAmbulance] = useState<boolean>(false);
  const [checkedSar, setCheckedSar] = useState<boolean>(false);
  const [checkedDishub, setCheckedDishub] = useState<boolean>(false);
  const [room, setRoom] = useState<Room[]>([]);
  const [nameChat, setNameChat] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [emergency, setEmergency] = useState<number>(0);
  const [chat, setChat] = useState<string>("");
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const socket: Socket = io("https://api.flattenbot.site");
  const idUser = Cookie.get("uid");
  const token = Cookie.get("token");
  const role = Cookie.get('role')
  const latitude = Cookie.get('userLatitude')
  const longitude = Cookie.get('userLongitude')
  const navigate = useNavigate()

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";
  const toggleAttachOptions = () => {
    setShowAttachOptions(!showAttachOptions);
  };
  useEffect(() => {
    socket.on("adminMenerima", (message: any) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { content: message.content, senderId: message.iduser },
        ];
      });
    });

    // Hapus listener saat komponen unmount
    return () => {
      socket.off("adminMenerima");
    };
  }, []);

  const updateSelectedPersonAndGetDataMessage = async (newValue: any) => {
    await getDataMessage(newValue);
  };

  const getChat = async () => {
    try {
      const response = await axios.get(
        `https://09ae-103-171-182-11.ngrok-free.app/message/getroom`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoom(response.data.data);
      console.log(response.data, "axios");
    } catch (error) {
      console.log(error);
    }
  };
  const getDataMessage = async (selectedValue: number) => {
    try {
      const response = await axios.get(
        `https://09ae-103-171-182-11.ngrok-free.app/message/getmessage/${selectedValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data);
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDriver = () => {
    axios.post(`https://belanjalagiyuk.shop/drivers/assign?police=${police}&hospital=${ambulance}&firestation=${damkar}&dishub=${dishub}&SAR=${sar}&emergency_id=${emergency}`,{
      longitude: latitude,
      latitude: longitude
    },{
      headers:{
        Authorization : `Bearer ${token}`
      }
    }).then((response)=> {
      console.log(response.data)
      toast.success("Unit Berhasil Dikerahkan")
      setShowAttachOptions(false)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const sendMessage = async () => {
    console.log(idUser)
    socket.emit("adminMessage", {
      content: chat,
      idroom: id,
      iduser: Number(idUser),
    });
    setChat("");
  };

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  useEffect(() => {
    if (role === 'user') {
      navigate('/beranda')
    } else if (role === 'superadmin') {
      navigate('/dashboard')
    }
  })

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md px-10 pt-10 pb-5">
          <div className="flex h-[75vh] bg-white">
            {/* sidebar chat  */}
            <div className="bg-background h-full w-[15vw] overflow-y-scroll rounded-tl-md rounded-bl-md">
              <div className="bg-gradient-to-b rounded-t-md from-red-500 to-red-700 font-semibold flex items-center gap-4 w-[13vw] h-16 fixed">
                <div className="flex place-items-center justify-center w-full gap-4 text-[16px] text-white">
                  <i className="fa-solid fa-headset"></i>
                  <span>Chat Service</span>
                </div>
              </div>
              <div className="pt-14">
                {/* Ganti nilaix nnt menjadi index */}
                {room.map((element, index) => {
                  return (
                    <div key={index}>
                      <div
                        onClick={() => {
                          updateSelectedPersonAndGetDataMessage(element.idRoom),
                            setId(element.idRoom),
                            setEmergency(element.emergencyId),
                            setNameChat(element.username);
                        }}
                        className="bg-[#D9D9D9] hover:bg-[#D9D9D9] my-2 p-4 flex cursor-pointer items-center gap-4 px-4"
                      >
                        <div className="bg-line w-10 h-10 rounded-full">
                          <img
                            src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x"
                            alt=""
                          />
                        </div>
                        <div className="font-semibold text-white text-[16px]">
                          Room {element.idRoom}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full relative">
              {/* navbar chat */}
              <div className="h-16 py-4 shadow-sm bg-background rounded-tr-md">
                <div>
                  {nameChat && (
                    <div className="flex gap-5 items-center h-full px-5">
                      <div className="bg-line w-10 h-10 rounded-full">
                        <img
                          src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x"
                          alt=""
                        />
                      </div>
                      <div className="font-semibold text-[16px]">
                        {nameChat}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* content chat room  */}
              <div
                className={`${messages.length > 0
                  ? `p-5 max-h-[60vh] overflow-y-auto scrollBg`
                  : null
                  }`}
              >
                {messages &&
                  messages.map((element, index) => {
                    console.log(element, 'ini history')
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
              {/* bottom input and btn  */}
              <div className="p-4 absolute bottom-0 w-full">
                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <Input
                      placeholder="Masukkan Pesan"
                      value={chat}
                      onChange={(e) => setChat(e.target.value)}
                      className="w-full mb-0 border-[#EFEFEF]"
                    />
                  </div>
                  <button
                    onClick={toggleAttachOptions}
                    className="bg-white input input-md input-bordered flex items-center justify-center w-10 h-10 rounded-full border-[#EFEFEF]"
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </button>
                  <Button label="Send" onClick={() => sendMessage()} />
                </div>
              </div>

              {showAttachOptions && (
                <div className="absolute space-y-4 p-4 w-1/4 z-10 bottom-20 right-36 mt-12 bg-white border rounded-lg shadow-lg">
                  <div>
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold">Kepolisian</label>
                      <input
                        type="checkbox"
                        className="checkbox w-5 h-5 border-line"
                        onClick={() => setCheckedPolice(!checkedPolice)}
                      />
                    </div>
                    {checkedPolice ? (
                      <div className="flex gap-4 items-center bg-primary rounded-md px-2 text-white">
                        <div
                          onClick={() => setPolice(police - 1)}
                          className="p-1 hover:border-none"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <input
                          type="number"
                          value={police}
                          className="bg-transparent text-center py-2 focus:outline-none  w-full"
                          style={{ appearance: "none" }}
                        />
                        <div
                          onClick={() => setPolice(police + 1)}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold">Ambulance</label>
                      <input
                        type="checkbox"
                        className="checkbox w-5 h-5 border-line"
                        onClick={() => setCheckedAmbulance(!checkedAmbulance)}
                      />
                    </div>
                    {checkedAmbulance ? (
                      <div className="flex gap-4 items-center bg-primary rounded-md px-2 text-white">
                        <div
                          onClick={() => setAmbulance(ambulance - 1)}
                          className="p-1 hover:border-none"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <input
                          type="number"
                          value={ambulance}
                          className="bg-transparent text-center py-2 focus:outline-none  w-full"
                          style={{ appearance: "none" }}
                        />
                        <div
                          onClick={() => setAmbulance(ambulance + 1)}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold">Damkar</label>
                      <input
                        type="checkbox"
                        className="checkbox w-5 h-5 border-line"
                        onClick={() => setCheckedDamkar(!checkedDamkar)}
                      />
                    </div>
                    {checkedDamkar ? (
                      <div className="flex gap-4 items-center bg-primary rounded-md px-2 text-white">
                        <div
                          onClick={() => setDamkar(damkar - 1)}
                          className="p-1 hover:border-none"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <input
                          type="number"
                          value={damkar}
                          className="bg-transparent text-center py-2 focus:outline-none  w-full"
                          style={{ appearance: "none" }}
                        />
                        <div
                          onClick={() => setDamkar(damkar + 1)}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold">SAR</label>
                      <input
                        type="checkbox"
                        className="checkbox w-5 h-5 border-line"
                        onClick={() => setCheckedSar(!checkedSar)}
                      />
                    </div>
                    {checkedSar ? (
                      <div className="flex gap-4 items-center bg-primary rounded-md px-2 text-white">
                        <div
                          onClick={() => setSar(sar - 1)}
                          className="p-1 hover:border-none"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <input
                          type="number"
                          value={sar}
                          className="bg-transparent text-center py-2 focus:outline-none  w-full"
                          style={{ appearance: "none" }}
                        />
                        <div
                          onClick={() => setSar(sar + 1)}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold">Dishub</label>
                      <input
                        type="checkbox"
                        className="checkbox w-5 h-5 border-line"
                        onClick={() => setCheckedDishub(!checkedDishub)}
                      />
                    </div>
                    {checkedDishub ? (
                      <div className="flex gap-4 items-center bg-primary rounded-md px-2 text-white">
                        <div
                          onClick={() => setDishub(dishub - 1)}
                          className="p-1 hover:border-none"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <input
                          type="number"
                          value={dishub}
                          className="bg-transparent text-center py-2 focus:outline-none  w-full"
                          style={{ appearance: "none" }}
                        />
                        <div
                          onClick={() => setDishub(dishub + 1)}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <textarea
                      className="textarea textarea-bordered bg-transparent"
                      placeholder="Bio"
                    ></textarea>
                  </div>
                  <div>
                    <Button label="Kerahkan" onClick={sendDriver} className="w-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatService;

import { useState } from "react";
import Button from "../../../component/Button";
import Navbar from "../../../component/Navbar";
import Sidebar from "../../../component/Sidebar";
import Input from "../../../component/Input";
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const ChatService = () => {
  const [selectedPerson, setSelectedPerson] = useState<any>(1);

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

  const handleSend = () => { };
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const toggleAttachOptions = () => {
    setShowAttachOptions(!showAttachOptions);
  };
  const token = Cookie.get("token");
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])
  const role = Cookie.get('role')
  useEffect(() => {
    if (role === 'user') {
      navigate('/beranda')
    } else if (role === 'superadmin') {
      navigate('/dashboard')
    }
  })

  const increase = (num: number) => {
    switch (num) {
      case 1:
        setPolice((police += 1));
        break;
      case 2:
        setAmbulance((ambulance += 1));
        break;
      case 3:
        setDamkar((damkar += 1));
        break;
      case 4:
        setSar((sar += 1));
        break;
      default:
        setDishub((dishub += 1));
    }
  };

  const decrease = () => {
    if (police > 0) {
      setPolice((police -= 1));
    }
  };

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

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
                <div
                  onClick={() => setSelectedPerson(1)}
                  className="bg-[#D9D9D9] hover:bg-[#D9D9D9] my-2 p-4 flex cursor-pointer items-center gap-4 px-4"
                >
                  <div className="bg-line w-10 h-10 rounded-full">
                    <img
                      src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x"
                      alt=""
                    />
                  </div>
                  <div className="font-semibold text-white text-[16px]">
                    Eltasya Neu
                  </div>
                </div>
                <div
                  onClick={() => setSelectedPerson(2)}
                  className="my-2 p-4 flex cursor-pointer items-center gap-4 px-4 hover:bg-[#D9D9D9]"
                >
                  <div className="bg-line w-10 h-10 rounded-full">
                    <img
                      src="https://gravatar.com/avatar/d6cee8a1930865e868c4c2f6b4783ea1?s=400&d=robohash&r=x"
                      alt=""
                    />
                  </div>
                  <div className="font-semibold text-[16px]">Samudin Ham</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full relative">
              {/* navbar chat */}
              <div className="h-16 py-4 shadow-sm bg-background rounded-tr-md">
                <div className="flex gap-5 items-center h-full px-5">
                  <div className="bg-line w-10 h-10 rounded-full">
                    <img
                      src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x"
                      alt=""
                    />
                  </div>
                  <div className="font-semibold text-[16px]">Eltasya Neu</div>
                </div>
              </div>

              {/* content chat  */}
              {selectedPerson && selectedPerson === 1 ? (
                <div className="p-5 max-h-[70vh] overflow-y-scroll space-y-4 mb-24">
                  <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
                    <p>
                      Saya membutuhkan sebuah ambulance dan sebuah damkar,
                      terjadi kebakaran yang sangat hebat.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                      <p className="text-white">Baik akan kami kirimkan.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 max-h-[70vh] overflow-y-scroll space-y-4 mb-24">
                  <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
                    <p>
                      Saya membutuhkan sebuah ambulance dan sebuah damkar,
                      terjadi kebakaran yang sangat hebat.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                      <p className="text-white">Baik akan kami kirimkan2.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* bottom input and btn  */}
              <div className="p-4 absolute bottom-0 w-full">
                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <Input
                      placeholder="Masukkan Pesan"
                      className="w-full mb-0 border-[#EFEFEF]"
                    />
                  </div>
                  <button
                    onClick={toggleAttachOptions}
                    className="bg-white input input-md input-bordered flex items-center justify-center w-10 h-10 rounded-full border-[#EFEFEF]"
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </button>
                  <Button label="Send" onClick={handleSend} />
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
                          onClick={() => {
                            decrease();
                          }}
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
                          onClick={() => {
                            increase(1);
                          }}
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
                          onClick={() => {
                            decrease();
                          }}
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
                          onClick={() => {
                            increase(2);
                          }}
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
                          onClick={() => {
                            decrease();
                          }}
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
                          onClick={() => {
                            increase(3);
                          }}
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
                          onClick={() => {
                            decrease();
                          }}
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
                          onClick={() => {
                            increase(4);
                          }}
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
                          onClick={() => {
                            decrease();
                          }}
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
                          onClick={() => {
                            increase(5);
                          }}
                          className="p-1"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <textarea className="textarea textarea-bordered bg-transparent" placeholder="Bio"></textarea>
                  </div>
                  <div>
                    <Button label="Kerahkan" className="w-full" />
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

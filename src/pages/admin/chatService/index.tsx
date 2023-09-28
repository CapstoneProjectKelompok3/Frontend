import { useState } from "react"
import Button from "../../../component/Button"
import Navbar from "../../../component/Navbar"
import Sidebar from "../../../component/Sidebar"

const ChatService = () => {
  const handleSend = () => {

  }
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const toggleAttachOptions = () => {
    setShowAttachOptions(!showAttachOptions);
  };

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-24 px-8">
        <div className="flex h-[87vh] bg-white">
          {/* sidebar chat  */}
          <div className="bg-background h-full  w-[15vw]">
            <div className="bg-gradient-to-b rounded-t-md from-red-500 to-red-700 font-semibold flex items-center gap-4 h-16">
              <div className="flex justify-center w-full gap-4 text-lg text-white">
                <i className="fa-solid fa-headset"></i>
                Chat Service
              </div>
            </div>
            <div className="bg-secondary my-2 p-4 flex cursor-pointer items-center gap-4 px-4">
              <div className='bg-line w-10 h-10 rounded-full'>
                <img src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x" alt="" />
              </div>
              <div className="font-semibold text-white">
                Eltasya Neu
              </div>
            </div>
            <div className="my-2 p-4 flex cursor-pointer items-center gap-4 px-4">
              <div className='bg-line w-10 h-10 rounded-full'>
                <img src="https://gravatar.com/avatar/d6cee8a1930865e868c4c2f6b4783ea1?s=400&d=robohash&r=x" alt="" />
              </div>
              <div className="font-semibold">
                Samudin Ham
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full relative">

            {/* navbar chat */}
            <div className="h-16 py-4 shadow-sm">
              <div className="flex gap-5 items-center h-full px-5">
                <div className='bg-line w-10 h-10 rounded-full'>
                  <img src="https://gravatar.com/avatar/2d20185f4813e2fce560fe1c7ca9ac18?s=400&d=robohash&r=x" alt="" />
                </div>
                <div className="font-semibold">
                  Eltasya Neu
                </div>
              </div>
            </div>

            {/* content chat  */}
            <div className="p-5 max-h-[70vh] overflow-y-scroll space-y-4 mb-24">
              <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
                <p>
                  Saya membutuhkan sebuah ambulance dan sebuah damkar,
                  terjadi kebakaran yang sangat hebat.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                  <p className="text-white">
                    Saya membutuhkan sebuah ambulance dan sebuah damkar,
                    terjadi kebakaran yang sangat hebat.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                  <p className="text-white">
                    Saya membutuhkan sebuah ambulance dan sebuah damkar,
                    terjadi kebakaran yang sangat hebat.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                  <p className="text-white">
                    Saya membutuhkan sebuah ambulance dan sebuah damkar,
                    terjadi kebakaran yang sangat hebat.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                  <p className="text-white">
                    Saya membutuhkan sebuah ambulance dan sebuah damkar,
                    terjadi kebakaran yang sangat hebat.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                  <p className="text-white">
                    Saya membutuhkan sebuah ambulance dan sebuah damkar,
                    terjadi kebakaran yang sangat hebat.
                  </p>
                </div>
              </div>
            </div>

            {/* bottom input and btn  */}
            <div className="p-4 absolute bottom-0 w-full">
              <div className="flex items-center gap-4">
                <input type="text" className="bg-white input input-md input-bordered border-secondary w-full" placeholder="Masukkan Pesan" />
                <button
                  onClick={toggleAttachOptions}
                  className="bg-white input input-md input-bordered border-secondary  flex items-center justify-center w-10 h-10 rounded-full"
                >
                  <i className="fa-solid fa-paperclip"></i>
                </button>
                <Button label="send" onClick={handleSend} />
              </div>
            </div>
            {showAttachOptions && (
              <div className="absolute space-y-4 p-4 w-1/4 z-10 bottom-20 right-36 mt-12 bg-white border rounded-lg shadow-lg">
                <div>
                  <label className="font-semibold">Kepolisian</label>
                  <div className="flex gap-4 items-center">
                    <button>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      defaultValue={1}
                      className="bg-white text-center input input-md input-bordered w-full"
                    />
                    <button>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-semibold">Ambulans</label>
                </div>
                <div>
                  <label className="font-semibold">Damkar</label>
                </div>
                <div>
                  <label className="font-semibold">SAR</label>
                </div>
                <div>
                  <label className="font-semibold">Dishub</label>
                </div>

              </div>
            )}


          </div>

        </div>
      </div>
    </section >
  )
}

export default ChatService
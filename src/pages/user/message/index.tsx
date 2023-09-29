import Button from "../../../component/Button"

const Message = () => {
  return (
    <div className="h-screen w-full">
      <div>
        {/* navbar chat */}
        <div className="h-16 bg-primary shadow-sm rounded-sm">
          <div className="flex gap-5 items-center justify-center h-full px-5">
            <div className='bg-none border-2 w-10 h-10 flex items-center justify-center rounded-full'>
              <i className="fa-solid fa-user-headset"></i>
            </div>
            <div className="font-semibold text-white">
              Costumer Service
            </div>
          </div>
        </div>

        <div className="overflow-y-scroll w-full">
          {/* content chat  */}
          <div className="p-5 max-h-[80vh] overflow-y-scroll space-y-4 mb-24">
            <div className="w-auto bg-[#EDEDED] rounded-md p-4 max-w-xs">
              <p>
                Halo Perkenalkan saya admin
              </p>
            </div>
            <div className="flex justify-end">
              <div className="w-auto bg-primary rounded-md p-4 max-w-xs">
                <p className="text-white">
                  Halo saya membutuhkan ambulance tolong
                  segera mengirmkan
                </p>
              </div>
            </div>
          </div>
          {/* bottom input and btn  */}
          <div className="p-4 absolute bottom-0 w-full">
            <div className="flex items-center gap-4">
              <input type="text" className="bg-white input-bordered text-white input input-md w-full" placeholder="Masukkan Pesan" />
              <Button label="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
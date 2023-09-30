const History = () => {
  return (
    <div className='h-screen w-full'>
      <div className='container mx-auto'>
        <div className="py-5 px-4 font-semibold">
          History Laporan
        </div>
        <div className="w-full px-5 space-y-4">
          <div className='w-full h-1/2 px-5 py-3 cursor-pointer bg-primary rounded-xl '>
            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-xl bg-white">
                <i className="fa-regular fa-file-check text-black"></i>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-white">
                  Laporan 1
                </div>
                <div className="text-white font-light text-sm">
                  10:30 AM - 12-09-2023
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-1/2 px-5 py-3 cursor-pointer bg-primary rounded-xl '>
            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-xl bg-white">
                <i className="fa-regular fa-file-check text-black"></i>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-white">
                  Laporan 2
                </div>
                <div className="text-white font-light text-sm">
                  09:30 AM - 29-09-2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default History
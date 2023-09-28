const Navbar = () => {
  return (
    <div className='ml-[20vw] bg-white w-[80vw] fixed h-20 flex justify-end px-10 items-center gap-x-4'>
      <div className='flex flex-row gap-x-2 items-center'>
        <div className='flex flex-col leading-4'>
          <div className='font-semibold text-lg'>Welcome</div>
          <div className='font-medium text-sm'>Super Admin</div>
        </div>
        <div className='bg-line w-10 h-10 rounded-full'>
          <img src="" alt="" />
        </div>
      </div>
      <div className='text-primary text-[22px]'>
        <i className="fa-solid fa-bell"></i>
      </div>
    </div>
  )
}

export default Navbar
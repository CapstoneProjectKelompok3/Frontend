import React, { FC } from 'react'

interface ButtonProps {
  label: string
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({label, onClick}) => {
  return (
    <div className='bg-primary rounded-md px-10 py-2 flex justify-center items-center text-white font-semibold hover:bg-primary-hover cursor-pointer' onClick={onClick}>
      {label}
    </div>
  )
}

export default Button
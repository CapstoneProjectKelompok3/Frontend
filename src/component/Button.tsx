import React, { FC } from 'react'

interface ButtonProps {
  label: string
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({label, onClick}) => {
  return (
    <div className='bg-primary cursor-pointer rounded-md px-10 py-4 text-white text-center hover:bg-primary-hover' onClick={onClick}>
      {label}
    </div>
  )
}

export default Button
import React, { FC } from 'react'

interface ButtonProps {
  label: string
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({label, onClick}) => {
  return (
    <div className='bg-primary px-10 py-5 text-white' onClick={onClick}>
      {label}
    </div>
  )
}

export default Button
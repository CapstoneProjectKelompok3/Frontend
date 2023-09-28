import React, { FC } from 'react'

interface ButtonProps {
  label: string
  type: string
  className?: string
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({label, type, className, onClick}) => {
  return (
    <button className={`bg-primary rounded-md px-10 py-2 text-white text-center hover:bg-primary-hover ${className}`} onClick={onClick} type={type}>
      {label}
    </button>
  )
}

export default Button
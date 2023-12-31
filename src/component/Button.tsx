import React, { FC } from 'react'

interface ButtonProps {
  label: string
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({ label, type, className, disabled, onClick }) => {
  return (
    <button className={`${className} bg-primary rounded-md px-10 py-2 text-white text-center hover:bg-primary-hover focus:outline-none`} disabled={disabled} onClick={onClick} type={type}>
      {label}
    </button> 
  )
}

export default Button
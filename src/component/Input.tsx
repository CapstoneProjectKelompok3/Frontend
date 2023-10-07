import React, { FC } from "react";
import { useLocation } from "react-router";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: React.ReactNode;
  search?: React.ReactNode;
  type?: string;
  name?: string;
  className?: string;
  star?: boolean;
  disabled?: boolean;
  onBlur?: (event: any) => void;
  onChange?: (value: any) => void;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  value,
  icon,
  search,
  type,
  name,
  className,
  star,
  disabled,
  onBlur,
  onChange,
}) => {

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" || location.pathname === "/login" ||
        location.pathname === "/register" || location.pathname === "/login-petugas" ||
        location.pathname === "/register-petugas" ? (
        <div className="flex flex-col">
          <label className="text-secondary">{label} {star ? <span className="text-red-500">*</span> : null}</label>
          <div className="flex flex-row">
            <input
              type={type}
              className={`bg-transparent border-b-[1px] focus:outline-none py-1 mb-4 ${className}`}
              placeholder={placeholder}
              value={value}
              name={name}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />
            <div className="border-b-[1px] py-1 text-secondary mb-4">{icon}</div>
          </div>
        </div>
      ) : search ? (
        <div className='flex flex-col'>
          <label className="text-secondary">{label} {star ? <span className="text-red-500">*</span> : null}</label>
          <div className="flex flex-row gap-x-2 items-center border-solid border-[1px] px-4 py-2 rounded-md">
          {search}
          <input
              type={type}
              className={`bg-transparent focus:outline-none w-full`}
              placeholder={placeholder}
              value={value}
              name={name}
              disabled={disabled}
              onChange={onChange}
            />
          </div>
        </div>
      ) :
        (
          <div className="flex flex-col">
            <label className="text-secondary">{label} {star ? <span className="text-red-500">*</span> : null} </label>
            <input
              type={type}
              className={`${className} bg-transparent border-[1px] rounded-md focus:outline-none py-2 px-5 `}
              placeholder={placeholder}
              value={value}
              name={name}
              disabled={disabled}
              onChange={onChange}
            />
          </div>
        )}
    </div>
  );
};

export default Input;
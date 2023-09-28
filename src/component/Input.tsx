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
  onChange,
}) => {

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/login" ||
        location.pathname === "/register" ? (
        <div className="flex flex-col">
          <label className="text-secondary">{label}</label>
          <div className="flex flex-row">
            <input
              type={type}
              className={`bg-transparent border-b-[1px] focus:outline-none py-1 mb-4 ${className}`}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
            />
            <div className="border-b-[1px] py-1 text-secondary mb-4">{icon}</div>
          </div>
        </div>
      ) : search ? (
        <div className='flex flex-col'>
          <label className="text-secondary">{label}</label>
          <div className="flex flex-row gap-x-2 items-center border-solid border-[1px] px-4 py-2 rounded-md">
          {search}
          <input
              type={type}
              className={`bg-transparent focus:outline-none p-2 w-full`}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
            />
          </div>
        </div>
      ) :
        (
          <div className="flex flex-col">
            <label className="text-secondary">{label}</label>
            <input
              type={type}
              className={`bg-transparent border-2 rounded-md focus:outline-none py-2 px-5 mb-4 ${className}`}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
            />
          </div>
        )}
    </div>
  );
};

export default Input;
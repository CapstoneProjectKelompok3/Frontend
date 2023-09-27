import React, { FC } from "react";
import { useLocation } from "react-router";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: React.ReactNode;
  search?: React.ReactNode;
  onChange?: (value: any) => void;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  value,
  icon,
  search,
  onChange,
}) => {

  const location = useLocation();

  return (
    <div>
      {
      location.pathname === "/register" ? (
        <div className="flex flex-col">
          <label className="text-secondary">{label}</label>
          <div className="flex flex-row">
            <input
              type="text"
              className="bg-transparent border-b-[1px] focus:outline-none py-1"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            <div className="border-b-[1px] py-1 text-secondary">{icon}</div>
          </div>
        </div>
      ) : search ? (
        <div className="flex flex-col">
          <label className="text-secondary">{label} <span className="text-red-500">*</span></label>
          <div className="border-solid border-[1px] px-4 py-2 rounded-md">
          {search}
          <input
              type="text"
              className="bg-transparent focus:outline-none "
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
      ) :
      (
        <div className="flex flex-col">
          <label className="text-secondary">{label} <span className="text-red-500">*</span></label>
          <input
              type="text"
              className="bg-transparent border-2 rounded-md focus:outline-none py-2 px-5"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
        </div>
      )}
    </div>
  );
};

export default Input;

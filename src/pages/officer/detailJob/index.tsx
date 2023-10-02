import React from 'react'
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const DetailJob = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  return (
    <div>DetailJob</div>
  )
}

export default DetailJob
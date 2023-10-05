import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const DetailJob = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])
  const role = Cookie.get('role')
  useEffect(() => {
    if (role === 'user') {
      navigate('/beranda')
    } else if (role === 'superadmin' || role === 'admin') {
      navigate('/dashboard')
    }
  })

  return (
    <div>DetailJob</div>
  )
}

export default DetailJob
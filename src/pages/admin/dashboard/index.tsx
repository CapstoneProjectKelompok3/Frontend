import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import medic from "../../../assets/medic.png";
import fire from "../../../assets/fire.png";
import corps from "../../../assets/corps.png";
import dishub from "../../../assets/dishub.png";
import Card from "../../../component/Card";
import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const role = Cookie.get("role");
  const token = Cookie.get("token");
  const navigate = useNavigate()
  const [unit, setUnit] = useState<any>([])
  const [cases, setCases] = useState<number>(0)
  const [driver, setDriver] = useState<number>(0)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])
  
  useEffect(() => {
    if (role === 'user') {
      navigate('/beranda')
    }
  })

  useEffect(() => {
    if(role === 'superadmin') {
      getUnit()
    }
    if (role === 'admin') {
      getCase()
      getDriver()
    }
  }, [])

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

 const getUnit = () => {
  axios.get('https://belanjalagiyuk.shop/governments/count', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    setUnit(res?.data?.data)
  })
  .catch(() => {
    toast.error('Gagal mendapatkan data')
  })
 }

 const getDriver = () => {
  axios.get('https://belanjalagiyuk.shop/drivers/count', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    setDriver(res?.data?.jumlah_petugas)
  })
  .catch(() => {
    toast.error('Gagal mendapatkan data')
  })
 }

  const getCase = () => {
    axios.get('https://belanjalagiyuk.shop/emergencies/count', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setCases(res?.data?.jumlah_kasus)
    })
    .catch(() => {
      toast.error('Gagal mendapatkan data')
    })
  }

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="flex flex-wrap gap-4">
          {role === "superadmin" ? (
            <>
              <Card title={unit.unit_rumah_sakit} description="Rumah Sakit" img={medic} />
              <Card title={unit.unit_pemadam} description="Pemadam" img={fire} />
              <Card title={unit.unit_kepolisian} description="Kepolisian" img={corps} />
              <Card title={unit.unit_dishub} description="Dishub" img={dishub} />
              <Card title={unit.unit_SAR} description="Sar" img={dishub} />
            </>
          ) : null}
          {role === "admin" ? (
            <>
              <Card title={cases} description="Kasus" img={dishub} />
              <Card title={driver} description="Petugas" img={dishub} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

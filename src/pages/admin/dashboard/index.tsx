import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import medic from "../../../assets/medic.png";
import fire from "../../../assets/fire.png";
import corps from "../../../assets/corps.png";
import timsar from "../../../assets/timsar.png";
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
  const [driver, setDriver] = useState([])
  const [dis, setDis] = useState<number>(0)
  const [polisi, setPolisi] = useState<number>(0)
  const [rs, setRs] = useState<number>(0)
  const [damkar, setDamkar] = useState<number>(0)

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
    getAllDriver()
    getAllGooverment()
  }, [])

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const getAllDriver = async () => {
    try {
      const response = await axios.get(`https://belanjalagiyuk.shop/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDriver(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllGooverment = async () => {
    try {
      const response = await axios.get(
        `https://belanjalagiyuk.shop/governments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dishubCount: number = response.data.data.filter((item: any) => item.type === 'dishub').length;
      setDis(dishubCount);
      const polisiCount: number = response.data.data.filter((item: any) => item.type === 'polisi').length;
      setPolisi(polisiCount);
      const rsCount: number = response.data.data.filter((item: any) => item.type === 'rs').length;
      setRs(rsCount);
      const damkarCount: number = response.data.data.filter((item: any) => item.type === 'damkar').length;
      setDamkar(damkarCount);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="flex flex-wrap gap-4">
          {role === "superadmin" ? (
            <>
              <Card title={rs} description="Rumah Sakit" img={medic} />
              <Card title={damkar} description="Pemadam" img={fire} />
              <Card title={polisi} description="Kepolisian" img={corps} />
              <Card title={dis} description="Dishub" img={dishub} />
            </>
          ) : null}
          {role === "admin" ? (
            <>
              <Card title="28" description="Kasus" img={dishub} />
              <Card title={driver.length} description="Petugas" img={dishub} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

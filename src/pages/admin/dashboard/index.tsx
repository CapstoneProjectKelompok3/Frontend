import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import medic from "../../../assets/medic.png";
import fire from "../../../assets/fire.png";
import corps from "../../../assets/corps.png";
import timsar from "../../../assets/timsar.png";
import dishub from "../../../assets/dishub.png";
import Card from "../../../component/Card";
import Cookie from "js-cookie";
import { useEffect } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Dashboard = () => {
  const role = Cookie.get("role");
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
  
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="flex flex-wrap gap-4">
          {role === "superadmin" ? (
            <>
              <Card title="28 Unit" description="Rumah Sakit" img={medic} />
              <Card title="17 Unit" description="Pemadam" img={fire} />
              <Card title="40 Unit" description="Kepolisian" img={corps} />
              <Card title="100 Unit" description="SAR" img={timsar} />
              <Card title="2 Unit" description="Dishub" img={dishub} />
            </>
          ) : null}
          {role === "admin" ? (
            <>
              <Card title="28" description="Kasus" img={dishub} />
              <Card title="17" description="Petugas" img={dishub} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

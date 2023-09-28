import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import Button from "../../../component/Button";
import Input from "../../../component/Input";
import medic from '../../../assets/medic.png'
import fire from '../../../assets/fire.png'
import corps from '../../../assets/corps.png'
import timsar from '../../../assets/timsar.png'
import dishub from '../../../assets/dishub.png'
import Card from "../../../component/Card";

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-24 px-8">
        {/* <Button label="Bagus" /> */}
        {/* <Input label="Tes" placeholder="masuk" icon={<i className="fa-regular fa-user"></i>} /> */}
        <div className="flex flex-wrap gap-4">
          <Card title='28 Unit' description='Rumah Sakit' img={medic} />
          <Card title='17 Unit' description='Pemadam' img={fire} />
          <Card title='40 Unit' description='Kepolisian' img={corps} />
          <Card title='100 Unit' description='SAR' img={timsar} />
          <Card title='2 Unit' description='Dishub' img={dishub} />
          <Card title='28' description='Kasus' img={dishub} />
          <Card title='17' description='Petugas' img={dishub} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

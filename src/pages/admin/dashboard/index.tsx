import React from "react";
import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import Button from "../../../component/Button";
import Input from "../../../component/Input";

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-24 px-8">
        <Button label="Bagus" />
        <Input label="Tes" placeholder="masuk" icon={<i className="fa-regular fa-user"></i>} />
      </div>
    </section>
  );
};

export default Dashboard;

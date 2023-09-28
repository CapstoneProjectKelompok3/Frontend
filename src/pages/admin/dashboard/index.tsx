import React, { useState } from "react";
import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import Button from "../../../component/Button";
import Input from "../../../component/Input";
import Popup from "../../../component/Popup";

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [show, setShow] = useState<boolean>(false)

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-24 px-8">
        <Button label="Bagus" onClick={() => setShow(!show)}/>
        <Input label="Tes" placeholder="masuk" icon={<i className="fa-regular fa-user"></i>} />
        <Popup isOpen={show} onClose={() => setShow(false)}>
          testing
        </Popup>
      </div>
    </section>
  );
};

export default Dashboard;

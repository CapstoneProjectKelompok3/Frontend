import React from "react";
import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <Navbar />
      <Sidebar />
    </section>
  );
};

export default Dashboard;

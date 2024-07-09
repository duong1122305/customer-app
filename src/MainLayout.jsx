import { Outlet } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

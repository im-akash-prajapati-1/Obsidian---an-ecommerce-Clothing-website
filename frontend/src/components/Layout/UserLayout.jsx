import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Newletter from "../Common/Newletter";

const UserLayout = () => {
  return (
    <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Newletter />
    <Footer />
    </>
  )
}

export default UserLayout;
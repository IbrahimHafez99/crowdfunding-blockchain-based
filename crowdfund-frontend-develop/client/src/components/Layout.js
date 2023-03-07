import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { execluded } from "../constants";
import { useRouter } from "next/router";
import { useStateContext } from "../context";
const Layout = ({ children }) => {
  const router = useRouter();
  const { token } = useStateContext();
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        {!execluded.includes(router.pathname) && token && <Sidebar />}
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        {!execluded.includes(router.pathname) && <Navbar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;

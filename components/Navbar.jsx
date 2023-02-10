import "./navbar.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [buttonText, setButtonText] = useState("Profile");

  const router = useRouter();

  useEffect(() => {
    const changeBtn = () => {
      if (router.pathname === "/profile") setButtonText("Home");
      else if (router.pathname === "/") setButtonText("Profile");
    };
    return () => {
      changeBtn();
    };
  }, [router.pathname]);

  const routeChange = () => {
    let path = `profile`;
    router.push(path);
  };

  return (
    <div className="navbarContainer">
      <div className="navbarLeft"></div>
      <div className="navbarCenter">
        <h1 className="navbarTitle">Soundcheck!</h1>
      </div>
      <div className="navbarRight">
        <button onClick={routeChange} className="profileBtn">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

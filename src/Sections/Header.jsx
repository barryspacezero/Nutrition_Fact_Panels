import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Header() {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(window.innerWidth < 1024);
  const collapseHeaderItemsRef = useRef(null);
  const collapseBtnRef = useRef(null);

  const toggleHeader = () => {
    if (isHeaderCollapsed) {
      collapseHeaderItemsRef.current.classList.add("opacity-100");
      collapseHeaderItemsRef.current.style.width = "60vw";
      collapseBtnRef.current.classList.remove("bi-list");
      collapseBtnRef.current.classList.add("bi-x", "max-lg:fixed");
      setIsHeaderCollapsed(false);
    } else {
      collapseHeaderItemsRef.current.classList.remove("opacity-100");
      collapseHeaderItemsRef.current.style.width = "0vw";
      collapseBtnRef.current.classList.remove("bi-x", "max-lg:fixed");
      collapseBtnRef.current.classList.add("bi-list");
      setIsHeaderCollapsed(true);
    }
  };

  const onHeaderClickOutside = (e) => {
    if (collapseHeaderItemsRef.current && !collapseHeaderItemsRef.current.contains(e.target)) {
      toggleHeader();
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      if (collapseHeaderItemsRef.current) {
        collapseHeaderItemsRef.current.style.width = "";
      }
    } else {
      setIsHeaderCollapsed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isHeaderCollapsed) {
      setTimeout(() => {
        window.addEventListener("click", onHeaderClickOutside);
      }, 1);
    } else {
      window.removeEventListener("click", onHeaderClickOutside);
    }

    return () => {
      window.removeEventListener("click", onHeaderClickOutside);
    };
  }, [isHeaderCollapsed]);

  return (
    <header className="max-w-lg:px-4 max-w-lg:mr-auto absolute top-0 z-20 flex h-[60px] w-full bg-opacity-0 px-[5%] lg:justify-around text-[#4b4b4b] font-['Outfit',sans-serif]">
      <a className="h-[50px] w-[50px] p-[4px] mt-[20px]" href="">
        <img src={Logo} alt="logo" className="object-cover w-full" />
      </a>
      <div
        ref={collapseHeaderItemsRef}
        className="flex  gap-4 w-full bg-inherit justify-center overflow-hidden transition-[width] duration-300 ease-in-out max-lg:shadow-md max-lg:fixed max-lg:right-0 max-lg:flex-col max-lg:h-screen max-lg:min-h-screen max-lg:justify-between max-lg:p-5 max-lg:pt-[5%] max-lg:pb-[5%] max-lg:items-end max-lg:bg-[#040404] max-lg:text-white max-lg:overflow-y-auto"
        id="collapsed-header-items"
      >
        <div className="flex h-full w-max gap-5 text-base max-lg:mt-[30px] max-lg:flex-col max-lg:place-items-end max-lg:gap-5 lg:mx-auto lg:place-items-center">
          <a className="flex items-center min-w-fit rounded-md p-[5px_10px] transition-all duration-500 hover:text-black" href="">
            How it works
          </a>
          <a className="flex items-center min-w-fit rounded-md p-[5px_10px] transition-all duration-500 hover:text-black" href="#pricing">
            About Us
          </a>
          <a className="flex items-center min-w-fit rounded-md p-[5px_10px] transition-all duration-500 hover:text-black" href="">
            Grading System
          </a>
          <a className="flex items-center min-w-fit rounded-md p-[5px_10px] transition-all duration-500 hover:text-black" href="">
            Features
          </a>
          <a className="flex items-center min-w-fit rounded-md p-[5px_10px] transition-all duration-500 hover:text-black" href="">
            Contact Us
          </a>
        </div>
        <div className="mx-4 flex place-items-center gap-[20px] text-base max-md:w-full max-md:flex-col max-md:place-content-center">
          <Link to="/search">
            <div
              aria-label="search"
              className="rounded-md border-[1px] border-black bg-transparent px-3 py-2 text-black transition-colors duration-[0.3s] hover:bg-black hover:text-white max-lg:text-white max-lg:border-white"
            >
              <span>Search</span>
            </div>
          </Link>
        </div>
      </div>
      <button
        ref={collapseBtnRef}
        className="bi bi-list absolute right-3 top-3 z-50 text-3xl text-red-900 lg:hidden"
        onClick={toggleHeader}
        aria-label="menu"
        id="collapse-btn"
      ></button>
    </header>
  );
}

export default Header;
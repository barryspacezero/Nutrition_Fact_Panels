import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Header() {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(window.innerWidth < 1024);
  const collapseHeaderItemsRef = useRef(null);
  const collapseBtnRef = useRef(null);

  const toggleHeader = () => {
    if (isHeaderCollapsed) {
      collapseHeaderItemsRef.current.classList.remove("translate-x-full");
      collapseHeaderItemsRef.current.classList.add("translate-x-0");
      collapseBtnRef.current.classList.replace("bi-list", "bi-x");
      setIsHeaderCollapsed(false);
    } else {
      collapseHeaderItemsRef.current.classList.add("translate-x-full");
      collapseHeaderItemsRef.current.classList.remove("translate-x-0");
      collapseBtnRef.current.classList.replace("bi-x", "bi-list");
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
      collapseHeaderItemsRef.current.classList.remove('translate-x-full');
      collapseHeaderItemsRef.current.classList.add('translate-x-0');
      setIsHeaderCollapsed(false);
    } else {
      collapseHeaderItemsRef.current.classList.add('translate-x-full');
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
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md lg:bg-white lg:backdrop-blur-0 lg:px-8 dark:bg-gray-900/80 dark:text-white">
      <a className="h-[50px] w-[50px] p-[4px] mt-[20px]" href="">
        <img src={Logo} alt="logo" className="object-cover w-full" />
      </a>
      <div
        ref={collapseHeaderItemsRef}
        className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 transform space-y-6 bg-white p-6 shadow-xl transition-transform duration-300 lg:static lg:flex lg:h-auto lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:shadow-none dark:bg-gray-800 lg:dark:bg-transparent translate-x-full"
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
          <div className="mx-4 flex place-items-center gap-[20px] text-base max-md:w-full max-md:flex-col max-md:place-content-center lg:flex-row lg:gap-4 lg:mx-0">
          <Link to="/search">
            <div
              aria-label="search"
              className="rounded-md border-[1px] border-black bg-transparent px-3 py-2 text-black transition-colors duration-[0.3s] hover:bg-black hover:text-white max-lg:text-white max-lg:border-white text-white"
            >
              <span>Search</span>
            </div>
          </Link>
          <Link to="/diet">
            <div
              aria-label="diet"
              className="rounded-md border-[1px] border-black bg-transparent px-3 py-2 text-black transition-colors duration-[0.3s] hover:bg-black hover:text-white max-lg:text-white max-lg:border-white text-white"
            >
              <span>Diet Plan</span>
            </div>
          </Link>
        </div>
        </div>
        
      </div>
      <button
        ref={collapseBtnRef}
        className="bi bi-list flex items-center gap-2 text-2xl text-black lg:hidden max-lg:text-white"
        onClick={toggleHeader}
        aria-label="menu"
        id="collapse-btn"
      >
        <span className="text-lg max-lg:hidden">Menu</span>
      </button>
    </header>
  );
}

export default Header;
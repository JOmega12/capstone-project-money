import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const activeUnderline = "active:underline hover:underline";

  return (
    <nav className="flex flex-col items-center justify-between gap-10 p-6 mt-6">
      <NavLink to="/dashboard" className={activeUnderline}>
        Dashboard
      </NavLink>
      <NavLink to="/income" className={activeUnderline}>
        Income
      </NavLink>
      <NavLink to="/expense" className={activeUnderline}>
        Expense
      </NavLink>
      <NavLink to="/categories" className={activeUnderline}>
        Categories
      </NavLink>
    </nav>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Navbar">
      <div className="flex gap-1 items-center justify-center m-2 ">
        <div className="lg:hidden">
            <button onClick={() => toggleNavbar()}>
            {isOpen ? (
                <FontAwesomeIcon icon={faTimes} className="p-2" />
            ) : (
                <FontAwesomeIcon icon={faBars} className="p-2" />
            )}
            </button>
        </div>
        <div className="font-lato font-extrabold ">WalletWhiz</div>
      </div>
      <div className="hidden lg:flex justify-center">
        <NavLinks />
      </div>
      {isOpen && (
        <div className="flex flex-col items-center lg:hidden">
          <h2>Hello name!</h2>
            <NavLinks />
          <div>
            <button>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

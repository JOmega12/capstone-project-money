import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

const NavLinks = () => {
  const activeUnderline = "active:underline hover:underline";

  const { user, logoutUser } = useAuth();
  return (
    <nav className="flex flex-col items-center justify-between gap-10 p-6 mt-6">
      {user ? (
        <h2 className="text-center">Hello {user.username}!</h2>
      ) : (
        <h2>Hello, please login</h2>
      )}

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
      <div>
        <button className="mt-10 hover:underline" onClick={logoutUser}>
          Sign Out
        </button>
      </div>
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
      <div className="flex gap-1 items-center justify-center m-2 md:hidden">
        <div className="md:hidden">
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
      <div className="hidden md:flex justify-center">
        <NavLinks />
      </div>
      {isOpen && (
        <div className="pt-10 fixed inset-0 bg-white z-50 flex flex-col items-center md:hidden">
          <button onClick={() => toggleNavbar()}>
            <FontAwesomeIcon icon={faTimes} className="p-2 text-3xl" />
          </button>
          <NavLinks />
        </div>
      )}
    </div>
  );
};

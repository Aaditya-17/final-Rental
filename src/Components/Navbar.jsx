import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userToken")
  );
  const role = localStorage.getItem("role");
  console.log(role);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false); // Close dropdown after selection
  };
  // Listen for changes in localStorage (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLaborRequest = () => {
    navigate("/laborrequest"); // Navigate to laborrequest component
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-green-100 dark:text-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">FarmRent</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li className="relative">
            <button
              className="hover:underline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {t("equipment")}
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-green-200 dark:bg-gray-700 text-white mt-2 rounded shadow-lg z-50">
                <li>
                  <Link
                    to="/bookequipment"
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t("book_equipment")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registerequipment"
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t("register_equipment")}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/searchlabor" className="hover:underline">
              {t("laborer")}
            </Link>
          </li>
          <li>
            <Link to="/getreccomend" className="hover:underline">
              {t("recommendation")}
            </Link>
          </li>
          <li>
            <Link to="/FarmGram" className="hover:underline">
              {t("farmgram")}
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            {/* Multi-Language Icon (Click to Toggle Options) */}
            <button
              className=" text-green-100 dark:text-gray-800 px-3 py-2 rounded flex items-center"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <FaGlobe size={22} />
            </button>

            {/* Language Options (Visible Only When Clicked) */}
            {isLanguageOpen && (
              <div className="absolute top-10 left-0 bg-white border border-green-500 rounded shadow-lg">
                <button
                  className="block w-full px-4 py-2 text-green-700 hover:bg-green-100"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className="block w-full px-4 py-2 text-green-700 hover:bg-green-100"
                  onClick={() => changeLanguage("mr")}
                >
                  {t("marathi")}
                </button>
              </div>
            )}
          </div>

          {/* Profile or Login Button */}
          {/* Profile or Login Button */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-green-100 dark:text-gray-800 px-6 py-2"
              >
                <FaUser size={22} />
              </Link>
              {role === "laborer" && (
                <Link
                  to="/laborprofile"
                  className="bg-blue-500 text-white px-4 py-2 rounded border border-blue-700 transition-all duration-300 hover:bg-white hover:text-blue-700"
                >
                  Requests
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-700 text-white px-6 py-2 rounded border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700"
            >
              Login/Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden text-green-100 dark:text-gray-800 bg-green-100 dark:bg-gray-900 p-4 top-16 left-0 w-full shadow-lg">
          <ul className="space-y-4 text-center">
            <li>
              <button
                className="block w-full text-left"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Equipment
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 bg-green-200 dark:bg-gray-700 text-white rounded shadow-lg z-50">
                  <li>
                    <Link
                      to="/bookequipment"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => {
                        setIsOpen(false);
                        setIsDropdownOpen(false);
                      }}
                    >
                      Book Equipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/registerequipment"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => {
                        setIsOpen(false);
                        setIsDropdownOpen(false);
                      }}
                    >
                      Register Equipment
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/schedule"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Scheduling
              </Link>
            </li>
            <li>
              <Link
                to="/tracking"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Live Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/farmgram"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                FarmGram
              </Link>
            </li>

            {/* Language Switcher */}
            <li>
              <select className="bg-green-700 dark:bg-gray-700 text-white px-2 py-1 rounded w-full">
                <option>English</option>
                <option>Marathi</option>
              </select>
            </li>

            {/* Profile or Login in Mobile */}
            <li>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="bg-white dark:bg-gray-700 dark:text-white text-green-700 px-4 py-2 rounded block"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="mr-2 inline" /> Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-white dark:bg-gray-700 dark:text-white text-green-700 px-4 py-2 rounded block"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
              {role === "laborer" && (
                <button
                  onClick={handleLaborRequest}
                  className="text-white text-lg bg-blue-500 p-2 rounded-lg"
                >
                  Labor Request
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaClipboardList,
  FaTools,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="md:hidden relative z-20 p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-gray-100 dark:bg-gray-800 p-2 rounded-md focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute top-[60px] md:top-0 left-0 w-64 bg-gray-800 text-white h-full p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:block z-10`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <ul>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("profile");
              setIsSidebarOpen(false);
            }}
          >
            <FaUser className="inline-block mr-2" /> My Profile
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("myrentals");
              setIsSidebarOpen(false);
            }}
          >
            <FaClipboardList className="inline-block mr-2" /> My Rentals
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("myequipment");
              setIsSidebarOpen(false);
            }}
          >
            <FaTools className="inline-block mr-2" /> My Equipment
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("farmerrequests");
              setIsSidebarOpen(false);
            }}
          >
            <FaTools className="inline-block mr-2" /> Requests
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("emailinvite");
              setIsSidebarOpen(false);
            }}
          >
            <MdEmail className="inline-block mr-2" /> Invite Others
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("laborrequests");
              setIsSidebarOpen(false);
            }}
          >
            <MdEmail className="inline-block mr-2" /> Labor Requests
          </li>
          <li
            className="p-3 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("settings");
              setIsSidebarOpen(false);
            }}
          >
            <FaCog className="inline-block mr-2" /> Settings
          </li>
          {isLoggedIn ? (
            <li
              className="p-3 hover:bg-red-600 cursor-pointer mt-4"
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </li>
          ) : (
            <li
              className="p-3 hover:bg-gray-700 cursor-pointer mt-4"
              onClick={() => {
                navigate("/login");
                setIsSidebarOpen(false);
              }}
            >
              <FaSignOutAlt className="inline-block mr-2" /> Login
            </li>
          )}
        </ul>
      </div>

      {/* Overlay for Mobile (Closes Sidebar when clicked) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("farmer"); // Default role is "farmer"
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Determine the API endpoint based on the selected role
      const endpoint =
        selected === "farmer"
          ? "https://famerequipmentrental-springboot-production.up.railway.app/farmer/login"
          : "https://famerequipmentrental-springboot-production.up.railway.app/labor/login";

      // Send API request
      const response =
        selected === "farmer"
          ? await axios.post(endpoint, { username, password })
          : await axios.post(endpoint, { email, password });

      if (response.status === 200) {
        // Store user data and role in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("role", selected); // Store role as 'farmer' or 'laborer'

        // Redirect based on role
        if (selected === "farmer") {
          navigate("/");
        } else {
          navigate("/LaborProfile");
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-8">
          <div className="flex justify-center text-white mb-6">FarmRent</div>
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-white">
            {t("title2")}
          </h2>
          <div className="flex justify-center gap-2 mt-6">
            <button
              className={`px-6 py-2 font-medium rounded-lg transition-all ${
                selected === "farmer"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
              }`}
              onClick={() => setSelected("farmer")}
            >
              {t("roleSelection.farmer")}
            </button>
            <button
              className={`px-6 py-2 font-medium rounded-lg transition-all ${
                selected === "laborer"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
              }`}
              onClick={() => setSelected("laborer")}
            >
              {t("roleSelection.laborer")}
            </button>
          </div>
          <div
            key={selected}
            className="p-4 text-white text-xl rounded-lg flex justify-center items-center"
          >
            {selected === "farmer" ? t("farmerLogin") : t("laborerLogin")}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            {selected === "farmer" ? (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  {t("username")}
                </label>
                <input
                  type="text" // Keep as text since the field is username, not email
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                  placeholder={t("placeholder.username")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  {t("email")}
                </label>
                <input
                  type="text" // Keep as text since the field is username, not email
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                  placeholder={t("placeholder.email")}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10 dark:bg-gray-700 dark:text-white"
                  placeholder={t("placeholder.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <FaEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"></label>
              <Link
                to="/forgotpassword"
                className="text-green-600 hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t("loading") : t("loginButton")}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            {t("noAccount")}{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              {t("signup")}
            </Link>
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            {t("adminLogin")}{" "}
            <Link to="/adminlogin" className="text-green-600 hover:underline">
              {t("login")}
            </Link>
          </p>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-1/2 bg-green-50 dark:bg-gray-700 flex flex-col justify-center items-center p-8">
          <h2 className="text-xl font-semibold text-green-700 dark:text-white">
            WELCOME BACK!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            You're just one step away from a smarter and more efficient
            equipment rental experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

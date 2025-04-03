import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Fixed import
import { motion } from "framer-motion";

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = type === "login" ? "http://127.0.0.1:5000/auth/login" : "http://127.0.0.1:5000/auth/register";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setMessage("Successfully logged in");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  return (
    <motion.div
      key={type} // Ensures animation works correctly on route change
      className="flex flex-col items-center bg-[#1E1E2F] p-6 rounded-2xl shadow-lg w-96 text-[#E0E0E0]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-bold mb-4">{type === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 mb-3 rounded-lg bg-[#121212] text-[#E0E0E0] border border-[#FF9800]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 mb-3 rounded-lg bg-[#121212] text-[#E0E0E0] border border-[#FF9800]"
          required
        />
        <button
          type="submit"
          className="bg-[#FF9800] text-black py-2 rounded-lg hover:bg-orange-600"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
      <p className="mt-3 text-[#E0E0E0]">
        {type === "login" ? "Don't have an account?" : "Already have an account?"}
        <Link to={type === "login" ? "/register" : "/login"} className="text-[#FF9800] ml-1">
          {type === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen bg-[#121212]">
        <Routes>
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="*" element={<Auth type="login" />} />
        </Routes>
      </div>
    </Router>
  );
};

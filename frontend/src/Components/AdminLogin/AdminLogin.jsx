import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("prabhu");
  const [password, setPassword] = useState("prabhu@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login successful:", data);
      // Store user info if needed
      localStorage.setItem("admin", JSON.stringify(data.admin));

      alert("Login Successful!");
      navigate("/admin"); // Redirect to admin dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-[600px]  flex justify-center items-center p-3 md:p-1">
        <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[300px] p-4 gap-7  bg-green-600 text-white rounded-lg shadow-xl ">
          <div className="text-center">
            <h1 className="text-[25px] md:text-xl font-bold ">AdminLogin</h1>
            <p className="text-[20px] md:text-[18px] text-white opacity-80 mt-2">
              Restricted access for authorized persons only
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-[20px] md:text-lg font-semibold"
            >
              UserName
            </label>
            <input
              type="text"
              id="name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 text-[18px] md:text-[15px] text-black border-gray-300 p-2 md:p-1 outline-none rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="pass"
              className="text-[20px] md:text-lg  font-semibold"
            >
              password
            </label>
            <input
              type="password"
              id="pass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 text-[18px] md:text-[15px] text-black border-gray-300 p-2 md:p-1 outline-none rounded-lg"
            />
          </div>

          {error && <p className="text-red-200 text-sm font-bold bg-red-800 p-2 rounded">{error}</p>}

          <button
            disabled={loading}
            type='submit'
            className='w-full text-green-600 md:text-[15px] bg-white p-2 font-semibold text[20px] rounded-lg  md:p-2 cursor-pointer capitalize hover:bg-gray-100'
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;

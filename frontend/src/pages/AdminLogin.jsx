import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminLogin() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");
        if (!data.user.isAdmin) throw new Error("Only admins can access the admin panel");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, isAdmin: false }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
        alert("Registration successful! Please contact the shop owner to activate your admin access.");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Admin Login" : "Admin Register"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold mb-2"
          disabled={loading}
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>
        <div className="text-center">
          {mode === "login" ? (
            <span>
              Not registered?{' '}
              <button type="button" className="text-blue-600 underline" onClick={() => setMode("register")}>Register</button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="text-blue-600 underline" onClick={() => setMode("login")}>Login</button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminLogin; 
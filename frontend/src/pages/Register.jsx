import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, UserCircle } from "lucide-react";
import { Button } from "../components/ui/button";

function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 text-white shadow-lg border-2 border-white mb-2 animate-fade-in">
            <UserCircle className="w-10 h-10" />
          </span>
          <h2 className="text-2xl font-bold text-center gradient-text">Register</h2>
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">Registration successful! Redirecting to login...</div>}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition pr-10"
            required
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-600 transition"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </span>
        </div>
        <div className="mb-6 relative">
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition pr-10"
            required
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-600 transition"
            onClick={() => setShowConfirmPassword((v) => !v)}
            tabIndex={0}
            role="button"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </span>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

export default Register; 
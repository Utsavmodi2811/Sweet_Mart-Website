import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, UserCircle } from "lucide-react";
import { Button } from "../components/ui/button";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg border-2 border-white mb-2 animate-fade-in">
            <UserCircle className="w-10 h-10" />
          </span>
          <h2 className="text-2xl font-bold text-center gradient-text">Login</h2>
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
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
        <div className="mb-6 relative">
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
        <Button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </Button>
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">Don't have an account? </span>
          <button type="button" className="text-blue-600 underline font-medium" onClick={() => navigate("/register")}>Register here</button>
        </div>
      </form>
    </div>
  );
}

export default Login; 
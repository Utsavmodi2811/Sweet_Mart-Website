import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, Sun, Moon, UserCircle } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, email, password: password || undefined }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setMessage("Profile updated successfully");
      setEditMode(false);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "gu" : "en");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 animate-fade-in py-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg border-2 border-white mb-2 animate-fade-in">
            <UserCircle className="w-10 h-10" />
          </span>
          <h2 className="text-2xl font-bold text-center gradient-text">Settings</h2>
        </div>
        {message && <div className="mb-4 text-center text-green-600">{message}</div>}
        <div className="mb-6 flex flex-col gap-4">
          <Button variant="outline" className="w-full flex items-center justify-between" onClick={handleLanguage}>
            <span>{t("Change Language")}</span>
            <span className="font-bold">{i18n.language === "en" ? "EN" : "ગુ"}</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-between" onClick={toggleTheme}>
            <span>{t("Change Theme")}</span>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-4 text-center">{t("Edit Profile")}</h3>
        {!editMode ? (
          <>
            <div className="mb-4">
              <div className="font-semibold">{t("Name")}:</div>
              <div>{user.name}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">{t("Email")}:</div>
              <div>{user.email}</div>
            </div>
            <Button className="w-full" onClick={() => setEditMode(true)}>
              {t("Edit Profile")}
            </Button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block font-semibold mb-1">{t("Name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">{t("Email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block font-semibold mb-1">{t("Password")}</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10"
                placeholder="Leave blank to keep current password"
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
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {t("Save")}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => setEditMode(false)}>
                {t("Cancel")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings; 
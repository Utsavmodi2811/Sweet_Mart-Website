import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

const Profile = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Update user info API call (assume endpoint exists)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("profile")}</h2>
        {message && <div className="mb-4 text-center text-green-600">{message}</div>}
        {!editMode ? (
          <>
            <div className="mb-4">
              <div className="font-semibold">{t("name")}:</div>
              <div>{user.name}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">{t("email")}:</div>
              <div>{user.email}</div>
            </div>
            <Button className="w-full mb-2" onClick={() => setEditMode(true)}>
              {t("editProfile")}
            </Button>
            <Button className="w-full mb-2" variant="outline" onClick={handleLanguage}>
              {t("changeLanguage")}
            </Button>
            <Button className="w-full" variant="destructive" onClick={logout}>
              {t("logout")}
            </Button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block font-semibold mb-1">{t("name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">{t("email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">{t("password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {t("save")}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => setEditMode(false)}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile; 
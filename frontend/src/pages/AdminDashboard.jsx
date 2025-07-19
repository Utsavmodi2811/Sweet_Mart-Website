import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import AdminFestivalSpecials from './AdminFestivalSpecials';
import AdminGallery from './AdminGallery';

const AdminUsers = () => (
  <div className="p-8">
    <h2 className="text-xl font-bold mb-4">User & Admin Management (Coming Soon)</h2>
    <p>Here you will be able to see all users, admins, and analytics like most purchased items.</p>
  </div>
);

const SECTIONS = [
  { key: 'products', label: 'Product Management', component: <AdminPanel /> },
  { key: 'festival', label: 'Festival Product Management', component: <AdminFestivalSpecials /> },
  { key: 'gallery', label: 'Gallery Management', component: <AdminGallery /> },
  { key: 'users', label: 'User/Admin Management', component: <AdminUsers /> },
];

const AdminDashboard = () => {
  const [section, setSection] = useState('products');
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg flex flex-col py-8 px-4">
        <div className="mb-8 text-2xl font-bold text-primary">Admin Panel</div>
        <nav className="flex flex-col gap-2">
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${section === s.key ? 'bg-primary text-white shadow' : 'hover:bg-primary/10 text-primary'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {SECTIONS.find(s => s.key === section)?.component}
      </main>
    </div>
  );
};

export default AdminDashboard; 
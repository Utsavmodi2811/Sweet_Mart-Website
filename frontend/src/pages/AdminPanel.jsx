import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Upload, ShoppingBag } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminPanel() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "sweets",
    subcategory: "",
    stock: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [festivalTitle, setFestivalTitle] = useState("");
  const [festivalTitleLoading, setFestivalTitleLoading] = useState(false);
  const [festivalTitleSuccess, setFestivalTitleSuccess] = useState("");
  const [festivalProducts, setFestivalProducts] = useState([]);
  const [festivalForm, setFestivalForm] = useState({
    name: '',
    image: '',
    imageFile: null,
    description: '',
  });
  const [festivalEditingId, setFestivalEditingId] = useState(null);
  const [festivalLoading, setFestivalLoading] = useState(false);
  const [festivalError, setFestivalError] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);

  // Fetch products
  useEffect(() => {
    fetch(`${API_URL}/api/products`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to fetch products"));
  }, [loading]);

  // Fetch festival section title on mount
  useEffect(() => {
    fetch(`${API_URL}/api/settings/festivalSectionTitle`)
      .then(res => res.json())
      .then(data => setFestivalTitle(data.value || ""))
      .catch(() => setFestivalTitle(""));
  }, []);

  // Fetch festival products
  useEffect(() => {
    fetch(`${API_URL}/api/festivals`)
      .then(res => res.json())
      .then(data => setFestivalProducts(Array.isArray(data) ? data : []))
      .catch(() => setFestivalProducts([]));
  }, [festivalLoading]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let imageUrl = form.image;
      if (productImageFile) {
        const formData = new FormData();
        formData.append('image', productImageFile);
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Image upload failed');
        imageUrl = data.url;
      }
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, image: imageUrl }),
      });
      if (!res.ok) throw new Error("Failed to save product");
      setForm({ name: "", description: "", price: "", image: "", category: "sweets", subcategory: "", stock: 0 });
      setProductImageFile(null);
      setEditingId(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory || "",
      stock: product.stock,
    });
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFestivalTitleUpdate = async (e) => {
    e.preventDefault();
    setFestivalTitleLoading(true);
    setFestivalTitleSuccess("");
    try {
      const res = await fetch(`${API_URL}/api/settings/festivalSectionTitle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: festivalTitle }),
      });
      if (!res.ok) throw new Error("Failed to update title");
      setFestivalTitleSuccess("Festival section title updated!");
    } catch {
      setFestivalTitleSuccess("Failed to update title");
    }
    setFestivalTitleLoading(false);
  };

  // Handle festival form input
  const handleFestivalChange = (e) => {
    setFestivalForm({ ...festivalForm, [e.target.name]: e.target.value });
  };

  // Add or update festival product
  const handleFestivalSubmit = async (e) => {
    e.preventDefault();
    setFestivalLoading(true);
    setFestivalError('');
    try {
      let imageUrl = festivalForm.image;
      if (festivalForm.imageFile) {
        const formData = new FormData();
        formData.append('image', festivalForm.imageFile);
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Image upload failed');
        imageUrl = data.url;
      }
      const method = festivalEditingId ? 'PUT' : 'POST';
      const url = festivalEditingId
        ? `${API_URL}/api/festivals/${festivalEditingId}`
        : `${API_URL}/api/festivals`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...festivalForm, image: imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to save festival product');
      setFestivalForm({ name: '', image: '', imageFile: null, description: '' });
      setFestivalEditingId(null);
      setFestivalLoading(false);
    } catch (err) {
      setFestivalError(err.message);
      setFestivalLoading(false);
    }
  };

  // Edit festival product
  const handleFestivalEdit = (festival) => {
    setFestivalForm({
      name: festival.name,
      image: festival.image,
      description: festival.description || '',
    });
    setFestivalEditingId(festival._id);
  };

  // Delete festival product
  const handleFestivalDelete = async (id) => {
    if (!window.confirm('Delete this festival product?')) return;
    setFestivalLoading(true);
    setFestivalError('');
    try {
      const res = await fetch(`${API_URL}/api/festivals/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete festival product');
      setFestivalLoading(false);
    } catch (err) {
      setFestivalError(err.message);
      setFestivalLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel - Manage Products</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      {/* Festival Section Title Management */}
      <div className="mb-8 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-2">Festival Section Title</h2>
        <p className="text-sm text-muted-foreground mb-2">This is the heading shown above the festival products on your home page. Use it to highlight the current festival or theme (e.g., "Ganesh Chaturthi Specials").</p>
        <form onSubmit={handleFestivalTitleUpdate} className="flex gap-2 items-center">
          <input
            type="text"
            value={festivalTitle}
            onChange={e => setFestivalTitle(e.target.value)}
            placeholder="e.g. Ganesh Chaturthi Specials"
            className="border p-2 rounded flex-1"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={festivalTitleLoading}>
            {festivalTitleLoading ? "Saving..." : "Save"}
          </button>
        </form>
        {festivalTitleSuccess && <div className="mt-2 text-green-600">{festivalTitleSuccess}</div>}
      </div>

      {/* Festival Product Management */}
      <div className="mb-8 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><Upload className="w-5 h-5 text-pink-500" /> Festival Product Management</h2>
        <p className="text-sm text-muted-foreground mb-2">Add, edit, or delete the festival products that will appear in the festival section on your home page. Each product should have a name, image, and (optionally) a description.</p>
        <form onSubmit={handleFestivalSubmit} className="flex flex-col md:flex-row gap-2 items-center mb-4">
          <input
            name="name"
            value={festivalForm.name}
            onChange={handleFestivalChange}
            placeholder="Festival Name"
            className="border p-2 rounded flex-1"
            required
          />
          <input
            name="description"
            value={festivalForm.description}
            onChange={handleFestivalChange}
            placeholder="Description (optional)"
            className="border p-2 rounded flex-1"
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setFestivalForm(f => ({ ...f, imageFile: e.target.files[0] }));
              }
            }}
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={festivalLoading}>
            {festivalEditingId ? 'Update' : 'Add'}
          </button>
          {festivalEditingId && (
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setFestivalForm({ name: '', image: '', imageFile: null, description: '' }); setFestivalEditingId(null); }}>
              Cancel
            </button>
          )}
        </form>
        {/* Image preview */}
        {festivalForm.imageFile && (
          <div className="mb-2 flex items-center gap-2">
            <img src={URL.createObjectURL(festivalForm.imageFile)} alt="Preview" className="w-16 h-16 object-cover rounded" />
            <span className="text-xs text-muted-foreground">Image Preview</span>
          </div>
        )}
        {festivalError && <div className="text-red-500 mb-2">{festivalError}</div>}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Festival Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {festivalProducts.map((f) => (
              <tr key={f._id}>
                <td className="border p-2"><img src={f.image} alt={f.name} className="w-16 h-16 object-cover rounded" /></td>
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.description || '-'}</td>
                <td className="border p-2">
                  <button onClick={() => handleFestivalEdit(f)} className="mr-2 text-blue-600">Edit</button>
                  <button onClick={() => handleFestivalDelete(f._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Management UI */}
      <div className="mb-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-blue-500" /> Product Management</h2>
        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="border p-2 rounded" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="border p-2 rounded" />
          <input name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Subcategory" className="border p-2 rounded" />
          <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
            <option value="sweets">Sweets</option>
            <option value="namkeen">Namkeen</option>
            <option value="bakery">Bakery</option>
          </select>
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="border p-2 rounded" />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setProductImageFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded"
          />
          <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded">
            {editingId ? "Update" : "Add"} Product
          </button>
        </form>
        {/* Image preview */}
        {productImageFile && (
          <div className="mb-2 flex items-center gap-2">
            <img src={URL.createObjectURL(productImageFile)} alt="Preview" className="w-16 h-16 object-cover rounded" />
            <span className="text-xs text-muted-foreground">Image Preview</span>
          </div>
        )}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Subcategory</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border p-2"><img src={p.image} alt={p.name} className="w-16 h-16 object-cover" /></td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">{p.subcategory || "-"}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(p)} className="mr-2 text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel; 
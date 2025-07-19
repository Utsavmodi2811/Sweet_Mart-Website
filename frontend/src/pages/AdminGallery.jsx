import React, { useEffect, useState, useRef } from 'react';

const CATEGORY_OPTIONS = [
  { value: 'shop', label: 'Shop Photos' },
  { value: 'sweets', label: 'Sweet Photos' },
  { value: 'packaging', label: 'Packaging' },
  { value: 'festival', label: 'Festival Celebrations' },
];

const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ image: null, category: CATEGORY_OPTIONS[0].value, description: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef();

  const fetchImages = () => {
    setLoading(true);
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => { setImages(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError('Failed to fetch gallery images.'); setLoading(false); });
  };
  useEffect(() => { fetchImages(); }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    setForm(f => ({ ...f, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleEdit = (img) => {
    setEditId(img._id);
    setForm({ image: null, category: img.category, description: img.description || '' });
    setImagePreview(img.image ? `${backendUrl}${img.image}` : null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ image: null, category: CATEGORY_OPTIONS[0].value, description: '' });
    setImagePreview(null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormError(null);
    if (!editId && !form.image) {
      setFormError('Image is required.');
      return;
    }
    setFormLoading(true);
    const formData = new FormData();
    formData.append('category', form.category);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);
    try {
      let res, updatedImg;
      if (editId) {
        res = await fetch(`/api/gallery/${editId}`, {
          method: 'PUT',
          body: formData,
        });
        if (!res.ok) throw new Error('Failed to update image.');
        updatedImg = await res.json();
        setImages(imgs => imgs.map(img => img._id === editId ? updatedImg : img));
        handleCancelEdit();
      } else {
        res = await fetch('/api/gallery', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Failed to upload image.');
        const newImg = await res.json();
        setImages(imgs => [newImg, ...imgs]);
        setForm({ image: null, category: CATEGORY_OPTIONS[0].value, description: '' });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete image.');
      setImages(imgs => imgs.filter(img => img._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      {/* Upload/Edit Form */}
      <div className="mb-8">
        <form onSubmit={handleFormSubmit} className="bg-gray-100 rounded p-6 max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Gallery Image' : 'Upload New Image'}</h2>
          <div className="mb-4">
            <label className="block font-medium mb-1">Category<span className="text-red-500">*</span></label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Image{!editId && <span className="text-red-500">*</span>}</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              required={!editId}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              maxLength={200}
              placeholder="Optional description"
            />
          </div>
          {formError && <div className="text-red-500 mb-2">{formError}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
              disabled={formLoading}
            >
              {formLoading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Update Image' : 'Upload Image')}
            </button>
            {editId && (
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold"
                onClick={handleCancelEdit}
                disabled={formLoading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Gallery Table/Grid */}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : images.length === 0 ? (
          <div className="text-gray-500">No gallery images found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map(img => (
                  <tr key={img._id} className="border-t">
                    <td className="px-4 py-2">
                      <img src={`${backendUrl}${img.image}`} alt="Gallery" className="w-20 h-20 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2 font-semibold">{CATEGORY_OPTIONS.find(opt => opt.value === img.category)?.label || img.category}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{img.description}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => handleEdit(img)}
                        disabled={formLoading}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(img._id)}
                        disabled={formLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery; 
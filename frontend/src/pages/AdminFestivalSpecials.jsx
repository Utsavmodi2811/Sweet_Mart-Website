import React, { useEffect, useState, useRef } from 'react';

const initialForm = {
  name: '',
  description: '',
  image: null,
};

const AdminFestivalSpecials = () => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionTitleInput, setSectionTitleInput] = useState('');
  const [sectionTitleLoading, setSectionTitleLoading] = useState(true);
  const [sectionTitleSaving, setSectionTitleSaving] = useState(false);
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const [editId, setEditId] = useState(null);

  // Fetch section title
  useEffect(() => {
    setSectionTitleLoading(true);
    fetch('/api/settings/festivalSectionTitle')
      .then(res => res.json())
      .then(data => {
        setSectionTitle(data.value || '');
        setSectionTitleInput(data.value || '');
        setSectionTitleLoading(false);
      })
      .catch(() => setSectionTitleLoading(false));
  }, []);

  // Fetch festival items
  const fetchFestivals = () => {
    setLoading(true);
    fetch('/api/festivals')
      .then(res => res.json())
      .then(data => {
        setFestivals(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setError('Failed to fetch festival specials.'));
  };
  useEffect(() => { fetchFestivals(); }, []);

  // Save section title
  const handleSectionTitleSave = async (e) => {
    e.preventDefault();
    setSectionTitleSaving(true);
    try {
      const res = await fetch('/api/settings/festivalSectionTitle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: sectionTitleInput }),
      });
      if (!res.ok) throw new Error('Failed to save section title');
      const data = await res.json();
      setSectionTitle(data.value);
    } catch {
      alert('Failed to save section title');
    } finally {
      setSectionTitleSaving(false);
    }
  };

  // Delete festival section (all items + title)
  const handleDeleteFestival = async () => {
    if (!window.confirm('Delete the entire festival section and all its items?')) return;
    setFormLoading(true);
    try {
      await fetch('/api/festivals', { method: 'DELETE' });
      await fetch('/api/settings/festivalSectionTitle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: '' }),
      });
      setSectionTitle('');
      setSectionTitleInput('');
      setFestivals([]);
      setForm(initialForm);
      setImagePreview(null);
      setEditId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      alert('Failed to delete festival section');
    } finally {
      setFormLoading(false);
    }
  };

  // Form logic
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
  const handleEditFestival = (festival) => {
    setEditId(festival._id);
    setForm({
      name: festival.name || '',
      description: festival.description || '',
      image: null, // New image not selected yet
    });
    setImagePreview(festival.image || null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleCancelEdit = () => {
    setEditId(null);
    setForm(initialForm);
    setImagePreview(null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormError(null);
    if (!form.name.trim() || (!editId && !form.image)) {
      setFormError('Item name and image are required.');
      return;
    }
    setFormLoading(true);
    const formData = new FormData();
    formData.append('sectionTitle', sectionTitle); // Always send current section title
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);
    try {
      let res, updatedFestival;
      if (editId) {
        res = await fetch(`/api/festivals/${editId}`, {
          method: 'PUT',
          body: formData,
        });
        if (!res.ok) throw new Error('Failed to update festival special.');
        updatedFestival = await res.json();
        setFestivals(f => f.map(fest => fest._id === editId ? updatedFestival : fest));
        handleCancelEdit();
      } else {
        res = await fetch('/api/festivals', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Failed to add festival special.');
        const newFestival = await res.json();
        setFestivals(f => [newFestival, ...f]);
        setForm(initialForm);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };
  const handleDeleteFestivalItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this festival special?')) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/festivals/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete festival special.');
      setFestivals(f => f.filter(fest => fest._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Festival Specials Management</h1>
      {/* Festival Section Title */}
      <div className="mb-8 bg-yellow-50 p-6 rounded shadow max-w-xl mx-auto">
        <form onSubmit={handleSectionTitleSave} className="flex gap-2 items-center">
          <input
            type="text"
            value={sectionTitleInput}
            onChange={e => setSectionTitleInput(e.target.value)}
            placeholder="e.g. Diwali Special"
            className="border p-2 rounded flex-1"
            required
            disabled={sectionTitleLoading || formLoading}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={sectionTitleLoading || formLoading || sectionTitleSaving}
          >
            {sectionTitleSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
        {sectionTitle && (
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded font-semibold"
            onClick={handleDeleteFestival}
            disabled={formLoading}
          >
            Delete Festival (and all items)
          </button>
        )}
      </div>
      {/* Add/Edit Form and List/Table */}
      {sectionTitle ? (
        <>
          <div className="mb-8">
            <form onSubmit={handleFormSubmit} className="bg-gray-100 rounded p-6 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Festival Special' : 'Add New Festival Special'}</h2>
              <div className="mb-4">
                <label className="block font-medium mb-1">Item Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  maxLength={100}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  maxLength={500}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Item Image<span className="text-red-500">*</span></label>
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
              {formError && <div className="text-red-500 mb-2">{formError}</div>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
                  disabled={formLoading}
                >
                  {formLoading ? (editId ? 'Saving...' : 'Saving...') : (editId ? 'Update Festival Special' : 'Add Festival Special')}
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
          {/* List/Table */}
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : festivals.length === 0 ? (
              <div className="text-gray-500">No festival specials found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Item Name</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {festivals.map(festival => (
                      <tr key={festival._id} className="border-t">
                        <td className="px-4 py-2">
                          <img src={festival.image} alt={festival.name} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2 font-semibold">{festival.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{festival.description}</td>
                        <td className="px-4 py-2">
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => handleEditFestival(festival)}
                            disabled={formLoading}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteFestivalItem(festival._id)}
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
        </>
      ) : (
        <div className="text-center text-gray-500">Set a festival section title to begin adding festival specials.</div>
      )}
    </div>
  );
};

export default AdminFestivalSpecials; 
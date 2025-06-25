import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import BackButton from '../components/BackButton';

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', logo: '' });
  const [editingHotel, setEditingHotel] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchHotels(currentPage);
  }, [currentPage]);

  const fetchHotels = async (page) => {
    try {
      const res = await axios.get(`/api/admin/hotels?page=${page}&limit=5`);
      setHotels(res.data.hotels);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;

    try {
      await axios.delete(`/api/admin/hotels/${id}`);
      setHotels(prev => prev.filter(hotel => hotel.id !== id));
      alert('Hotel deleted successfully');
    } catch (err) {
      console.error('Error deleting hotel:', err);
      alert('Failed to delete hotel');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', editingHotel.name);
    formData.append('address', editingHotel.address);

    if (editingHotel.logo instanceof File) {
      formData.append('logo', editingHotel.logo);
    }

    try {
      const res = await axios.put(`/api/admin/hotels/${editingHotel.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = res.data.hotel;
      setHotels(prev => prev.map(h => (h.id === updated.id ? updated : h)));
      alert('Hotel updated successfully');
      setEditingHotel(null);
    } catch (err) {
      console.error('Update failed', err);
      alert('Update failed');
    }
  };

  const submitForm = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', form.name);
    formDataToSend.append('address', form.address);
    if (form.logo) formDataToSend.append('logo', form.logo);

    try {
      await axios.post('/api/admin/hotels', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Hotel added successfully!');
      setForm({ name: '', address: '', logo: '' });
      fetchHotels();
      setShowAddForm(false);
    } catch (err) {
      console.error('Add hotel error:', err);
      alert('Failed to add hotel');
    }
  };

  return (
    <div className="wrapper">
      <div className='container'>
        <h2 className="text-2xl font-bold mb-4">Hotels</h2>

        <button className="btnHome" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Hotel'}
        </button>

        {showAddForm && (
          <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="formBox mt-4">
            <input
              className="inputHome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Hotel Name"
              required
            />
            <input
              className="inputHome"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              required
            />
            <input
              className="inputHome"
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
              placeholder="Logo"
            />
            <button type="submit" className="btnHome">Save Hotel</button>
          </form>
        )}

        <table className="hotelTable">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Logo</th>
              <th className="border p-2">QR Code</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => {
              const isEditing = editingHotel && editingHotel.id === h.id;
              const disableActions = showAddForm || (editingHotel && !isEditing);

              return (
                <tr key={h.id}>
                  <td className="border p-2">{h.name}</td>
                  <td className="border p-2">{h.address}</td>
                  <td className="border p-2">
                    <img src={`/uploads/${h.logo}`} alt="Logo" className="tableImage" />
                  </td>
                  <td className="border p-2">
                    <img src={`/uploads/${h.qr_code_url}`} alt="QR Code" className="tableImage" />
                  </td>
                  <td className="border p-2">
                    <button
                      className={`btnHome ${disableActions ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !disableActions && setEditingHotel(h)}
                      disabled={disableActions}
                    >
                      Edit
                    </button>

                    <button
                      className={`btnHome ${disableActions ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !disableActions && handleDelete(h.id)}
                      disabled={disableActions}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination mt-4 flex justify-center items-center space-x-4">
          <button
            className="btnHome"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btnHome"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {editingHotel && (
          <div className="p-4 mt-4 bg-gray-200 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Edit Hotel</h3>
            <input
              className="inputHome"
              value={editingHotel.name}
              onChange={e => setEditingHotel({ ...editingHotel, name: e.target.value })}
              placeholder="Hotel Name"
            />
            <input
              className="inputHome"
              value={editingHotel.address}
              onChange={e => setEditingHotel({ ...editingHotel, address: e.target.value })}
              placeholder="Address"
            />
            <input
              className="inputHome"
              type="file"
              accept="image/*"
              onChange={(e) => setEditingHotel({ ...editingHotel, logo: e.target.files[0] })}
              placeholder="Logo"
            />
            <div className="flex space-x-2 mt-2">
              <button onClick={handleUpdate} className="btnHome">Save</button>
              <button onClick={() => setEditingHotel(null)} className="btnHome bg-gray-500">Cancel</button>
            </div>
          </div>
        )}
        
      </div>
      <BackButton />
    </div>
  );
};

export default AdminDashboard;

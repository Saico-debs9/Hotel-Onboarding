import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'

const AdminDashboard = () => {
    const [hotels, setHotels] = useState([]);
    const [form, setForm] = useState({ name: '', address: '', logo: '', qr_code_url: '' });
    const [editingHotel, setEditingHotel] = useState(null);


    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        const res = await axios.get('/api/hotels');
        setHotels(res.data);
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/hotels', form);
        fetchHotels();
        setForm({ name: '', address: '', logo: '', qr_code_url: '' });
    };
    const handleEdit = (hotel) => {
        setEditingHotel(hotel);
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this hotel?")) return;

        try {
            await axios.delete(`/api/hotels/${id}`);
            setHotels(prev => prev.filter(hotel => hotel.id !== id)); // update state
            alert('Hotel deleted successfully');
        } catch (err) {
            console.error('Error deleting hotel:', err);
            alert('Failed to delete hotel');
        }
    };
    const handleUpdate = async () => {
        try {
            await axios.put(`/api/hotels/${editingHotel.id}`, editingHotel);
            setHotels(prev =>
                prev.map(h => (h.id === editingHotel.id ? editingHotel : h))
            );
            alert('Hotel updated successfully');
            setEditingHotel(null);
        } catch (err) {
            console.error('Update failed', err);
            alert('Update failed');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Hotel</h2>
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                {['name', 'address', 'logo', 'qr_code_url'].map(field => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                ))}
                <button type="submit" className="btnHome">Add Hotel</button>
            </form>

            <h2 className="text-xl font-semibold mb-2">Hotels</h2>
            <table className="w-full border-collapse border border-gray-300">
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
                    {hotels.map(h => (
                        <tr key={h.id}>
                            <td className="border p-2">{h.name}</td>
                            <td className="border p-2">{h.address}</td>
                            <td className="border p-2"><img src={h.logo} alt="Logo" className="h-10" /></td>
                            <td className="border p-2"><img src={h.qr_code_url} alt="QR" className="h-10" /></td>
                            <td className="border p-2">
                                {/* Add update functionality later */}
                                <button
                                    className="btnHome"
                                    onClick={() => handleEdit(h)}
                                >
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(h.id)} className="btnHome">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingHotel && (
                <div className="p-4 mt-4 bg-gray-200 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">Edit Hotel</h3>
                    <input
                        className="block mb-2 p-2 border rounded w-full"
                        value={editingHotel.name}
                        onChange={e => setEditingHotel({ ...editingHotel, name: e.target.value })}
                        placeholder="Hotel Name"
                    />
                    <input
                        className="block mb-2 p-2 border rounded w-full"
                        value={editingHotel.address}
                        onChange={e => setEditingHotel({ ...editingHotel, address: e.target.value })}
                        placeholder="Address"
                    />
                    <input
                        className="block mb-2 p-2 border rounded w-full"
                        value={editingHotel.logo}
                        onChange={e => setEditingHotel({ ...editingHotel, logo: e.target.value })}
                        placeholder="Logo URL"
                    />
                    <input
                        className="block mb-2 p-2 border rounded w-full"
                        value={editingHotel.qr_code_url}
                        onChange={e => setEditingHotel({ ...editingHotel, qr_code_url: e.target.value })}
                        placeholder="QR Code URL"
                    />
                    <div className="flex space-x-2">
                        <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                        <button onClick={() => setEditingHotel(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                    </div>
                </div>
            )}

        </div>

    );
};

export default AdminDashboard;

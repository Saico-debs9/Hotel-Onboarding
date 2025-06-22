import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  const handleRowClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Available Hotels</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Logo</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">QR Code</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(hotel => (
                <tr
                  key={hotel.id}
                  onClick={() => handleRowClick(hotel.id)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={hotel.logo || 'https://via.placeholder.com/100'}
                      alt="Logo"
                      className="h-12 object-contain"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium">{hotel.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{hotel.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {hotel.qr_code_url ? (
                      <img
                        src={hotel.qr_code_url}
                        alt="QR"
                        className="h-12"
                      />
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

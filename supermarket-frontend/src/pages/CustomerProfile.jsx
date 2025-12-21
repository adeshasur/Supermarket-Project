import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CustomerSidebar from '../components/CustomerSidebar';

function CustomerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Get customer data from localStorage
  const customerData = JSON.parse(localStorage.getItem('customer') || '{}');

  // Profile Data State
  const [userData, setUserData] = useState({
    name: customerData.name || customerData.username || 'Customer',
    email: customerData.email || 'customer@example.com',
    phone: customerData.phone || '+94 77 XXX XXXX',
    address: customerData.address || 'Colombo, Sri Lanka'
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Save Profile
  const handleSave = () => {
    // Update localStorage
    const updatedCustomer = { ...customerData, ...userData };
    localStorage.setItem('customer', JSON.stringify(updatedCustomer));
    setIsEditing(false);
    alert("Profile Updated Successfully! ✅");
  };

  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('customer');
      navigate('/');
    }
  };

  return (
    <>
      <CustomerSidebar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginLeft: '260px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/customer-home')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
            <ArrowLeft size={24} />
          </button>
          <h2>My Profile</h2>
        </div>

        {/* Profile Picture */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Customer"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '5px solid #16a34a'
            }}
          />
          {!isEditing && (
            <>
              <h2 style={{ margin: '20px 0 5px 0' }}>{userData.name}</h2>
              <p style={{ color: '#777' }}>Customer</p>
            </>
          )}
        </div>

        {/* Profile Form */}
        <div>
          {/* Name Field */}
          {isEditing && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
          )}

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            ) : (
              <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>{userData.email}</div>
            )}
          </div>

          {/* Phone Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            ) : (
              <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>{userData.phone}</div>
            )}
          </div>

          {/* Address Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Delivery Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', resize: 'vertical' }}
              />
            ) : (
              <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>{userData.address}</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✖ Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{ flex: 1, padding: '12px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleLogout}
                style={{ flex: 1, padding: '12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;

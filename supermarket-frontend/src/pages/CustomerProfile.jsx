import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Save, X, LogOut } from 'lucide-react';
import CustomerSidebar from '../components/CustomerSidebar';
import '../Styles/CustomerProfile.css';

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
      <div className="customer-profile-page">
        <div className="profile-container">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <button onClick={() => navigate('/customer-home')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '15px', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={24} />
            </button>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>My Profile</h2>
          </div>

          {/* Profile Picture */}
          <div className="profile-picture-section">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="Customer"
              className="profile-avatar-large"
            />
            {!isEditing && (
              <>
                <h2 className="profile-customer-name">{userData.name}</h2>
                <p className="profile-customer-role">Customer</p>
              </>
            )}
          </div>

          {/* Details Section */}
          <div className="profile-details-section">

            {/* Name Field */}
            {isEditing && (
              <div className="profile-field">
                <label className="profile-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="profile-field">
              <label className="profile-label">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <div className="profile-read-only">{userData.email}</div>
              )}
            </div>

            {/* Phone Field */}
            <div className="profile-field">
              <label className="profile-label">Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <div className="profile-read-only">{userData.phone}</div>
              )}
            </div>

            {/* Address Field */}
            <div className="profile-field">
              <label className="profile-label">Delivery Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="profile-textarea"
                />
              ) : (
                <div className="profile-read-only">{userData.address}</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="profile-btn profile-btn-save">
                  <Save size={18} />
                  Save Changes
                </button>
                <button onClick={() => setIsEditing(false)} className="profile-btn profile-btn-cancel">
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="profile-btn profile-btn-edit">
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                <button onClick={handleLogout} className="profile-btn profile-btn-logout">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;

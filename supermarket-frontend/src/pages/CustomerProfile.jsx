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
      <div style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        background: '#f2f2f7',
        minHeight: '100vh'
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/customer-home')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
            color: '#16a34a',
            fontSize: '1rem'
          }}>
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>Profile</h2>
        </div>

        {/* Profile Picture Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            👤
          </div>
          {!isEditing && (
            <>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: '600' }}>{userData.name}</h2>
              <p style={{ color: '#8e8e93', fontSize: '0.9rem', margin: '0' }}>Customer</p>
            </>
          )}
        </div>

        {/* Profile Details Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>

          {/* Name Field - iOS List Style */}
          {isEditing && (
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e5e5ea'
            }}>
              <label style={{
                fontSize: '0.8rem',
                color: '#8e8e93',
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500'
              }}>FULL NAME</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '4px 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              />
            </div>
          )}

          {/* Email Field */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e5e5ea'
          }}>
            <label style={{
              fontSize: '0.8rem',
              color: '#8e8e93',
              display: 'block',
              marginBottom: '6px',
              fontWeight: '500'
            }}>EMAIL</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '4px 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              />
            ) : (
              <div style={{ fontSize: '1rem', color: '#000' }}>{userData.email}</div>
            )}
          </div>

          {/* Phone Field */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e5e5ea'
          }}>
            <label style={{
              fontSize: '0.8rem',
              color: '#8e8e93',
              display: 'block',
              marginBottom: '6px',
              fontWeight: '500'
            }}>PHONE</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '4px 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              />
            ) : (
              <div style={{ fontSize: '1rem', color: '#000' }}>{userData.phone}</div>
            )}
          </div>

          {/* Address Field */}
          <div style={{ padding: '12px 16px' }}>
            <label style={{
              fontSize: '0.8rem',
              color: '#8e8e93',
              display: 'block',
              marginBottom: '6px',
              fontWeight: '500'
            }}>ADDRESS</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
                rows="2"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '4px 0',
                  resize: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              />
            ) : (
              <div style={{ fontSize: '1rem', color: '#000' }}>{userData.address}</div>
            )}
          </div>
        </div>

        {/* Action Buttons - iOS Style */}
        {isEditing ? (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '14px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                flex: 1,
                padding: '14px',
                background: '#8e8e93',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: '100%',
                padding: '14px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '14px',
                background: 'white',
                color: '#ff3b30',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default CustomerProfile;

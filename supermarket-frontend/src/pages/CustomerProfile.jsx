import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    localStorage.removeItem('customer');
    navigate('/auth');
  };

  // Common Input Style
  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    outline: 'none'
  };

  // Read-Only Field Style
  const readOnlyStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #f0f0f0',
    backgroundColor: '#f9f9f9',
    color: '#333'
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#333',
            margin: 0
          }}>My Profile</h1>
          <button
            onClick={() => navigate('/customer-home')}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            ← Back to Home
          </button>
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
              border: '5px solid #667eea',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
            }}
          />
        </div>

        {/* Name Section */}
        {isEditing ? (
          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>
              Full Name
            </label>
            <input 
              type="text" 
              name="name"
              value={userData.name} 
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ margin: '0', color: '#333', fontSize: '1.8rem' }}>{userData.name}</h2>
            <p style={{ color: '#777', marginTop: '5px' }}>Customer</p>
          </div>
        )}

        {/* Details Section */}
        <div style={{ 
          borderTop: '2px solid #f0f0f0', 
          paddingTop: '30px',
          marginTop: '20px'
        }}>
          
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>
              Email Address
            </label>
            {isEditing ? (
              <input 
                type="email" 
                name="email"
                value={userData.email} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            ) : (
              <div style={readOnlyStyle}>{userData.email}</div>
            )}
          </div>

          {/* Phone Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>
              Phone Number
            </label>
            {isEditing ? (
              <input 
                type="text" 
                name="phone"
                value={userData.phone} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            ) : (
              <div style={readOnlyStyle}>{userData.phone}</div>
            )}
          </div>

          {/* Address Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>
              Delivery Address
            </label>
            {isEditing ? (
              <textarea 
                name="address"
                value={userData.address} 
                onChange={handleChange}
                rows="3"
                style={{...inputStyle, resize: 'vertical'}}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            ) : (
              <div style={readOnlyStyle}>{userData.address}</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          {isEditing ? (
            <>
              <button 
                onClick={handleSave} 
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                💾 Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✖ Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)} 
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✏️ Edit Profile
              </button>
              <button 
                onClick={handleLogout} 
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;

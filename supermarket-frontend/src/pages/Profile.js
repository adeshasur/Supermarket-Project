import React, { useState } from 'react';

function Profile() {
  // 1. Edit Mode එකේ ඉන්නවද කියලා බලන State එක
  const [isEditing, setIsEditing] = useState(false);

  // 2. Profile Data තියාගන්න State එක
  const [userData, setUserData] = useState({
    name: 'System Admin',
    role: 'Supermarket Manager',
    email: 'admin@supermarket.com',
    phone: '+94 77 123 4567'
  });

  // Input වෙනස් කරනකොට State එක update කරන function එක
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Save Button එක click කළාම
  const handleSave = () => {
    setIsEditing(false); // ආපහු බලන Mode එකට දානවා
    alert("Profile Updated Successfully! ✅");
  };

  // Common Input Style (Dark Mode compatible)
  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid var(--border-color)', // Border color variable
    background: 'var(--input-bg)', // Input background variable
    color: 'var(--text-color)' // Text color variable
  };

  // Common Read-Only Field Style
  const readOnlyStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid var(--border-color)', // Border එකක් දැම්මා background එක වෙනුවට
    color: 'var(--text-color)',
    background: 'transparent' // Background එක අයින් කළා (Clean look)
  };

  return (
    // --- 1. maxWidth 850px ලෙස වෙනස් කළා (Settings Page එකට සමානයි) ---
    <div style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}>
      <h1 className="page-title">My Profile</h1>
      
      <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        
        {/* Profile Picture */}
        <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="Admin" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', border: '4px solid #f0f0f0' }}
        />
        
        {/* --- 1. HEADER SECTION (Name & Role) --- */}
        {isEditing ? (
            // Edit Mode: Input Fields
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    name="name"
                    value={userData.name} 
                    onChange={handleChange}
                    style={{ ...inputStyle, textAlign: 'center', width: '60%', fontSize: '1.2rem', marginBottom: '10px' }}
                />
                <br/>
                <input 
                    type="text" 
                    name="role"
                    value={userData.role} 
                    onChange={handleChange}
                    style={{ ...inputStyle, textAlign: 'center', width: '50%', padding: '5px', color: '#777' }}
                />
            </div>
        ) : (
            // View Mode: Just Text
            <div>
                <h2 style={{ margin: '0 0 5px 0', color: 'var(--text-color)' }}>{userData.name}</h2>
                <p style={{ color: '#777', marginTop: '0' }}>{userData.role}</p>
            </div>
        )}

        {/* --- 2. DETAILS SECTION --- */}
        <div style={{ textAlign: 'left', marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            
            {/* Email Field */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: 'var(--text-color)', marginBottom: '5px' }}>Email Address</label>
                {isEditing ? (
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email} 
                        onChange={handleChange}
                        style={inputStyle}
                    />
                ) : (
                    <div style={readOnlyStyle}>
                        {userData.email}
                    </div>
                )}
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: 'var(--text-color)', marginBottom: '5px' }}>Phone Number</label>
                {isEditing ? (
                    <input 
                        type="text" 
                        name="phone"
                        value={userData.phone} 
                        onChange={handleChange}
                        style={inputStyle}
                    />
                ) : (
                    <div style={readOnlyStyle}>
                        {userData.phone}
                    </div>
                )}
            </div>

             {/* Role Badge (Read Only) */}
             <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: 'var(--text-color)' }}>Access Level</label>
                <div style={{ padding: '8px 15px', background: '#e3f2fd', color: '#0d47a1', borderRadius: '20px', marginTop: '5px', display: 'inline-block', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Administrator
                </div>
            </div>
        </div>
        
        {/* --- 3. ACTION BUTTONS --- */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {isEditing ? (
                <>
                    <button 
                        onClick={handleSave} 
                        className="submit-btn" 
                        style={{ backgroundColor: '#28a745', flex: 1 }}
                    >
                        Save Changes
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)} 
                        className="submit-btn" 
                        style={{ backgroundColor: '#6c757d', flex: 1 }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="submit-btn" 
                    style={{ width: '100%' }}
                >
                    Edit Profile Information
                </button>
            )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
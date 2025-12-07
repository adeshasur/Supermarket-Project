import React from 'react';

function Profile() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">My Profile</h1>
      
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        
        <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="Admin" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', border: '4px solid #f0f0f0' }}
        />
        
        <h2 style={{ margin: '0 0 5px 0', color: '#333' }}>System Admin</h2>
        <p style={{ color: '#777', marginTop: '0' }}>Supermarket Manager</p>

        <div style={{ textAlign: 'left', marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Email Address</label>
                <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px', marginTop: '5px' }}>admin@supermarket.com</div>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Phone Number</label>
                <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px', marginTop: '5px' }}>+94 77 123 4567</div>
            </div>
             <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Role</label>
                <div style={{ padding: '10px', background: '#e3f2fd', color: '#0d47a1', borderRadius: '5px', marginTop: '5px', display: 'inline-block' }}>Administrator</div>
            </div>
        </div>
        
        <button className="submit-btn" style={{ marginTop: '20px', width: '100%', padding: '12px' }}>Edit Profile Information</button>
      </div>
    </div>
  );
}

export default Profile;
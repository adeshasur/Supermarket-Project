import React from 'react';
import { useTheme } from '../context/ThemeContext'; // <--- 1. Context import කරන්න

function Settings() {
  const { theme, toggleTheme } = useTheme(); // <--- 2. Theme data ගන්න

  const handleThemeChange = (e) => {
    toggleTheme(e.target.value);
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">System Settings</h1>

      {/* Inline styles වෙනුවට var() පාවිච්චි කරනවා නම් වඩා හොඳයි, 
          නමුත් දැනට dark mode class එකෙන් අපි override කරනවා */}
      <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        
        {/* Appearance Section */}
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-color)' }}>🎨 Appearance</h3>
            <div style={{ marginTop: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Theme Preference</label>
                
                {/* Select Box Update */}
                <select 
                    value={theme} 
                    onChange={handleThemeChange}
                    style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ddd' }}
                >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                </select>

            </div>
        </div>

        {/* Notifications Section */}
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-color)' }}>🔔 Notifications</h3>
            <div style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="checkbox" id="emailNotif" defaultChecked style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    <label htmlFor="emailNotif">Email Alerts</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="smsNotif" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    <label htmlFor="smsNotif">SMS Notifications</label>
                </div>
            </div>
        </div>

        <button className="submit-btn" onClick={() => alert("Settings Saved! (Theme applied instantly)")}>Save Changes</button>
      </div>
    </div>
  );
}

export default Settings;
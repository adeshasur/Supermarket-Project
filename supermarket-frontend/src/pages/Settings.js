import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (e) => {
    toggleTheme(e.target.value);
  };

  // Profile Page එකේ වගේම Input Styles හැදුවා (Dark Mode සඳහා)
  const inputStyle = {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid var(--border-color)', // Border variable
    background: 'var(--input-bg)', // Background variable
    color: 'var(--text-color)', // Text variable
    cursor: 'pointer'
  };

  return (
    // 1. maxWidth 850px කළා (Profile එකට සමානයි)
    <div style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}>
      <h1 className="page-title">System Settings</h1>

      {/* 2. padding 40px කළා & Background Variables දැම්මා */}
      <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        
        {/* Appearance Section */}
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-color)' }}>🎨 Appearance</h3>
            <div style={{ marginTop: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: 'var(--text-color)' }}>Theme Preference</label>
                
                {/* Select Box Update */}
                <select 
                    value={theme} 
                    onChange={handleThemeChange}
                    style={inputStyle} // අර උඩ හදපු style එක දැම්මා
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
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <input type="checkbox" id="emailNotif" defaultChecked style={{ width: '20px', height: '20px', marginRight: '10px', cursor: 'pointer' }} />
                    <label htmlFor="emailNotif" style={{ color: 'var(--text-color)', cursor: 'pointer' }}>Email Alerts (Orders & Low Stock)</label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="smsNotif" style={{ width: '20px', height: '20px', marginRight: '10px', cursor: 'pointer' }} />
                    <label htmlFor="smsNotif" style={{ color: 'var(--text-color)', cursor: 'pointer' }}>SMS Notifications</label>
                </div>

            </div>
        </div>

        <button 
            className="submit-btn" 
            style={{ width: '100%' }} // Button එක දිගට දැම්මා
            onClick={() => alert("Settings Saved! (Theme applied instantly)")}
        >
            Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
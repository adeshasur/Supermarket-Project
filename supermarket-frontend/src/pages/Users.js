import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import AdminList from '../components/AdminList';
import UserList from '../components/UserList'; // make sure this file exists

function Users() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [inputTerm, setInputTerm] = useState('');
    const [finalSearchTerm, setFinalSearchTerm] = useState('');

    const handleUserAdded = () => setRefreshKey(prev => prev + 1);
    const handleSearchClick = () => setFinalSearchTerm(inputTerm);

    return (
        <div className="inventory-page">
            <h1 className="page-title">User Management</h1>

            {/* Search bar */}
            <div className="inventory-search-group">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={inputTerm}
                    onChange={e => setInputTerm(e.target.value)}
                    className="inventory-search-input"
                />
                <button className="search-btn" onClick={handleSearchClick}>Search</button>
            </div>

            <div className="inventory-content">

                {/* Admin registration form */}
                <div className="inventory-form-section">
                    <UserForm onUserAdded={handleUserAdded} />
                </div>

                {/* Tables container - stacked vertically */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', minWidth: 0 }}>
                    {/* Admin list */}
                    <div style={{
                        background: 'white',
                        padding: '25px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #e9ecef'
                    }}>
                        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a' }}>Admins</h2>
                        <AdminList refreshKey={refreshKey} searchTerm={finalSearchTerm} />
                    </div>

                    {/* Customer list */}
                    <div style={{
                        background: 'white',
                        padding: '25px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #e9ecef'
                    }}>
                        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a' }}>Customers</h2>
                        <UserList refreshKey={refreshKey} searchTerm={finalSearchTerm} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Users;

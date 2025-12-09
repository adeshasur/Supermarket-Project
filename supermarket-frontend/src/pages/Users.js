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

                {/* Admin list */}
                <div className="inventory-list-section">
                    <h2>Admins</h2>
                    <AdminList refreshKey={refreshKey} searchTerm={finalSearchTerm} />
                </div>

                {/* Customer list */}
                <div className="inventory-list-section">
                    <h2>Customers</h2>
                    <UserList refreshKey={refreshKey} searchTerm={finalSearchTerm} />
                </div>

            </div>
        </div>
    );
}

export default Users;

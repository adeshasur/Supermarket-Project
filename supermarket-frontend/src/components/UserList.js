import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/TableStyles.css';

function UserList({ refreshKey, searchTerm }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = "http://localhost:8083";

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Assuming this GET endpoint is correct based on your previous code
            const res = await axios.get(`${API_BASE_URL}/customers`);
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [refreshKey]);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Delete User ID: " + id + "?")) {
            try {
                // DELETE endpoint: Assuming /customers/{id} is the correct structure
                await axios.delete(`${API_BASE_URL}/customers/${id}`);

                // Refresh the list after successful deletion
                fetchUsers();
            } catch (error) {
                // Improved error logging
                console.error("Failed to delete user:", error.response ? error.response.data : error.message);
                alert("Failed to delete user. Check console for details.");
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Users...</div>;

    return (
        <div className="app-table-container">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th> {/* 🌟 ADDED COLUMN 🌟 */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        // Updated colSpan to 6 (5 data columns + 1 Action column)
                        <tr><td colSpan="6" style={{ textAlign: 'center' }}>No users found.</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td> {/* 🌟 ADDED DATA 🌟 */}
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        style={{
                                            padding: '5px 10px',
                                            background: '#dc3545',
                                            color: 'white',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
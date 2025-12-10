import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function UserList({ refreshKey, searchTerm }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8083/customers");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [refreshKey]);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Delete User ID: " + id + "?")) {
            try {
                await axios.delete(`http://localhost:8083/customers/${id}`);
                fetchUsers();
            } catch (error) {
                alert("Failed to delete user.");
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Users...</div>;

    return (
        <div className="app-table-container">
            <h3>Customer Directory</h3>
            <table className="app-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleDelete(user.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Delete</button>
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

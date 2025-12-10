import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function AdminList({ refreshKey, searchTerm }) {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8083/admins");
            setAdmins(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAdmins(); }, [refreshKey]);

    const filteredAdmins = admins.filter(admin =>
        admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Delete Admin ID: " + id + "?")) {
            try {
                await axios.delete(`http://localhost:8083/api/admins/${id}`);
                fetchAdmins();
            } catch (error) {
                alert("Failed to delete admin.");
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Admins...</div>;

    return (
        <div className="app-table-container">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdmins.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>No admins found.</td></tr>
                    ) : (
                        filteredAdmins.map(admin => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(admin.id)}
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

export default AdminList;

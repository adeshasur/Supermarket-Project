import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api'; // <--- 1. Gateway Config Import kala
import '../styles/TableStyles.css';

function InventoryList({ refreshKey, searchTerm = '', statusFilter = '' }) { 
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to get status text
    const getStatusString = (quantity) => {
        if (quantity < 10) return 'Low Stock';
        if (quantity < 50) return 'Medium Stock';
        return 'In Stock';
    };

    // Helper to get class name for row styling
    const getStockClass = (quantity) => {
        if (quantity < 10) return 'low-stock';
        if (quantity < 50) return 'medium-stock';
        return 'in-stock';
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true); 
                setError(null);
                
                // <--- 2. URL eka Gateway ekata update kala
                // Kalin: http://localhost:8082/inventory/all
                // Aluth: http://localhost:8080/inventory/inventory/all
                // (Meka API Gateway -> Inventory Service -> Controller ekata yanawa)
                const response = await axios.get(`${API_BASE_URLS.INVENTORY}/inventory/all`);
                
                setInventory(response.data);
            } catch (err) {
                setError('Could not fetch inventory. Is Gateway (8080) or Inventory Service running?');
                console.error(err);
            }
            setLoading(false);
        };
        fetchInventory();
    }, [refreshKey]); 

    // Client-side filtering logic
    const filteredInventory = inventory.filter(item => {
        const itemStatus = getStatusString(item.quantity);
        // Product ID eka string ekak karala check karanawa
        const matchesSearch = item.productId.toString().includes(searchTerm);
        const matchesStatus = statusFilter === '' || itemStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Loading Inventory...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inventory-table-container" style={{ borderColor: '#dc3545', padding: '20px' }}>
                <h3 style={{ color: '#dc3545' }}>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="inventory-table-container">
            <h3>Inventory Status Dashboard</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Current Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInventory.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No inventory data found.
                            </td>
                        </tr>
                    ) : (
                        filteredInventory.map((item) => (
                            <tr key={item.id} className={getStockClass(item.quantity)}>
                                <td>{item.productId}</td>
                                <td className="quantity-cell">
                                    {item.quantity}
                                </td>
                                <td className="status-cell-wrapper">
                                    <div className="status-cell">
                                        <span className={`status-dot ${getStockClass(item.quantity)}`}></span>
                                        {getStatusString(item.quantity)}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;
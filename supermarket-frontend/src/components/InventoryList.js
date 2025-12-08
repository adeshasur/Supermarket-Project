import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api';
import '../styles/TableStyles.css';

function InventoryList({ refreshKey, searchTerm = '', statusFilter = '' }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ productId: '', quantity: '' });

  // Helpers
  const getStatusString = (quantity) => {
    if (quantity < 10) return 'Low Stock';
    if (quantity < 50) return 'Medium Stock';
    return 'In Stock';
  };

  const getStockClass = (quantity) => {
    if (quantity < 10) return 'low-stock';
    if (quantity < 50) return 'medium-stock';
    return 'in-stock';
  };

  // Fetch inventory from backend
  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URLS.INVENTORY}/all`);
      setInventory(response.data);
    } catch (err) {
      console.error(err);
      setError('Could not fetch inventory. Is Gateway or Inventory Service running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [refreshKey]);

  // CRUD Handlers
  const handleAddInventory = async () => {
    if (!newItem.productId || newItem.quantity === '') return alert("Fill all fields!");
    try {
      await axios.post(`${API_BASE_URLS.INVENTORY}/add`, {
        productId: Number(newItem.productId),
        quantity: Number(newItem.quantity)
      });
      setNewItem({ productId: '', quantity: '' });
      fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to add inventory item.");
    }
  };

  const handleUpdateQuantity = async (item) => {
    try {
      await axios.put(`${API_BASE_URLS.INVENTORY}/update`, {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity
      });
      fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to update inventory.");
    }
  };

  const handleDeleteInventory = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_BASE_URLS.INVENTORY}/delete/${itemId}`);
      fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to delete inventory item.");
    }
  };

  // Client-side filtering
  const filteredInventory = inventory.filter(item => {
    const itemStatus = getStatusString(item.quantity);
    const matchesSearch = item.productId.toString().includes(searchTerm);
    const matchesStatus = statusFilter === '' || itemStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading Inventory...</p>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;

  return (
    <div className="inventory-table-container">
      <h3>Inventory Status Dashboard</h3>

      {/* Add New Item */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Product ID"
          value={newItem.productId}
          onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddInventory}>Add Inventory</button>
      </div>

      {/* Inventory Table */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Current Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No inventory data found.</td>
            </tr>
          ) : (
            filteredInventory.map((item) => (
              <tr key={item.id} className={getStockClass(item.quantity)}>
                <td>{item.productId}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setInventory(prev =>
                        prev.map(i => i.id === item.id ? { ...i, quantity: Number(e.target.value) } : i)
                      )
                    }
                    style={{ width: '60px' }}
                  />
                </td>
                <td className="status-cell-wrapper">
                  <div className="status-cell">
                    <span className={`status-dot ${getStockClass(item.quantity)}`}></span>
                    {getStatusString(item.quantity)}
                  </div>
                </td>
                <td>
                  <button onClick={() => handleUpdateQuantity(item)}>Update</button>
                  <button onClick={() => handleDeleteInventory(item.id)}>Delete</button>
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function InventoryList({ refreshKey, searchTerm = '', statusFilter = '' }) {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Helpers ---
  const getStatusString = (q) => q < 10 ? 'Low Stock' : q < 50 ? 'Medium Stock' : 'In Stock';
  const getStockClass = (q) => q < 10 ? 'low-stock' : q < 50 ? 'medium-stock' : 'in-stock';

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [invRes, prodRes] = await Promise.all([
        axios.get("http://localhost:8082/inventory/all"),
        axios.get("http://localhost:8081/api/products")
      ]);
      setInventory(invRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching data. Check services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [refreshKey]);

  // --- Filtering ---
  const filteredInventory = inventory.filter(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return false; 
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.productId.toString().includes(searchTerm);
    const matchesStatus = statusFilter === '' || getStatusString(item.quantity) === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading...</p>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;

  return (
    <div className="app-table-container">
      <h3>Inventory Status Dashboard</h3>

      <table className="app-table">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>ID</th>
            <th style={{ width: '15%', textAlign: 'center' }}>Image</th>
            <th style={{ width: '40%' }}>Product Name</th>
            <th style={{ width: '15%', textAlign: 'center' }}>Stock</th>
            <th style={{ width: '20%', textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No Data Found</td></tr>
          ) : (
            filteredInventory.map((item) => {
              const product = products.find(p => p.id === item.productId);
              
              return (
                <tr key={item.id} className={getStockClass(item.quantity)}>
                  
                  {/* 1. ID Column */}
                  <td>{item.productId}</td>
                  
                  {/* 2. Image Column */}
                  <td style={{ textAlign: 'center' }}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="product-img" />
                    ) : (
                      <span className="no-img">No Img</span>
                    )}
                  </td>
                  
                  {/* 3. Name Column (BOLD අයින් කළා) */}
                  <td>
                    {product.name}
                  </td>
                  
                  {/* 4. Stock Column (BOLD අයින් කළා) */}
                  <td style={{ textAlign: 'center' }}>
                    {item.quantity}
                  </td>
                  
                  {/* 5. Status Column */}
                  <td style={{ textAlign: 'center' }}>
                    <div className="status-cell">
                      <span className={`status-dot ${getStockClass(item.quantity)}`}></span>
                      {getStatusString(item.quantity)}
                    </div>
                  </td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
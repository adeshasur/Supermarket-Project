import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css'; // Final CSS Link

function InventoryList({ refreshKey, searchTerm = '', statusFilter = '' }) {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newItem, setNewItem] = useState({ productId: '', quantity: '' });

  // --- Helpers ---
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

  // --- Data Fetching (Service දෙකෙන්ම) ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Inventory Service (Port 8082)
      const inventoryRes = await axios.get("http://localhost:8082/inventory/all");
      // Product Service (Port 8081)
      const productsRes = await axios.get("http://localhost:8081/api/products");

      setInventory(inventoryRes.data);
      setProducts(productsRes.data);

    } catch (err) {
      console.error(err);
      setError('Error fetching data. Check if BOTH Product (8081) and Inventory (8082) services are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  // --- Helper to find Product Details ---
  const getProductDetails = (id) => {
    return products.find(p => p.id === id); 
  };

  // --- Add Inventory Handler (වම් පැත්තේ Form එකෙන් Add කළාම) ---
  const handleAddInventory = async () => {
    if (!newItem.productId || newItem.quantity === '') return alert("Please fill all fields!");
    try {
      await axios.post("http://localhost:8082/inventory/add", {
        productId: Number(newItem.productId),
        quantity: Number(newItem.quantity)
      });
      setNewItem({ productId: '', quantity: '' });
      fetchData(); 
      alert("Inventory Added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add.");
    }
  };

  // --- Filtering Logic (Unknown Products Filtered) ---
  const filteredInventory = inventory.filter(item => {
    const productDetails = getProductDetails(item.productId);
    
    // Product විස්තර නැති නම් (Unknown නම්), ලිස්ට් එකෙන් අයින් කරනවා.
    if (!productDetails) return false; 

    const nameMatch = productDetails.name.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = item.productId.toString().includes(searchTerm);
    const itemStatus = getStatusString(item.quantity);
    const matchesStatus = statusFilter === '' || itemStatus === statusFilter;
    
    return (nameMatch || idMatch) && matchesStatus;
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading Data...</p>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;

  return (
    <div className="inventory-table-container">
      <h3>Inventory Status Dashboard</h3>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Info</th> 
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No inventory data found.</td></tr>
          ) : (
            filteredInventory.map((item) => {
              const product = getProductDetails(item.productId);
              
              return (
                <tr key={item.id} className={getStockClass(item.quantity)}>
                  <td>
                    {/* ✅ FIX: Final alignment class for image/text group */}
                    <div className="product-info-group"> 
                       {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-img" />}
                       <div>
                         <strong>{product.name}</strong><br/>
                         <small style={{color:'#666'}}>ID: {item.productId}</small>
                       </div>
                    </div>
                  </td>
                  
                  {/* Quantity as simple Text */}
                  <td>
                    {item.quantity} 
                  </td>
                  
                  <td className="status-cell-wrapper">
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
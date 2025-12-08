import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

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

  // --- 1. DATA FETCHING (Service දෙකෙන්ම) ---
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

  // --- Handlers (Add/Update) ---
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

  const handleUpdateQuantity = async (item) => {
    try {
      await axios.put("http://localhost:8082/inventory/update", {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity
      });
      alert("Stock Updated!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  // --- Filtering Logic (මෙතන තමයි වෙනස කළේ) ---
  const filteredInventory = inventory.filter(item => {
    const productDetails = getProductDetails(item.productId);
    
    // වැදගත්ම කොටස: Product එකේ විස්තර හොයාගන්න බැරි නම් (Unknown නම්), මේක ලිස්ට් එකෙන් අයින් කරනවා.
    if (!productDetails) return false;

    // Search Logic
    const nameMatch = productDetails.name.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = item.productId.toString().includes(searchTerm);
    
    // Status Logic
    const itemStatus = getStatusString(item.quantity);
    const matchesStatus = statusFilter === '' || itemStatus === statusFilter;
    
    return (nameMatch || idMatch) && matchesStatus;
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading Data...</p>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;

  return (
    <div className="inventory-table-container">
      <h3>Inventory Status Dashboard</h3>

      {/* Quick Add Form */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h4 style={{marginTop: 0}}>Quick Add (by ID)</h4>
        <div style={{display:'flex', gap:'10px'}}>
            <input
            type="number"
            placeholder="Prod ID"
            value={newItem.productId}
            onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
            style={{ width: '100px', padding: '5px' }}
            />
            <input
            type="number"
            placeholder="Qty"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            style={{ width: '100px', padding: '5px' }}
            />
            <button onClick={handleAddInventory} style={{cursor:'pointer'}}>Add</button>
        </div>
        <small style={{color:'#666'}}>* Use the ID from the Products page to add stock here.</small>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Info</th>
            <th>Current Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No data found.</td></tr>
          ) : (
            filteredInventory.map((item) => {
              const product = getProductDetails(item.productId);
              
              return (
                <tr key={item.id} className={getStockClass(item.quantity)}>
                  <td>
                    {/* දැන් product එක අනිවාර්යයෙන් තියෙනවා filter කරපු නිසා */}
                       <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'5px'}}/>}
                          <div>
                            <strong>{product.name}</strong><br/>
                            <small style={{color:'#666'}}>ID: {item.productId}</small>
                          </div>
                       </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        setInventory(prev =>
                          prev.map(i => i.id === item.id ? { ...i, quantity: Number(e.target.value) } : i)
                        )
                      }
                      style={{ width: '60px', padding: '5px' }}
                    />
                  </td>
                  <td className="status-cell-wrapper">
                    <div className="status-cell">
                      <span className={`status-dot ${getStockClass(item.quantity)}`}></span>
                      {getStatusString(item.quantity)}
                    </div>
                  </td>
                  <td>
                    <button className="action-btn update-btn" onClick={() => handleUpdateQuantity(item)}>Update</button>
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api';
import '../styles/TableStyles.css'; // Link to the CSS file

function ProductList({ refreshKey, searchTerm = '' }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                setError(null);
                const response = await axios.get(`${API_BASE_URLS.PRODUCTS}/api/products`);
                setProducts(response.data);
            } catch (err) {
                setError('Could not fetch products. Is Product Service (8081) running?');
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [refreshKey]);

    const filteredProducts = products.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Delete Handler ---
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`${API_BASE_URLS.PRODUCTS}/api/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete product.');
        }
    };

    // --- Update Handlers ---
    const handleUpdate = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                name: currentProduct.name,
                description: currentProduct.description,
                price: parseFloat(currentProduct.price),
                imageUrl: currentProduct.imageUrl || ''
            };
            await axios.put(`${API_BASE_URLS.PRODUCTS}/api/products/${currentProduct.id}`, updatedProduct);
            
            setProducts(products.map(p => (p.id === currentProduct.id ? { ...p, ...updatedProduct } : p)));
            setIsModalOpen(false);
            alert("Product Updated Successfully!");
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update product.');
        }
    };

    if (loading) {
        return (
            <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}>
                <p>Loading Products...</p>
            </div>
        );
    }

    return (
        <div className="inventory-table-container">
            <h3>Product Catalog</h3>
            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price (LKR)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No products found.</td>
                        </tr>
                    ) : (
                        filteredProducts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className="product-image-cell"> {/* Cell for the image */}
                                    {item.imageUrl ? (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            className="product-img" // CSS class එක දැම්මා
                                        />
                                    ) : <span style={{color:'#ccc'}}>No Img</span>}
                                </td>
                                
                                {/* Inline styles ඔක්කොම අයින් කළා */}
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price.toFixed(2)}</td>
                                
                                <td>
                                    <button className="action-btn update-btn" onClick={() => handleUpdate(item)}>
                                        Update
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* --- Update Modal --- */}
            {isModalOpen && currentProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update Product</h3>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <input 
                                    type="text"
                                    value={currentProduct.description}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input 
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL:</label>
                                <input 
                                    type="text"
                                    value={currentProduct.imageUrl || ''}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                                />
                            </div>
                            
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
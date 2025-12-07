import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // <--- 1. Context eka import kala
import '../styles/TableStyles.css'; 

function ProductList({ refreshKey, searchTerm = '' }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // <--- 2. Cart function eka gaththa
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                setError(null);
                // Backend URL
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
            } catch (err) {
                setError('Could not fetch products. Is Product Service (8081) running?');
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [refreshKey]); 

    // Mock Data for testing (Backend නැති වෙලාවට පෙන්නන්න)
    if(error && products.length === 0) {
       // setProducts([{id:1, name:"Test Product", description:"No Backend", price:0}]);
    }

    const filteredProducts = products.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Loading Products...</h3>
            </div>
        );
    }

    return (
        <div className="inventory-table-container">
            <h3>Product Catalog</h3>
             {/* Error Message */}
             {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price (LKR)</th>
                        <th>Action</th> {/* <--- 3. Aluth Column Header eka */}
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}> {/* colSpan 5 kala mokada aluth column ekak awa nisa */}
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        filteredProducts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td style={{ fontWeight: '600', color: '#343a40' }}>{item.name}</td>
                                <td style={{ color: '#666' }}>{item.description}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#007aff' }}>
                                    {item.price.toFixed(2)}
                                </td>
                                {/* <--- 4. Aluth Add to Cart Button eka */}
                                <td style={{ textAlign: 'center' }}>
                                    <button 
                                        onClick={() => addToCart(item)}
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
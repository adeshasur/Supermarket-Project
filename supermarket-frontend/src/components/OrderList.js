import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function OrderList({ refreshKey, searchTerm = '', setOrdersForForm }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const API = "http://localhost:8084/api/orders";

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = API;
      if (searchTerm) url = `${API}/search?customerId=${searchTerm}`;
      const res = await axios.get(url);
      const safe = res.data.map(o => ({ ...o, orderItems: o.orderItems || [] }));
      setOrders(safe);
      setOrdersForForm(safe); // update dropdown
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [refreshKey, searchTerm]);

  const handleUpdateOrder = async () => {
    if (!editingOrder || !editingOrder.customerId) return alert("Customer ID required");
    try {
      await axios.put(`${API}/${editingOrder.id}`, { customerId: Number(editingOrder.customerId) });
      setShowEdit(false);
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try { await axios.delete(`${API}/${id}`); fetchOrders(); } 
    catch (err) { console.error(err); alert("Failed to delete order."); }
  };

  const handleDeleteItem = async (orderId, itemId) => {
    if (!window.confirm("Delete this item?")) return;
    try { await axios.delete(`${API}/${orderId}/items/${itemId}`); fetchOrders(); } 
    catch (err) { console.error(err); alert("Failed to delete item."); }
  };

  if (loading) return <p>Loading Orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="inventory-table-container">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <strong>Order #{order.id}</strong> (Cust {order.customerId})<br/>
              <small>Date: {new Date(order.orderDate).toLocaleString()}</small>
            </div>
            <div className="order-actions">
              <button onClick={() => { setEditingOrder({ ...order }); setShowEdit(true); }}>Edit</button>
              <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
            </div>
          </div>

          <div className="order-items">
            <strong>Items:</strong>
            {order.orderItems.length === 0 ? (
              <p>No items</p>
            ) : (
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map(it => (
                    <tr key={it.id}>
                      <td>{it.productId}</td>
                      <td>{it.quantity}</td>
                      <td>{it.price}</td>
                      <td>
                        <button onClick={() => handleDeleteItem(order.id, it.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {showEdit && editingOrder && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Order #{editingOrder.id}</h5>
                <button className="btn-close" onClick={() => { setShowEdit(false); setEditingOrder(null); }}></button>
              </div>
              <div className="modal-body">
                <label>Customer ID</label>
                <input
                  type="number"
                  value={editingOrder.customerId}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerId: e.target.value })}
                />
                <small>Only Customer ID can be edited.</small>
              </div>
              <div className="modal-footer">
                <button onClick={() => { setShowEdit(false); setEditingOrder(null); }}>Cancel</button>
                <button onClick={handleUpdateOrder}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;

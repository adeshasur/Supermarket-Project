import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Warehouse, ShoppingBag, Users, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import axios from 'axios';

function Dashboard() {
    const [stats, setStats] = useState({
        income: 0,
        orders: 0,
        users: 0,
        lowStock: 0
    });

    const [loading, setLoading] = useState(true);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const ordersRes = await axios.get('http://localhost:8084/api/orders');
                const allOrders = ordersRes.data;

                const successfulOrders = allOrders.filter(order => order.paymentStatus === 'SUCCESS');
                const totalIncome = successfulOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                const inventoryRes = await axios.get('http://localhost:8082/api/inventory/all');
                const inventoryItems = inventoryRes.data;
                const lowStockCount = inventoryItems.filter(item => (item.quantity || 0) < 20).length;

                const usersRes = await axios.get('http://localhost:8083/customers');
                const userCount = usersRes.data.length;

                setStats({
                    income: totalIncome,
                    orders: allOrders.length,
                    lowStock: lowStockCount,
                    users: userCount
                });

            } catch (error) {
                console.error("Dashboard Data Loading Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const styles = {
        container: {
            padding: '2rem',
            maxWidth: '1400px',
            margin: '0 auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
        },
        header: {
            marginBottom: '2.5rem'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.5px'
        },
        subtitle: {
            fontSize: '0.9375rem',
            color: '#86868b',
            margin: 0,
            fontWeight: 400
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        },
        statCard: {
            background: 'white',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '0.5px solid rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
        },
        statIcon: {
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'white'
        },
        statLabel: {
            fontSize: '0.875rem',
            color: '#86868b',
            margin: '0 0 0.5rem 0',
            fontWeight: 500
        },
        statValue: {
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: 0,
            letterSpacing: '-0.5px'
        },
        sectionTitle: {
            fontSize: '1.375rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '3rem 0 1.5rem 0',
            letterSpacing: '-0.3px'
        },
        accessGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
            justifyItems: 'center'
        },
        accessCard: {
            background: 'white',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '0.5px solid rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '220px'
        },
        accessIcon: {
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #007aff 0%, #0051d5 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)'
        },
        accessTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '0 0 0.375rem 0',
            letterSpacing: '-0.2px'
        },
        accessDesc: {
            fontSize: '0.875rem',
            color: '#86868b',
            margin: 0,
            fontWeight: 400
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Dashboard Overview</h1>
                <p style={styles.subtitle}>
                    📅 {currentDate} · Here is what's happening with your store today
                </p>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #30d158 0%, #28a745 100%)', boxShadow: '0 4px 12px rgba(48, 209, 88, 0.25)' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={styles.statLabel}>Total Income</p>
                        <h2 style={styles.statValue}>
                            Rs. {loading ? '...' : stats.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #007aff 0%, #0051d5 100%)', boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)' }}>
                        <ShoppingBag size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={styles.statLabel}>Total Orders</p>
                        <h2 style={styles.statValue}>
                            {loading ? '...' : stats.orders}
                        </h2>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)', boxShadow: '0 4px 12px rgba(255, 149, 0, 0.25)' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={styles.statLabel}>Low Stock Items</p>
                        <h2 style={styles.statValue}>
                            {loading ? '...' : stats.lowStock}
                        </h2>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #5e5ce6 0%, #4a4acb 100%)', boxShadow: '0 4px 12px rgba(94, 92, 230, 0.25)' }}>
                        <Users size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={styles.statLabel}>Active Users</p>
                        <h2 style={styles.statValue}>
                            {loading ? '...' : stats.users}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <h3 style={styles.sectionTitle}>Quick Access</h3>
            <div style={styles.accessGrid}>
                <Link to="/admin/products" style={styles.accessCard}>
                    <div style={styles.accessIcon}>
                        <Package size={28} />
                    </div>
                    <h4 style={styles.accessTitle}>Products</h4>
                    <p style={styles.accessDesc}>Manage Catalog</p>
                </Link>

                <Link to="/admin/inventory" style={styles.accessCard}>
                    <div style={styles.accessIcon}>
                        <Warehouse size={28} />
                    </div>
                    <h4 style={styles.accessTitle}>Inventory</h4>
                    <p style={styles.accessDesc}>Update Stock</p>
                </Link>

                <Link to="/admin/orders" style={styles.accessCard}>
                    <div style={styles.accessIcon}>
                        <ShoppingBag size={28} />
                    </div>
                    <h4 style={styles.accessTitle}>Orders</h4>
                    <p style={styles.accessDesc}>Process Orders</p>
                </Link>

                <Link to="/admin/users" style={styles.accessCard}>
                    <div style={styles.accessIcon}>
                        <Users size={28} />
                    </div>
                    <h4 style={styles.accessTitle}>Users</h4>
                    <p style={styles.accessDesc}>Customer Details</p>
                </Link>

                <Link to="/admin/payment" style={styles.accessCard}>
                    <div style={styles.accessIcon}>
                        <CreditCard size={28} />
                    </div>
                    <h4 style={styles.accessTitle}>Payments</h4>
                    <p style={styles.accessDesc}>Transactions</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;

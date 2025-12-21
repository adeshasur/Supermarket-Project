import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Warehouse, ShoppingBag, Users, CreditCard, TrendingUp, TrendingDown, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';

function Dashboard() {
    const [stats, setStats] = useState({
        income: 0,
        orders: 0,
        users: 0,
        lowStock: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const ordersRes = await axios.get('http://localhost:8084/api/orders');
                const allOrders = ordersRes.data;

                const successfulOrders = allOrders.filter(order => order.paymentStatus === 'SUCCESS');
                const totalIncome = successfulOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                // Get recent 5 orders
                const recent = allOrders.slice(0, 5);
                setRecentOrders(recent);

                const inventoryRes = await axios.get('http://localhost:8082/api/inventory/all');
                const inventoryItems = inventoryRes.data;
                const lowStockCount = inventoryItems.filter(item => (item.quantity || 0) < 20).length;

                // Get low stock items
                const lowStock = inventoryItems.filter(item => (item.quantity || 0) < 20).slice(0, 5);
                setLowStockItems(lowStock);

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
            minHeight: '100vh',
            background: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '1.5rem',
            maxWidth: '1400px',
            margin: '0 auto'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.25rem'
        },
        statCard: {
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(0, 0, 0, 0.03)'
        },
        contentGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        card: {
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.03)'
        },
        cardTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '0 0 1rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        statIcon: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '1rem'
        },
        statLabel: {
            fontSize: '0.875rem',
            color: '#86868b',
            margin: '0 0 0.375rem 0',
            fontWeight: 500
        },
        statValue: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: 0,
            letterSpacing: '-0.5px'
        },
        trendBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.625rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginTop: '0.5rem'
        },
        listItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.875rem 0',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        },
        quickAccessGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem'
        },
        accessCard: {
            background: 'white',
            borderRadius: '14px',
            padding: '1.25rem',
            textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            textAlign: 'center'
        },
        accessIcon: {
            width: 48,
            height: 48,
            margin: '0 auto 0.75rem',
            background: 'linear-gradient(135deg, #007aff 0%, #0051d5 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.2)'
        },
        accessTitle: {
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '0 0 0.25rem 0'
        },
        accessDesc: {
            fontSize: '0.75rem',
            color: '#86868b',
            margin: 0
        }
    };

    const StatCard = ({ icon, label, value, trend, color, gradientFrom, gradientTo }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                style={{
                    ...styles.statCard,
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 8px 24px rgba(0, 0, 0, 0.1)' : '0 2px 16px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={{
                    ...styles.statIcon,
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                    boxShadow: `0 4px 12px ${color}30`
                }}>
                    {icon}
                </div>
                <p style={styles.statLabel}>{label}</p>
                <h2 style={styles.statValue}>
                    {loading ? '...' : value}
                </h2>
                {trend && (
                    <div style={{
                        ...styles.trendBadge,
                        background: trend > 0 ? '#d1f4e0' : '#ffe5e5',
                        color: trend > 0 ? '#00a86b' : '#ff3b30'
                    }}>
                        {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <StatCard
                    icon={<TrendingUp size={22} />}
                    label="Total Income"
                    value={`Rs. ${stats.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    trend={12}
                    color="#30d158"
                    gradientFrom="#30d158"
                    gradientTo="#28a745"
                />
                <StatCard
                    icon={<ShoppingBag size={22} />}
                    label="Total Orders"
                    value={stats.orders}
                    trend={8}
                    color="#007aff"
                    gradientFrom="#007aff"
                    gradientTo="#0051d5"
                />
                <StatCard
                    icon={<AlertTriangle size={22} />}
                    label="Low Stock Items"
                    value={stats.lowStock}
                    trend={-5}
                    color="#ff9500"
                    gradientFrom="#ff9500"
                    gradientTo="#ff6b00"
                />
                <StatCard
                    icon={<Users size={22} />}
                    label="Active Users"
                    value={stats.users}
                    trend={15}
                    color="#5e5ce6"
                    gradientFrom="#5e5ce6"
                    gradientTo="#4a4acb"
                />
            </div>

            {/* Quick Access */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1d1d1f', margin: '0 0 1rem 0' }}>Quick Access</h3>
            <div style={styles.quickAccessGrid}>
                {[
                    { to: '/admin/products', icon: Package, title: 'Products', desc: 'Manage Catalog' },
                    { to: '/admin/inventory', icon: Warehouse, title: 'Inventory', desc: 'Update Stock' },
                    { to: '/admin/orders', icon: ShoppingBag, title: 'Orders', desc: 'Process Orders' },
                    { to: '/admin/users', icon: Users, title: 'Users', desc: 'Customer Details' },
                    { to: '/admin/payment', icon: CreditCard, title: 'Payments', desc: 'Transactions' }
                ].map((item, idx) => (
                    <Link
                        key={idx}
                        to={item.to}
                        style={styles.accessCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        <div style={styles.accessIcon}>
                            <item.icon size={24} />
                        </div>
                        <h4 style={styles.accessTitle}>{item.title}</h4>
                        <p style={styles.accessDesc}>{item.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

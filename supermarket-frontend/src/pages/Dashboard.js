import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Warehouse, ShoppingBag, Users, CreditCard, TrendingUp, TrendingDown, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

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
    const [chartData, setChartData] = useState({ orders: [] });
    const [topProducts, setTopProducts] = useState([]);

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

                // Process data for charts
                processChartData(allOrders);

                // Process top products
                await processTopProducts(allOrders);

            } catch (error) {
                console.error("Dashboard Data Loading Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const processTopProducts = async (orders) => {
        try {
            // Count product sales
            const productSales = {};

            orders.forEach(order => {
                if (order.orderItems && Array.isArray(order.orderItems)) {
                    order.orderItems.forEach(item => {
                        const productId = item.productId;
                        if (productId) {
                            if (!productSales[productId]) {
                                productSales[productId] = 0;
                            }
                            productSales[productId] += item.quantity || 1;
                        }
                    });
                }
            });

            // Sort by sales count and get top 6
            const topProductIds = Object.entries(productSales)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([id, count]) => ({ id: parseInt(id), soldCount: count }));

            // Fetch product details
            const productsRes = await axios.get('http://localhost:8081/api/products');
            const allProducts = productsRes.data;

            const topProductsWithDetails = topProductIds.map(({ id, soldCount }) => {
                const product = allProducts.find(p => p.id === id);
                return product ? { ...product, soldCount } : null;
            }).filter(p => p !== null);

            setTopProducts(topProductsWithDetails);
        } catch (error) {
            console.error("Error processing top products:", error);
            setTopProducts([]);
        }
    };

    const processChartData = (orders) => {
        // Get last 30 days
        const today = new Date();
        const last30Days = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            last30Days.push(dateStr);
        }

        // Group orders by date
        const orderCountByDate = {};

        last30Days.forEach(date => {
            orderCountByDate[date] = 0;
        });

        orders.forEach(order => {
            if (order.orderDate) {
                const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
                if (orderCountByDate.hasOwnProperty(orderDate)) {
                    orderCountByDate[orderDate]++;
                }
            }
        });

        const ordersData = last30Days.map(date => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            orders: orderCountByDate[date]
        }));

        setChartData({ orders: ordersData });
    };

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
        chartsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        chartCard: {
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.03)'
        },
        chartTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1d1d1f',
            margin: '0 0 1.5rem 0'
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

    const CustomTooltip = ({ active, payload, label, type }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
                }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.8125rem', color: '#86868b', fontWeight: 500 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1d1d1f' }}>
                        {type === 'revenue' ? `Rs. ${payload[0].value.toLocaleString()}` : `${payload[0].value} orders`}
                    </p>
                </div>
            );
        }
        return null;
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

            {/* Analytics Charts */}
            <div style={styles.chartsGrid}>
                {/* Top Selling Products */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>Top Selling Products</h3>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#86868b' }}>Loading...</p>
                    ) : topProducts.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#86868b' }}>No product data available</p>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: '1rem'
                        }}>
                            {topProducts.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '0.875rem',
                                        textAlign: 'center',
                                        transition: 'transform 0.2s',
                                        border: '1px solid rgba(0,0,0,0.04)',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/100'}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '90px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            marginBottom: '0.625rem',
                                            background: 'white'
                                        }}
                                    />
                                    <h4 style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        color: '#1d1d1f',
                                        margin: '0 0 0.25rem 0',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {product.name}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#30d158',
                                        fontWeight: 600,
                                        margin: '0 0 0.375rem 0'
                                    }}>
                                        Rs. {product.price}
                                    </p>
                                    <div style={{
                                        background: 'white',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '6px',
                                        fontSize: '0.6875rem',
                                        color: '#007aff',
                                        fontWeight: 600
                                    }}>
                                        {product.soldCount} sold
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Volume Chart */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>Order Volume (Last 30 Days)</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData.orders}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#86868b', fontSize: 11 }}
                                tickLine={{ stroke: '#e0e0e0' }}
                            />
                            <YAxis
                                tick={{ fill: '#86868b', fontSize: 11 }}
                                tickLine={{ stroke: '#e0e0e0' }}
                            />
                            <Tooltip content={<CustomTooltip type="orders" />} />
                            <Bar
                                dataKey="orders"
                                fill="#007aff"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


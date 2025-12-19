import React, { createContext, useState, useContext, useCallback } from 'react';

// Create Notification Context
export const NotificationContext = createContext();

// Custom hook to use notifications
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Add a new notification
    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        const newNotification = {
            id,
            message,
            type, // 'success', 'error', 'warning', 'info'
            timestamp: new Date()
        };

        setNotifications((prev) => [...prev, newNotification]);

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 5000);

        return id;
    }, []);

    // Remove a notification
    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    // Clear all notifications
    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    // Notification display component styles
    const getNotificationStyle = (type) => {
        const baseStyle = {
            padding: '15px 20px',
            marginBottom: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animation: 'slideIn 0.3s ease-out',
            color: 'white',
            fontWeight: '500'
        };

        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };

        return {
            ...baseStyle,
            background: colors[type] || colors.info
        };
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                clearNotifications
            }}
        >
            {children}

            {/* Notification Display Container */}
            {notifications.length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 9999,
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            style={getNotificationStyle(notif.type)}
                        >
                            <span>{notif.message}</span>
                            <button
                                onClick={() => removeNotification(notif.id)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                    fontWeight: 'bold'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
            </style>
        </NotificationContext.Provider>
    );
};

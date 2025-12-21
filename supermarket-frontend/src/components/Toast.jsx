import React, { useEffect } from 'react';
import '../Styles/Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '✓';
        }
    };

    return (
        <div className={`toast-container toast-${type}`}>
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-message">{message}</div>
        </div>
    );
};

export default Toast;

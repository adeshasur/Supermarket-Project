package com.supermarket.payment_service.data.entity;

public class Notification {
    private String type;  // "payment", "order", "inventory"
    private String message;

    public Notification() {}

    public Notification(String type, String message) {
        this.type = type;
        this.message = message;
    }

    // Getters and Setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}

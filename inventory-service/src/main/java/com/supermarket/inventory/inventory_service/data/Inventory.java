package com.supermarket.inventory.inventory_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Internal Database ID

    // I added 'unique = true' here.
    // This ensures you don't accidentally create two records for the same Product ID.
    @Column(unique = true)
    private int productId;

    private int quantity;

    // Default Constructor
    public Inventory() {
    }

    // Added a Helper Constructor (Useful for testing or adding new items quickly)
    public Inventory(int productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    // --- Getters and Setters ---

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
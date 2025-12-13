package com.supermarket.inventory.inventory_service.service;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 🌟 1. IMPORT ADDED 🌟

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Get all inventory
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // Get inventory by productId
    public Inventory getInventoryByProductId(int productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for productId: " + productId));
    }

    // Add new inventory
    public Inventory addInventory(Inventory inventory) {
        if (inventory.getQuantity() < 0) inventory.setQuantity(0);
        return inventoryRepository.save(inventory);
    }

    // Manual stock update (sets the quantity)
    public Inventory updateInventory(Inventory inventoryItem) {
        Inventory inventory = getInventoryByProductId(inventoryItem.getProductId());
        int newQuantity = inventoryItem.getQuantity();
        if (newQuantity < 0) newQuantity = 0; // prevent negative
        inventory.setQuantity(newQuantity);
        return inventoryRepository.save(inventory);
    }

    // Reduce stock after order (subtracts from current quantity)
    // 🌟 2. FIX: Added @Transactional to make the operation atomic and safe 🌟
    @Transactional
    public Inventory reduceStock(int productId, int quantityToReduce) {
        Inventory inventory = getInventoryByProductId(productId);
        int currentQuantity = inventory.getQuantity();

        // 🌟 3. CRITICAL FIX: Explicit check before reduction 🌟
        if (currentQuantity < quantityToReduce) {
            // Throwing a RuntimeException triggers a transaction rollback.
            // This prevents negative stock from being committed if multiple requests hit simultaneously.
            throw new RuntimeException(
                    "Insufficient stock for productId: " + productId +
                            ". Available: " + currentQuantity + ", Requested: " + quantityToReduce
            );
        }

        int newQuantity = currentQuantity - quantityToReduce;
        // The check above makes the 'if (newQuantity < 0) newQuantity = 0' logic unnecessary
        // and safely enforced by the transaction rollback.

        inventory.setQuantity(newQuantity);
        return inventoryRepository.save(inventory);
    }
}
package com.supermarket.inventory.inventory_service.service;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // 1. Get All
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // 2. Search by Product ID
    public Inventory getInventoryByProductId(int productId) {
        // If not found, we return null (or you could throw an error)
        return inventoryRepository.findByProductId(productId).orElse(null);
    }

    // 3. Insert (Add New Stock)
    public Inventory addInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // 4. Update (Change Stock)
    public Inventory updateInventory(Inventory inventoryItem) {
        // First, find the existing item by Product ID
        Optional<Inventory> existingInventory = inventoryRepository.findByProductId(inventoryItem.getProductId());

        if (existingInventory.isPresent()) {
            // If it exists, update the quantity of the EXISTING database row
            Inventory inventory = existingInventory.get();
            inventory.setQuantity(inventoryItem.getQuantity());
            return inventoryRepository.save(inventory);
        } else {
            // If it doesn't exist, just create a new one (Insert)
            return inventoryRepository.save(inventoryItem);
        }
    }
}
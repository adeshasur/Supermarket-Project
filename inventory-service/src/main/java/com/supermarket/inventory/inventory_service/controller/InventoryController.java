package com.supermarket.inventory.inventory_service.controller;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // 1. ADD: Add new Inventory Item
    // Usage: POST http://localhost:8082/api/inventory/add
    @PostMapping("/add")
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return inventoryService.addInventory(inventory);
    }

    // 2. GET ALL: View all inventory
    // Usage: GET http://localhost:8082/api/inventory/all
    @GetMapping("/all")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // 3. SEARCH: Find stock by Product ID
    // Usage: GET http://localhost:8082/api/inventory/search/{productId}
    @GetMapping("/search/{productId}")
    public Inventory searchInventoryByProductId(@PathVariable int productId) {
        return inventoryService.getInventoryByProductId(productId);
    }

    // 4. UPDATE: Update Stock Quantity
    // Usage: PUT http://localhost:8082/api/inventory/update
    @PutMapping("/update")
    public Inventory updateInventory(@RequestBody Inventory inventoryItem) {
        return inventoryService.updateInventory(inventoryItem);
    }
}
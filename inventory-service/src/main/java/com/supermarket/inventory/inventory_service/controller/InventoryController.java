package com.supermarket.inventory.inventory_service.controller;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allows React to connect
@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // 1. Get All Inventory Items
    @GetMapping("/all")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // 2. Search Product by ID
    // Usage in Postman/Browser: http://localhost:8080/inventory/search/101
    @GetMapping("/search/{productId}")
    public Inventory getInventoryByProductId(@PathVariable int productId) {
        return inventoryService.getInventoryByProductId(productId);
    }

    // 3. Update Product
    // Usage: Send a PUT request to http://localhost:8080/inventory/update
    @PutMapping("/update")
    public Inventory updateInventory(@RequestBody Inventory inventoryItem) {
        return inventoryService.updateInventory(inventoryItem);
    }
}
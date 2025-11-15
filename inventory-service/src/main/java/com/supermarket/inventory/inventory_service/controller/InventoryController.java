package com.supermarket.inventory.inventory_service.controller;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List; 

// --- ADD THESE TWO LINES ---
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // This allows your React app to connect
// --- END OF ADDITION ---

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/all")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/{productId}")
    public Inventory getInventoryByProductId(@PathVariable int productId) {
        return inventoryService.getInventoryByProductId(productId);
    }

    @PostMapping
    public Inventory updateInventory(@RequestBody Inventory inventoryItem) {
        return inventoryService.updateInventory(inventoryItem);
    }
}
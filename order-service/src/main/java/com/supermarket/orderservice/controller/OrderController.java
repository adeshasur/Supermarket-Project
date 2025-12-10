package com.supermarket.orderservice.controller;

import com.supermarket.orderservice.model.Order;
import com.supermarket.orderservice.model.OrderItem;
import com.supermarket.orderservice.service.OrderService;
import org.springframework.transaction.annotation.Transactional; // ✅ Import කරන්න
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) { this.orderService = orderService; }


    @GetMapping
    @Transactional
    public List<Order> getAllOrders() { return orderService.getAllOrders(); }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) { return orderService.getOrderById(id); }

    @PostMapping
    public Order createOrder(@RequestBody Order order) { return orderService.createOrder(order); }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) { orderService.deleteOrder(id); }

    @GetMapping("/search")
    public List<Order> getOrdersByCustomerId(@RequestParam Long customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }
    @PostMapping("/{orderId}/items")
    public Order addItemToOrder(@PathVariable Long orderId, @RequestBody OrderItem item) {
        return orderService.addItemToOrder(orderId, item);
    }
    @DeleteMapping("/{orderId}/items/{itemId}")
    public Order deleteItemFromOrder(@PathVariable Long orderId, @PathVariable Long itemId) {
        return orderService.deleteItemFromOrder(orderId, itemId);
    }


}
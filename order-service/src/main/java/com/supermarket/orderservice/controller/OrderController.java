package com.supermarket.orderservice.controller;

import com.supermarket.orderservice.model.Order;
import com.supermarket.orderservice.model.OrderItem;
import com.supermarket.orderservice.service.OrderService;
import org.springframework.transaction.annotation.Transactional;
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

    // ✅ Update order status endpoint
    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestBody String status) {
        return orderService.updateOrderStatus(id, status);
    }

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

    // ✅ NEW: View order details including customer info (frontend will fetch customer separately)
    @GetMapping("/{id}/details")
    public Order getOrderDetails(@PathVariable Long id) {
        // Returns the order object; frontend can use order.customerId to fetch customer info
        return orderService.getOrderById(id);
    }

}

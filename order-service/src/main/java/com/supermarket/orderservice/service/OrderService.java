package com.supermarket.orderservice.service;

import com.supermarket.orderservice.model.Order;
import com.supermarket.orderservice.model.OrderItem;
import com.supermarket.orderservice.repository.OrderItemRepository;
import com.supermarket.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    // ✅ Constructor injection
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }


    public Order createOrder(Order order) {
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setOrder(order);
            }
        }

        order.calculateTotal();

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    public Order addItemToOrder(Long orderId, OrderItem item) {

        // Load order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Link item to order
        item.setOrder(order);

        // Save item
        orderItemRepository.save(item);

        // Recalculate total
        order.calculateTotal(); // Use helper method if available in Entity, or logic below

        // Manual calculation fallback if calculateTotal() logic isn't perfect in entity for updates
        double newTotal = order.getOrderItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
        order.setTotalAmount(newTotal);

        return orderRepository.save(order);
    }

    public Order deleteItemFromOrder(Long orderId, Long itemId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.getOrderItems().removeIf(item -> item.getId().equals(itemId));

        // Recalculate total
        double newTotal = order.getOrderItems()
                .stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        order.setTotalAmount(newTotal);

        return orderRepository.save(order);
    }
}
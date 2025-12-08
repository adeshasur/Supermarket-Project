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

    // ✅ Constructor injection (REQUIRED)
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    // ===========================
    //  BASIC ORDER OPERATIONS
    // ===========================
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order createOrder(Order order) {
        if (order.getTotalAmount() == null) {
            order.setTotalAmount(0.0);
        }
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    // ===========================
    //  ADD ITEM TO ORDER
    // ===========================
    public Order addItemToOrder(Long orderId, OrderItem item) {

        // Load order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Link item to order
        item.setOrder(order);

        // Save item
        orderItemRepository.save(item);

        // Recalculate total
        double itemTotal = item.getPrice() * item.getQuantity();
        order.setTotalAmount(order.getTotalAmount() + itemTotal);

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

package com.supermarket.orderservice.service;

import com.supermarket.orderservice.model.Order;
import com.supermarket.orderservice.model.OrderItem;
import com.supermarket.orderservice.repository.OrderItemRepository;
import com.supermarket.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@Transactional
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderItem> getItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrder_Id(orderId);
    }

    public OrderItem addItemToOrder(Long orderId, OrderItem item) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        item.setOrder(order);
        order.getOrderItems().add(item);
        order.calculateTotal();
        orderRepository.save(order);
        return item;
    }

    public void deleteItem(Long itemId) {
        OrderItem item = orderItemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        Order order = item.getOrder();
        order.getOrderItems().remove(item);
        order.calculateTotal();
        orderRepository.save(order);
        orderItemRepository.delete(item);
    }
}

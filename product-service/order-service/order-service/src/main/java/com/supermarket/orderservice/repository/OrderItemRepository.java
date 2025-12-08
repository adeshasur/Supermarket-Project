package com.supermarket.orderservice.repository;

import com.supermarket.orderservice.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Get all items for a specific order
    List<OrderItem> findByOrder_Id(Long orderId);
}

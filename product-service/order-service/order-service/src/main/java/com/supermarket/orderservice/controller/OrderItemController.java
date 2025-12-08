package com.supermarket.orderservice.controller;

import com.supermarket.orderservice.model.OrderItem;
import com.supermarket.orderservice.service.OrderItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders/{orderId}/items")
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) { this.orderItemService = orderItemService; }

    @GetMapping
    public List<OrderItem> getItems(@PathVariable Long orderId) {
        return orderItemService.getItemsByOrderId(orderId);
    }

//    @PostMapping
//    public OrderItem addItem(@PathVariable Long orderId, @RequestBody OrderItem item) {
//        return orderItemService.addItemToOrder(orderId, item);
//    }

//    @DeleteMapping("/{itemId}")
//    public void deleteItem(@PathVariable Long itemId) {
//        orderItemService.deleteItem(itemId);
//    }
}

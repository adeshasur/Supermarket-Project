package com.supermarket.payment_service.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer orderId;
    private Double amount;
    private String paymentStatus;
    private String transactionId;
    private LocalDateTime paymentDate;
    @Column(length = 4)
    private String last4;
}

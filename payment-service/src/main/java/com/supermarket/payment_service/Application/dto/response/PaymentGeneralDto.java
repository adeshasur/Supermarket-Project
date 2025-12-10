package com.supermarket.payment_service.Application.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class PaymentGeneralDto {


    private Integer id;
    private Integer orderId;
    private Double amount;
    private String paymentStatus;
    private String transactionId;
    private LocalDateTime paymentDate;
    private String last4;
}

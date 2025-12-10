package com.supermarket.payment_service.controller;

import com.supermarket.payment_service.Application.dto.request.CreatePaymentDto;
import com.supermarket.payment_service.Application.dto.response.PaymentGeneralDto;
import com.supermarket.payment_service.data.entity.Payment;
import com.supermarket.payment_service.data.service.PaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")   // <-- ONLY THIS LINE CHANGED
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@RequestBody CreatePaymentDto createpaymentDto) {
        return paymentService.addPayment(createpaymentDto);
    }

    @GetMapping("/get")
    public ResponseEntity<PaymentGeneralDto> getPaymentById(@RequestParam Integer id) {
        return paymentService.getPayment(id);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Payment> deletePaymentById(@RequestParam Integer id) {
        return paymentService.deletePaymentById(id);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}

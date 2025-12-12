package com.supermarket.payment_service.controller;

import com.supermarket.payment_service.dto.request.CreatePaymentDto;
import com.supermarket.payment_service.data.entity.Payment;
import com.supermarket.payment_service.service.PaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ✅ Add a new payment
    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@RequestBody CreatePaymentDto createPaymentDto) {
        return paymentService.addPayment(createPaymentDto);
    }

    // ✅ Get a single payment by ID
    @GetMapping("/get")
    public ResponseEntity<Payment> getPaymentById(@RequestParam Integer id) {
        return paymentService.getPaymentById(id);
    }

    // ✅ Get all payments
    @GetMapping("/getAll")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // ✅ Delete a payment by ID
    @DeleteMapping("/delete")
    public ResponseEntity<Payment> deletePaymentById(@RequestParam Integer id) {
        return paymentService.deletePaymentById(id);
    }

    // Optional test endpoint
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}

package com.supermarket.payment_service.service;

import com.supermarket.payment_service.data.entity.Payment;
import com.supermarket.payment_service.dto.request.CreatePaymentDto;
import com.supermarket.payment_service.repository.PaymentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ✅ Add a new payment
    public ResponseEntity<Payment> addPayment(CreatePaymentDto createPaymentDto) {
        Payment payment = new Payment();
        payment.setOrderId(createPaymentDto.getOrderId());
        payment.setAmount(createPaymentDto.getAmount());
        payment.setPaymentStatus(createPaymentDto.getPaymentStatus());
        payment.setTransactionId(createPaymentDto.getTransactionId());
        payment.setPaymentDate(createPaymentDto.getPaymentDate() != null 
            ? createPaymentDto.getPaymentDate() 
            : LocalDateTime.now());
        payment.setLast4(createPaymentDto.getLast4());

        Payment savedPayment = paymentRepository.save(payment);
        return new ResponseEntity<>(savedPayment, HttpStatus.CREATED);
    }

    // ✅ Get a single payment by ID
    public ResponseEntity<Payment> getPaymentById(Integer id) {
        return paymentRepository.findById(id)
                .map(payment -> new ResponseEntity<>(payment, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // ✅ Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // ✅ Delete a payment by ID
    public ResponseEntity<Payment> deletePaymentById(Integer id) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    paymentRepository.delete(payment);
                    return new ResponseEntity<>(payment, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}

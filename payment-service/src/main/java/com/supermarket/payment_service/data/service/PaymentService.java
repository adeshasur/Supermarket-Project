package com.supermarket.payment_service.data.service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import com.supermarket.payment_service.Application.dto.request.CreatePaymentDto;
import com.supermarket.payment_service.Application.dto.response.PaymentGeneralDto;
import com.supermarket.payment_service.data.entity.Payment;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.supermarket.payment_service.repository.PaymentRepository;

@Service
@AllArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public ResponseEntity<Payment> addPayment(CreatePaymentDto createPaymentDto) {
        Payment payment = new Payment();

        payment.setOrderId(createPaymentDto.getOrderId());
        payment.setAmount(createPaymentDto.getAmount());
        payment.setPaymentStatus(createPaymentDto.getPaymentStatus());
        payment.setTransactionId(UUID.randomUUID().toString()); // auto-generate
        payment.setPaymentDate(LocalDateTime.now());
        payment.setLast4(createPaymentDto.getLast4());

        paymentRepository.save(payment);

        return ResponseEntity.ok(payment);

    }

    public ResponseEntity<PaymentGeneralDto> getPayment(Integer id) {
        PaymentGeneralDto paymentGeneralDto = new PaymentGeneralDto();
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            paymentGeneralDto.setId(payment.getId());
            paymentGeneralDto.setOrderId(payment.getOrderId());
            paymentGeneralDto.setAmount(payment.getAmount());
            paymentGeneralDto.setPaymentStatus(payment.getPaymentStatus());
            paymentGeneralDto.setTransactionId(payment.getTransactionId());
            return ResponseEntity.ok(paymentGeneralDto);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    public ResponseEntity<Payment> deletePaymentById(Integer id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            paymentRepository.delete(payment);
            return ResponseEntity.ok(payment);
        }else{
            return ResponseEntity.notFound().build();
        }
    }


}
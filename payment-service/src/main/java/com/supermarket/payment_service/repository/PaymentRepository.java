package com.supermarket.payment_service.repository;

import com.supermarket.payment_service.data.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}

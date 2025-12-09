package com.supermarket.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    // Exact match by email
    Customer findByEmail(String email);

    // Exact match by name
    List<Customer> findByName(String name);

    // Partial search for realism (name contains keyword)
    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE %:keyword%")
    List<Customer> searchByNameContainsIgnoreCase(String keyword);

    // Partial search for email
    @Query("SELECT c FROM Customer c WHERE LOWER(c.email) LIKE %:keyword%")
    List<Customer> searchByEmailContainsIgnoreCase(String keyword);
}

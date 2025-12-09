package com.supermarket.user_service.service;

import com.supermarket.user_service.data.Customer;
import com.supermarket.user_service.data.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    // Get all customers
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    // Get customer by ID
    public Customer getCustomerById(int cid) {
        Optional<Customer> customer = repository.findById(cid);
        return customer.orElse(null);
    }

    // Delete customer by ID
    public void deleteCustomerById(int cid) {
        repository.deleteById(cid);
    }

    // Search customer by name
    public List<Customer> getCustomerByName(String name) {
        return repository.findByName(name);
    }
}

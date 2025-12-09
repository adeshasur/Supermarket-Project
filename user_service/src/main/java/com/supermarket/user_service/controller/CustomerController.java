package com.supermarket.user_service.controller;

import com.supermarket.user_service.data.Customer;
import com.supermarket.user_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService service;

    // GET all customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    // GET customer by ID
    @GetMapping("/{cid}")
    public Customer getCustomerById(@PathVariable int cid) {
        return service.getCustomerById(cid);
    }

    // DELETE customer by ID
    @DeleteMapping("/{cid}")
    public void deleteCustomer(@PathVariable int cid) {
        service.deleteCustomerById(cid);
    }

    // SEARCH customer by name
    @GetMapping("/searchByName")
    public List<Customer> getCustomerByName(@RequestParam String name) {
        return service.getCustomerByName(name);
    }
}

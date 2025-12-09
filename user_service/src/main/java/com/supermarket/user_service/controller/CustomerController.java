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

    // UPDATE customer info
    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer) {
        return service.updateCustomer(customer);
    }

    // SEARCH customer by name
    @GetMapping(params = {"name"})
    public List<Customer> getCustomerByName(@RequestParam String name) {
        return service.getCustomerByName(name);
    }

    // SEARCH customer by email
    @GetMapping(params = {"email"})
    public Customer getCustomerByEmail(@RequestParam String email) {
        return service.getCustomerByEmail(email);
    }
}

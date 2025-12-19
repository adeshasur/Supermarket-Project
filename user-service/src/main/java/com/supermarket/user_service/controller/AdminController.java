package com.supermarket.user_service.controller;

import com.supermarket.user_service.data.Admin;
import com.supermarket.user_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admins")

public class AdminController {

    @Autowired
    private AdminService service;

    // Admin login
    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody Admin admin) {
        return service.loginAdmin(admin.getEmail(), admin.getPassword());
    }

    // Register admin
    @PostMapping
    public Admin registerAdmin(@RequestBody Admin admin) {
        return service.saveAdmin(admin);
    }

    // Get all admins
    @GetMapping
    public List<Admin> getAllAdmins() {
        return service.getAllAdmins();
    }

    // Get admin by ID
    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable int id) {
        return service.getAdminById(id);
    }

    // Update admin
    @PutMapping
    public Admin updateAdmin(@RequestBody Admin admin) {
        return service.updateAdmin(admin);
    }

    // Delete admin
    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable int id) {
        service.deleteAdminById(id);
    }

    // Search admin by email (exact)
    @GetMapping(params = "email")
    public Admin getAdminByEmail(@RequestParam String email) {
        return service.getAdminByEmail(email);
    }

    // Search admin by name (exact)
    @GetMapping(path = "/searchByName", params = "name")
    public List<Admin> getAdminByName(@RequestParam String name) {
        return service.getAdminByName(name);
    }

    // Partial search by name
    @GetMapping("/searchByNamePartial")
    public List<Admin> searchAdminByName(@RequestParam String keyword) {
        return service.searchAdminByName(keyword);
    }

    // Partial search by email
    @GetMapping("/searchByEmailPartial")
    public List<Admin> searchAdminByEmail(@RequestParam String keyword) {
        return service.searchAdminByEmail(keyword);
    }
}

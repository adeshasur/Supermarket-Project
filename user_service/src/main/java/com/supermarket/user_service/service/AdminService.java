package com.supermarket.user_service.service;

import com.supermarket.user_service.data.AdminRepository;
import com.supermarket.user_service.data.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository aRepo;

    // Admin login
    public Admin loginAdmin(String email, String password) {
        Admin admin = aRepo.findAdminByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin; // login success
        }
        return null; // login failed
    }

    // Register new admin
    public Admin saveAdmin(Admin admin){
        return aRepo.save(admin);
    }

    // Get all admins
    public List<Admin> getAllAdmins(){
        return aRepo.findAll();
    }

    // Get admin by ID
    public Admin getAdminById(int id) {
        Optional<Admin> a = aRepo.findById(id);
        return a.orElse(null);
    }

    // Update admin
    public Admin updateAdmin(Admin admin){
        return aRepo.save(admin);
    }

    // Delete admin
    public void deleteAdminById(int id) {
        aRepo.deleteById(id);
    }

    // Get admin by exact email
    public Admin getAdminByEmail(String email) {
        return aRepo.findAdminByEmail(email);
    }

    // Get admins by exact name
    public List<Admin> getAdminByName(String name) {
        return aRepo.findByName(name);
    }

    // Partial search by name
    public List<Admin> searchAdminByName(String keyword) {
        return aRepo.searchByNameContainsIgnoreCase(keyword.toLowerCase());
    }

    // Partial search by email
    public List<Admin> searchAdminByEmail(String keyword) {
        return aRepo.searchByEmailContainsIgnoreCase(keyword.toLowerCase());
    }
}

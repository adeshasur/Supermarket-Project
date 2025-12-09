package com.supermarket.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Find by exact email
    Admin findAdminByEmail(String email);

    // Find by exact name
    List<Admin> findByName(String name);

    // Partial search by name
    @Query("SELECT a FROM Admin a WHERE LOWER(a.name) LIKE %:keyword%")
    List<Admin> searchByNameContainsIgnoreCase(String keyword);

    // Partial search by email
    @Query("SELECT a FROM Admin a WHERE LOWER(a.email) LIKE %:keyword%")
    List<Admin> searchByEmailContainsIgnoreCase(String keyword);
}

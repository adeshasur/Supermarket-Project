package com.supermarket.productservice.product.repo;

import com.supermarket.productservice.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
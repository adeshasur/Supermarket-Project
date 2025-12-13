package com.supermarket.productservice.product.web;

import com.supermarket.productservice.product.model.Product;
import com.supermarket.productservice.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // 1. Get All Products
    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts(); // service method එක check කරන්න
    }

    // 2. Get Product By ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getOne(@PathVariable Long id) {
        Product p = service.getProductById(id);
        return (p == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
    }

    // 3. Create Product
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody Product p) {
        Product saved = service.createProduct(p);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId())).body(saved);
    }

    // 4. Update Product
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product p) {
        if (service.getProductById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.updateProduct(id, p));
    }

    // 5. Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Delete method එක boolean return කරනවා නම්:
        // return service.deleteProduct(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();

        // නැත්නම් void නම්:
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
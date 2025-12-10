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

    @GetMapping
    public List<Product> getAll() {
        return service.all();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getOne(@PathVariable Long id) {
        Product p = service.one(id);
        return (p == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody Product p) {
        Product saved = service.create(p);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product p) {
        if (service.one(id) == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(service.update(id, p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
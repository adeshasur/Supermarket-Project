package com.supermarket.productservice.product.service;

import com.supermarket.productservice.product.model.Product;
import com.supermarket.productservice.product.repo.ProductRepository; // ✅ ඔයාගේ import එක තිබ්බ විදිහටම තිබ්බා (repo)
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product createProduct(Product p) {
        return repo.save(p);
    }

    public Product updateProduct(Long id, Product p) {
        if (repo.existsById(id)) {
            p.setId(id);
            return repo.save(p);
        }
        return null;
    }

    // ✅ 5. Delete Product (Controller එක ඉල්ලන්නේ මේ නම)
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }
}
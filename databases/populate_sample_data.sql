-- ===========================================
-- CLEAN SAMPLE DATA FOR SUPERMARKET DATABASES
-- ===========================================
-- Run this script to populate all databases with fresh sample data
-- Created: 2025-12-22

-- ===========================================
-- 1. PRODUCTS DATABASE
-- ===========================================

USE supermarket_products_db;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE product;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert 50 diverse products
INSERT INTO product (product_id, name, description, price, category, image_url, created_at, updated_at) VALUES
-- Vegetables (1-10)
(1, 'Fresh Tomatoes', 'Ripe red tomatoes from local farms', 280.00, 'Vegetables', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', NOW(), NOW()),
(2, 'Green Beans', 'Fresh tender green beans', 320.00, 'Vegetables', 'https://images.unsplash.com/photo-1607940890219-ec2e9fa0f26e?w=400', NOW(), NOW()),
(3, 'Carrots', 'Sweet crunchy carrots', 180.00, 'Vegetables', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', NOW(), NOW()),
(4, 'Potatoes', 'Farm-fresh potatoes', 150.00, 'Vegetables', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', NOW(), NOW()),
(5, 'Onions', 'Premium red onions', 200.00, 'Vegetables', 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400', NOW(), NOW()),
(6, 'Cabbage', 'Fresh green cabbage', 120.00, 'Vegetables', 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400', NOW(), NOW()),
(7, 'Bell Peppers', 'Colorful bell peppers', 450.00, 'Vegetables', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', NOW(), NOW()),
(8, 'Broccoli', 'Organic broccoli crowns', 380.00, 'Vegetables', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400', NOW(), NOW()),
(9, 'Spinach', 'Fresh leafy spinach', 220.00, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', NOW(), NOW()),
(10, 'Cucumber', 'Cool crisp cucumbers', 160.00, 'Vegetables', 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400', NOW(), NOW()),

-- Fruits (11-20)
(11, 'Bananas', 'Fresh yellow bananas', 250.00, 'Fruits', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', NOW(), NOW()),
(12, 'Apples', 'Crispy red apples', 480.00, 'Fruits', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', NOW(), NOW()),
(13, 'Oranges', 'Juicy sweet oranges', 320.00, 'Fruits', 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400', NOW(), NOW()),
(14, 'Mangoes', 'Sweet tropical mangoes', 550.00, 'Fruits', 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400', NOW(), NOW()),
(15, 'Grapes', 'Fresh seedless grapes', 680.00, 'Fruits', 'https://images.unsplash.com/photo-1601275002606-0c01d36a3975?w=400', NOW(), NOW()),
(16, 'Watermelon', 'Sweet red watermelon', 180.00, 'Fruits', 'https://images.unsplash.com/photo-1587049352846-4a222e784660?w=400', NOW(), NOW()),
(17, 'Pineapple', 'Tropical pineapple', 420.00, 'Fruits', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', NOW(), NOW()),
(18, 'Strawberries', 'Fresh sweet strawberries', 850.00, 'Fruits', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', NOW(), NOW()),
(19, 'Papaya', 'Ripe yellow papaya', 280.00, 'Fruits', 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400', NOW(), NOW()),
(20, 'Pomegranate', 'Fresh pomegranate', 520.00, 'Fruits', 'https://images.unsplash.com/photo-1607741619254-29e167d8ea4c?w=400', NOW(), NOW()),

-- Dairy (21-28)
(21, 'Fresh Milk', 'Full cream fresh milk 1L', 320.00, 'Dairy', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', NOW(), NOW()),
(22, 'Cheddar Cheese', 'Aged cheddar cheese', 780.00, 'Dairy', 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400', NOW(), NOW()),
(23, 'Greek Yogurt', 'Creamy Greek yogurt', 450.00, 'Dairy', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', NOW(), NOW()),
(24, 'Butter', 'Premium salted butter', 580.00, 'Dairy', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', NOW(), NOW()),
(25, 'Cream Cheese', 'Smooth cream cheese', 520.00, 'Dairy', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400', NOW(), NOW()),
(26, 'Ice Cream', 'Vanilla ice cream 500ml', 680.00, 'Dairy', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', NOW(), NOW()),
(27, 'Mozzarella', 'Fresh mozzarella cheese', 920.00, 'Dairy', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', NOW(), NOW()),
(28, 'Whipping Cream', 'Heavy whipping cream', 420.00, 'Dairy', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', NOW(), NOW()),

-- Bakery (29-36)
(29, 'White Bread', 'Fresh white bread loaf', 180.00, 'Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', NOW(), NOW()),
(30, 'Whole Wheat Bread', 'Healthy whole wheat bread', 220.00, 'Bakery', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400', NOW(), NOW()),
(31, 'Croissants', 'Buttery croissants pack of 4', 380.00, 'Bakery', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', NOW(), NOW()),
(32, 'Bagels', 'Fresh bagels pack of 6', 420.00, 'Bakery', 'https://images.unsplash.com/photo-1551106652-a5bcf4b29e84?w=400', NOW(), NOW()),
(33, 'Cookies', 'Chocolate chip cookies', 320.00, 'Bakery', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', NOW(), NOW()),
(34, 'Donuts', 'Glazed donuts pack of 6', 480.00, 'Bakery', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', NOW(), NOW()),
(35, 'Muffins', 'Blueberry muffins pack of 4', 520.00, 'Bakery', 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', NOW(), NOW()),
(36, 'Cinnamon Rolls', 'Sweet cinnamon rolls', 450.00, 'Bakery', 'https://images.unsplash.com/photo-1509365390234-4f5literally?w=400', NOW(), NOW()),

-- Beverages (37-44)
(37, 'Orange Juice', 'Fresh orange juice 1L', 480.00, 'Beverages', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', NOW(), NOW()),
(38, 'Apple Juice', 'Pure apple juice 1L', 450.00, 'Beverages', 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400', NOW(), NOW()),
(39, 'Green Tea', 'Premium green tea bags', 520.00, 'Beverages', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', NOW(), NOW()),
(40, 'Coffee Beans', 'Arabica coffee beans 250g', 880.00, 'Beverages', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', NOW(), NOW()),
(41, 'Mineral Water', 'Natural mineral water 1.5L', 120.00, 'Beverages', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', NOW(), NOW()),
(42, 'Energy Drink', 'Sports energy drink', 280.00, 'Beverages', 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400', NOW(), NOW()),
(43, 'Coconut Water', 'Natural coconut water', 320.00, 'Beverages', 'https://images.unsplash.com/photo-1585032226651-759b368d7d1f?w=400', NOW(), NOW()),
(44, 'Sparkling Water', 'Carbonated sparkling water', 180.00, 'Beverages', 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400', NOW(), NOW()),

-- Snacks (45-50)
(45, 'Potato Chips', 'Crispy potato chips', 220.00, 'Snacks', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', NOW(), NOW()),
(46, 'Popcorn', 'Microwave butter popcorn', 280.00, 'Snacks', 'https://images.unsplash.com/photo-1585759071429-fb0501875b5f?w=400', NOW(), NOW()),
(47, 'Mixed Nuts', 'Premium mixed nuts 200g', 680.00, 'Snacks', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', NOW(), NOW()),
(48, 'Chocolate Bar', 'Dark chocolate bar', 380.00, 'Snacks', 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', NOW(), NOW()),
(49, 'Granola Bars', 'Healthy granola bars pack', 520.00, 'Snacks', 'https://images.unsplash.com/photo-1560180920-e1e93b41bb95?w=400', NOW(), NOW()),
(50, 'Trail Mix', 'Energy trail mix 250g', 580.00, 'Snacks', 'https://images.unsplash.com/photo-1606312619070-d48b4cad8080?w=400', NOW(), NOW());

SELECT 'Products table populated with 50 items!' AS Status;

-- ===========================================
-- 2. INVENTORY DATABASE
-- ===========================================

USE supermarket_inventory_db;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE inventory;
SET FOREIGN_KEY_CHECKS = 1;

-- Create inventory records for all products with realistic stock levels
INSERT INTO inventory (inventory_id, product_id, quantity, last_updated) VALUES
(1, 1, 150, NOW()),
(2, 2, 120, NOW()),
(3, 3, 200, NOW()),
(4, 4, 300, NOW()),
(5, 5, 180, NOW()),
(6, 6, 90, NOW()),
(7, 7, 75, NOW()),
(8, 8, 60, NOW()),
(9, 9, 85, NOW()),
(10, 10, 110, NOW()),
(11, 11, 250, NOW()),
(12, 12, 180, NOW()),
(13, 13, 160, NOW()),
(14, 14, 95, NOW()),
(15, 15, 120, NOW()),
(16, 16, 45, NOW()),
(17, 17, 80, NOW()),
(18, 18, 55, NOW()),
(19, 19, 70, NOW()),
(20, 20, 65, NOW()),
(21, 21, 200, NOW()),
(22, 22, 85, NOW()),
(23, 23, 140, NOW()),
(24, 24, 160, NOW()),
(25, 25, 95, NOW()),
(26, 26, 110, NOW()),
(27, 27, 75, NOW()),
(28, 28, 90, NOW()),
(29, 29, 180, NOW()),
(30, 30, 150, NOW()),
(31, 31, 70, NOW()),
(32, 32, 85, NOW()),
(33, 33, 120, NOW()),
(34, 34, 95, NOW()),
(35, 35, 80, NOW()),
(36, 36, 65, NOW()),
(37, 37, 160, NOW()),
(38, 38, 140, NOW()),
(39, 39, 200, NOW()),
(40, 40, 110, NOW()),
(41, 41, 300, NOW()),
(42, 42, 180, NOW()),
(43, 43, 125, NOW()),
(44, 44, 190, NOW()),
(45, 45, 220, NOW()),
(46, 46, 175, NOW()),
(47, 47, 95, NOW()),
(48, 48, 280, NOW()),
(49, 49, 145, NOW()),
(50, 50, 130, NOW());

SELECT 'Inventory table populated for 50 products!' AS Status;

-- ===========================================
-- 3. USERS DATABASE  
-- ===========================================

USE supermarket_users_db;

-- Clear existing data (keep admin)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM admin WHERE username != 'admin';
SET FOREIGN_KEY_CHECKS = 1;

-- Ensure default admin exists
INSERT IGNORE INTO admin (admin_id, username, email, password, contact_number, created_at)
VALUES (1, 'admin', 'admin@freshmart.com', 'admin123', '0771234567', NOW());

-- Add more admin users
INSERT INTO admin (username, email, password, contact_number, created_at) VALUES
('manager', 'manager@freshmart.com', 'manager123', '0772345678', NOW()),
('supervisor', 'supervisor@freshmart.com', 'super123', '0773456789', NOW()),
('cashier1', 'cashier1@freshmart.com', 'cash123', '0774567890', NOW()),
('inventory_admin', 'inventory@freshmart.com', 'inv123', '0775678901', NOW())
ON DUPLICATE KEY UPDATE username=username;

SELECT 'Users table populated with 5 admin users!' AS Status;

-- ===========================================
-- SUMMARY
-- ===========================================
SELECT '========================================' AS '';
SELECT 'DATABASE POPULATION COMPLETE!' AS '';
SELECT '========================================' AS '';
SELECT '50 Products Created' AS Products;
SELECT '50 Inventory Records Created' AS Inventory;
SELECT '5 Admin Users Created' AS Users;
SELECT '========================================' AS '';
SELECT 'Next steps:' AS '';
SELECT '1. Start all microservices' AS Step1;
SELECT '2. Check frontend - products should appear' AS Step2;
SELECT '3. Create some test orders from customer portal' AS Step3;
SELECT '========================================' AS '';

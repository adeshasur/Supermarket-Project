-- ========================================
-- Complete Database Import Script
-- Run this in MySQL Workbench or Command Line
-- ========================================

-- 1. PRODUCTS DATABASE
USE supermarket_products_db;

INSERT INTO product (id, description, name, price, image_url) VALUES 
(2,'Ambewla Fresh Milk','Fresh Milk',440,'https://tse1.mm.bing.net/th/id/OIP.6Zxsird7BoArZeiSprMqmAHaHa?rs=1&pid=ImgDetMain'),
(3,'Munchee Ginger Biscuit-400g','Ginger Biscuit',500,'https://www.onlinekade.lk/wp-content/uploads/2021/10/8888101570101-1.jpg'),
(4,'Pears Baby-Active Floral Baby Soap','Baby Soap',180,'https://cdn.kiddoz.lk/media/catalog/product/s/d/sdjwhsdfgsd.png'),
(5,'Atlas-Exercise-SingleRuled-120-Pages','Exercise Book',200,'https://www.jungle.lk/wp-content/uploads/2018/06/Atlas-Exercise-Single-Ruled-120-Pages.jpg'),
(7,'Richlife-Set Yoghurt 80g','Yoghurt',60,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic849.jpg'),
(9,'Cbl Ramba Tetos Bbq-20g','Ramba Tetos',85,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic115571.jpg'),
(10,'Cic Besto Eggs Omega 3 Standard 10S','Besto Eggs',540,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic126931.jpg'),
(11,'Anchor Fcmp 400G + Anchor Hot Choc-200g','Anchor Hot Chocolate',1650,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic126937.jpg'),
(13,'Prima Kottu Me','Kottu Me',130,'https://spar2u.lk/cdn/shop/files/3002891-1.jpg');

-- 2. INVENTORY DATABASE
USE supermarket_inventory_db;

INSERT INTO inventory (id, product_id, quantity) VALUES 
(2,2,40),
(3,3,50),
(4,4,75),
(5,5,20),
(7,7,10),
(9,9,85),
(10,10,300),
(11,11,400),
(13,13,120);

-- 3. USERS DATABASE - Customers
USE supermarket_users_db;

INSERT INTO customer (name, email, password, phone) VALUES 
('Test Customer', 'test@customer.com', '1234', '0771234567'),
('John Doe', 'john@gmail.com', '1234', '0771234568'),
('Jane Smith', 'jane@gmail.com', '1234', '0771234569');

-- 4. ORDERS DATABASE
USE supermarket_order_db;

-- Sample Order 1
INSERT INTO orders (customer_id, order_date, total_amount, payment_status, transaction_id) VALUES 
(1, '2025-12-19 10:30:00', 2380.00, 'SUCCESS', 'TXN001');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(1, 2, 2, 440),   -- 2x Fresh Milk = 880
(1, 3, 3, 500);   -- 3x Ginger Biscuit = 1500

-- Sample Order 2
INSERT INTO orders (customer_id, order_date, total_amount, payment_status, transaction_id) VALUES 
(2, '2025-12-19 11:15:00', 1870.00, 'SUCCESS', 'TXN002');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(2, 7, 5, 60),    -- 5x Yoghurt = 300
(2, 9, 2, 85),    -- 2x Ramba Tetos = 170
(2, 11, 1, 1650); -- 1x Anchor Hot Chocolate = 1650

-- Sample Order 3 (Pending - won't count in income)
INSERT INTO orders (customer_id, order_date, total_amount, payment_status, transaction_id) VALUES 
(3, '2025-12-19 12:00:00', 850.00, 'PENDING', NULL);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(3, 4, 3, 180),   -- 3x Baby Soap = 540
(3, 13, 2, 130);  -- 2x Kottu Me = 260

-- ========================================
-- EXPECTED DASHBOARD RESULTS:
-- Total Income: Rs. 3,100.00 (only SUCCESS orders)
-- Total Orders: 3
-- Low Stock Items: 1-2 (products with quantity < 20)
-- Active Users: 3
-- ========================================

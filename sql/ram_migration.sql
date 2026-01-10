-- Clear existing items and add RAM products
DELETE FROM items;
DELETE FROM categories;

-- Add RAM categories
INSERT INTO `categories` (`id`, `name`) VALUES 
(1, 'DDR5'),
(2, 'DDR4'),
(3, 'High-Performance');

-- Add RAM items with working placeholder images
INSERT INTO `items` (`name`, `description`, `price`, `image_url`, `category_id`, `stock`) VALUES 
-- DDR5 Modules
('RAMCORE Elite DDR5 6000MHz', 'Premium DDR5 with 6000MHz speed. 32GB kit for ultimate performance and gaming dominance.', 199.99, 'https://placehold.co/500x500/1e40af/ffffff?text=RAMCORE+Elite+DDR5+6000MHz', 1, 50),
('RAMCORE Pro DDR5 7200MHz', 'Extreme overclocked DDR5 at 7200MHz. Includes RGB lighting and advanced cooling solution.', 349.99, 'https://placehold.co/500x500/1e40af/ffffff?text=RAMCORE+Pro+DDR5+7200MHz', 1, 35),
('RAMCORE X DDR5 8000MT/s', 'Flagship DDR5 module pushing 8000MT/s. Engineered for professional content creators and competitive gamers.', 499.99, 'https://placehold.co/500x500/1e40af/ffffff?text=RAMCORE+X+DDR5+8000MT', 1, 15),

-- DDR4 Modules
('RAMCORE Classic DDR4 3600MHz', 'Reliable DDR4 at 3600MHz. Perfect for mid-range builds and productivity workstations. 16GB kit.', 79.99, 'https://placehold.co/500x500/4d7c0f/ffffff?text=RAMCORE+Classic+DDR4+3600MHz', 2, 40),
('RAMCORE Plus DDR4 4000MHz', 'Enhanced DDR4 performance at 4000MHz. Excellent for gaming and streaming setups. 32GB kit.', 149.99, 'https://placehold.co/500x500/4d7c0f/ffffff?text=RAMCORE+Plus+DDR4+4000MHz', 2, 45),

-- High-Performance
('RAMCORE Ultraviolet RGB LED Memory', 'Memory modules with stunning RGB lighting synchronized with your system. Includes controller and 16GB kit.', 129.99, 'https://placehold.co/500x500/7c3aed/ffffff?text=RAMCORE+RGB+Memory', 3, 30),
('RAMCORE Server Grade ECC DDR5', 'Enterprise-class ECC memory for servers and workstations. Guaranteed data integrity. 64GB configuration.', 1299.99, 'https://placehold.co/500x500/0f766e/ffffff?text=RAMCORE+Server+ECC+DDR5', 3, 10),
('RAMCORE Thermal Management Kit', 'Advanced heat sink solution for extreme overclocking. Premium aluminum construction. Works with all DDR5 modules.', 59.99, 'https://placehold.co/500x500/6b7280/ffffff?text=RAMCORE+Thermal+Kit', 3, 25),
('RAMCORE 256GB Ultimate Bundle', 'Complete 256GB memory solution with premium cooling. The ultimate setup for extreme workloads and visualization.', 9999.99, 'https://placehold.co/500x500/be185d/ffffff?text=RAMCORE+256GB+Bundle', 3, 2),
('RAMCORE Gaming Edition DDR5', 'Optimized for gaming performance with custom tuning profiles. 48GB triple-kit configuration. Includes RGB controller.', 449.99, 'https://placehold.co/500x500/dc2626/ffffff?text=RAMCORE+Gaming+DDR5', 3, 20);
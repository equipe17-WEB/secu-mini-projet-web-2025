<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NexStore | Premium Tech & Lifestyle</title>
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet">
</head>

<body>
    <nav id="navbar">
        <div class="logo">NexStore</div>
        <ul class="nav-links">
            <li><a href="index.php">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="cart.php">Cart</a></li>
            <li><a href="login.php">Login</a></li>
        </ul>
    </nav>

    <header class="hero">
        <div class="hero-container container">
            <div class="hero-text">
                <span class="badge">Collection 2026</span>
                <h1>Crafting <br><span>Digital Elegance</span></h1>
                <p>Discover the intersection of high fashion and futuristic technology. Curated pieces for the modern
                    pioneer.</p>
                <div class="hero-btns">
                    <a href="#products" class="btn-primary">Shop Collection</a>
                    <a href="#about" class="btn-secondary">Our Story</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-img-wrapper glass">
                    <img src="assets/hero.png" alt="NexStore Showcase">
                </div>
                <div class="floating-card glass">
                    <div class="icon" style="background: var(--primary); width: 10px; height: 10px; border-radius: 50%;"></div>
                    <div>
                        <strong>New Drop</strong>
                        <p>Limited Edition Tech-Wear</p>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <section id="products">
            <h2 class="section-title">Featured Products</h2>

            <div class="search-filter-container glass"
                style="margin: 0 5% 3rem; padding: 1.5rem; display: flex; gap: 1.5rem; flex-wrap: wrap;">
                <div style="flex-grow: 1; position: relative;">
                    <input type="text" id="product-search" placeholder="Search products..."
                        style="width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; outline: none;">
                </div>
                <select id="category-filter"
                    style="padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-card); color: white; outline: none;">
                    <option value="all">All Categories</option>
                    <?php
                    require_once 'config/db.php';
                    $stmt_cats = $pdo->query("SELECT name FROM categories");
                    while ($cat = $stmt_cats->fetch()) {
                        echo '<option value="' . htmlspecialchars($cat['name']) . '">' . htmlspecialchars($cat['name']) . '</option>';
                    }
                    ?>
                </select>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <input type="number" id="min-price" placeholder="Min $"
                        style="width: 80px; padding: 0.75rem; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-card); color: white; outline: none;">
                    <span style="color: var(--text-secondary);">to</span>
                    <input type="number" id="max-price" placeholder="Max $"
                        style="width: 80px; padding: 0.75rem; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-card); color: white; outline: none;">
                </div>
            </div>

            <div id="product-list" class="grid">
                <p>Loading the future...</p>
            </div>
        </section>

        <section id="about" class="about-section container">
            <div class="about-content glass">
                <div class="about-text">
                    <h2 class="section-title" style="text-align: left;">Our Vision</h2>
                    <p>At NexStore, we believe technology should be an extension of your persona. We curate pieces that
                        blend
                        high-performance engineering with avant-garde fashion aesthetics.</p>
                    <div class="stats-row">
                        <div class="stat-item">
                            <strong>50k+</strong>
                            <span>Global Fans</span>
                        </div>
                        <div class="stat-item">
                            <strong>120+</strong>
                            <span>Design Awards</span>
                        </div>
                    </div>
                </div>
                <div class="about-visual">
                    <img src="assets/hero.png" alt="NexStore Vision" style="filter: hue-rotate(45deg);">
                </div>
            </div>
        </section>

        <section id="testimonials" class="testimonials-section container">
            <h2 class="section-title">What Our Pioneers Say</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card glass">
                    <div class="user-meta">
                        <div class="avatar">OM</div>
                        <div>
                            <strong>Omar M.</strong>
                            <p>Tech Enthusiast</p>
                        </div>
                    </div>
                    <p class="review">"The design language of NexStore is years ahead. The delivery was almost
                        instantaneous, and the product quality is beyond premium."</p>
                    <div class="rating">⭐⭐⭐⭐⭐</div>
                </div>
                <div class="testimonial-card glass">
                    <div class="user-meta">
                        <div class="avatar">SL</div>
                        <div>
                            <strong>Sarah L.</strong>
                            <p>Fashion Architect</p>
                        </div>
                    </div>
                    <p class="review">"Finally, a store that understands the nexus of style and technology. Every item
                        feels like a curated masterpiece."</p>
                    <div class="rating">⭐⭐⭐⭐⭐</div>
                </div>
                <div class="testimonial-card glass">
                    <div class="user-meta">
                        <div class="avatar">AR</div>
                        <div>
                            <strong>Alex R.</strong>
                            <p>Digital Pioneer</p>
                        </div>
                    </div>
                    <p class="review">"The most secure and smooth shopping experience I've had. The interface is
                        stunning and the products are even better in person."</p>
                    <div class="rating">⭐⭐⭐⭐⭐</div>
                </div>
            </div>
        </section>
    </main>

    <footer class="main-footer">
        <div class="footer-container container">
            <div class="footer-brand">
                <div class="logo">NexStore</div>
                <p>Redefining digital retail for the 22nd century.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="cart.php">Cart</a></li>
                    <li><a href="login.php">Login</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="#">X / Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Discord</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom container">
            <p>&copy; 2026 NexStore. All rights reserved. Developed with ❤️ by Equipe 17.</p>
        </div>
    </footer>

    <script src="assets/js/app.js"></script>
    <script>
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    </script>
</body>

</html>
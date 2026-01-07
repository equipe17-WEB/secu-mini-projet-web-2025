<?php
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>NexStore | Register</title>
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/login.css">
</head>

<body>

    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-left">
                <h2>Create Account</h2>
                <p class="subtitle">Join NexStore community</p>

                <form id="register-form">
                    <div class="input-group">
                        <span class="icon">👤</span>
                        <input type="text" id="username" placeholder="Username" required>
                    </div>

                    <div class="input-group">
                        <span class="icon">📧</span>
                        <input type="email" id="email" placeholder="Email" required>
                    </div>

                    <div class="input-group">
                        <span class="icon">🔒</span>
                        <input type="password" placeholder="Password" id="password" required>
                    </div>

                    <div class="input-group">
                        <span class="icon">🔒</span>
                        <input type="password" placeholder="Confirm Password" id="confirm-password" required>
                    </div>

                    <p id="register-message"></p>

                    <button type="submit" class="btn-login">Register</button>

                    <p style="margin-top: 1rem; font-size: 0.9rem;">
                        Already have an account? <a href="login.php" style="color: var(--primary);">Login here</a>
                    </p>
                </form>
            </div>

            <div class="auth-right">
                <h2>Join Us!</h2>
                <p>
                    Create an account to track your orders, save your cart, and get personalized recommendations.
                </p>
            </div>
        </div>
    </div>

    <script src="assets/js/app.js"></script>
<script src="assets/js/register.js"></script>

</body>

</html>
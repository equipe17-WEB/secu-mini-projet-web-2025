document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (toggle && passwordInput) {
        toggle.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            toggle.textContent = type === 'password' ? '👁' : '🙈';
        });
    }

    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const pwd = document.getElementById('password').value;

        if (typeof showToast === 'function') {
            showToast('Logging in...', 'info');
        }

        fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password: pwd })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    if (typeof showToast === 'function') {
                        showToast('Login successful!', 'success');
                    }
                    setTimeout(() => {
                        if (data.role === 'admin') {
                            window.location.href = 'admin/index.php';
                        } else {
                            window.location.href = 'index.php';
                        }
                    }, 800);
                } else {
                    if (typeof showToast === 'function') {
                        showToast(data.message, 'error');
                    } else {
                        alert(data.message);
                    }
                }
            })
            .catch(() => {
                if (typeof showToast === 'function') {
                    showToast('Server error', 'error');
                } else {
                    alert('Server error');
                }
            });
    });
});

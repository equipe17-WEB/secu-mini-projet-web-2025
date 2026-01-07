document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        if (typeof showToast === 'function') {
            showToast('Passwords do not match', 'error');
        } else {
            document.getElementById('register-message').textContent = 'Passwords do not match';
            document.getElementById('register-message').style.color = '#ef4444';
        }
        return;
    }

    fetch('api/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (typeof showToast === 'function') {
                    showToast(data.message, 'success');
                }
                setTimeout(() => {
                    window.location.href = 'login.php';
                }, 2000);
            } else {
                if (typeof showToast === 'function') {
                    showToast(data.message, 'error');
                } else {
                    document.getElementById('register-message').textContent = data.message;
                    document.getElementById('register-message').style.color = '#ef4444';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (typeof showToast === 'function') {
                showToast('An error occurred', 'error');
            }
        });
});

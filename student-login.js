document.getElementById('studentLoginForm').addEventListener('submit',
    function (event) {
        event.preventDefault(); // Prevent form submission 
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let storedEmail = localStorage.getItem('studentEmail');
        let storedPassword = localStorage.getItem('studentPassword');
        if (email === storedEmail && password === storedPassword) {
            sessionStorage.setItem('loggedIn', true);
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html'; // Redirect to student 
            dashboard
        } else {
            document.getElementById('error-message').textContent = 'Invalid email or password!';
        }
    });

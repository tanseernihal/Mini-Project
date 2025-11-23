document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let fullName = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (fullName && email && password) {
        localStorage.setItem('studentEmail', email);
        localStorage.setItem('studentPassword', password);

        alert('Signup successful! Redirecting to login...');
        window.location.href = 'student-login.html'; // Redirect to login page
    } else {
        document.getElementById('error-message').textContent = 'Please fill in all fields!';
    }
});

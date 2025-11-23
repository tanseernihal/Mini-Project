// Select the login form and error message element
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

// Admin credentials (you can change these or fetch from a database in a real application)
const adminCredentials = {
  username: "admin",
  password: "password123"
};

// Handle form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get the entered username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if the username and password match the admin credentials
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // Redirect to the timetable page after a successful login
    window.location.href = "timetable.html"; // Make sure index.html is your timetable page
  } else {
    // Display error message if credentials are incorrect
    errorMessage.textContent = "Invalid username or password. Please try again.";
  }
});



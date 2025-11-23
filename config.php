<?php
// Database connection settings
$servername = "localhost";
$username = "root";  // Default MySQL username for local server
$password = "";      // Default MySQL password for local server
$dbname = "college_timetable";  // The name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

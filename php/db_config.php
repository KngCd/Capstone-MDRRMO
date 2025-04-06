<?php
$host = "localhost";
$user = "root"; // Change if necessary
$pass = ""; // Add password if applicable
$dbname = "responsys"; // Replace with your actual database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
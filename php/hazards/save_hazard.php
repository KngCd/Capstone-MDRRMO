<?php
include('../db_config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hazard_type = $_POST['hazard_type'];
    $status = $_POST['status'];
    $description = $_POST['description'];
    $location = $_POST['location']; // JSON data

    $stmt = $conn->prepare("INSERT INTO hazards (hazard_type, description, status, location) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $hazard_type, $description, $status, $location);

    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
}
?>
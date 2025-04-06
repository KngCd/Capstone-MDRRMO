<?php
include('../db_config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hazard_id = $_POST['hazard_id'];

    $stmt = $conn->prepare("DELETE FROM hazards WHERE hazard_id = ?");
    $stmt->bind_param("i", $hazard_id);

    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
}
?>
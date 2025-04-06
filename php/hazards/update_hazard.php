<?php
include '../db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hazard_id = $_POST["hazard_id"];
    $location = $_POST["location"];

    // Update query
    $query = "UPDATE hazards SET location = ? WHERE hazard_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $location, $hazard_id);

    if ($stmt->execute()) {
        // ✅ Fetch updated hazard data
        $fetch_query = "SELECT hazard_id, hazard_type, status, description, location FROM hazards WHERE hazard_id = ?";
        $fetch_stmt = $conn->prepare($fetch_query);
        $fetch_stmt->bind_param("i", $hazard_id);
        $fetch_stmt->execute();
        $result = $fetch_stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            echo json_encode($row); // Return full updated hazard data as JSON
        } else {
            echo json_encode(["error" => "Hazard not found after update."]);
        }

        $fetch_stmt->close();
    } else {
        echo json_encode(["error" => "Error updating hazard: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
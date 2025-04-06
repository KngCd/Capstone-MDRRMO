<?php
header('Content-Type: application/json'); // Set JSON response type
include('../db_config.php');

$sql = "SELECT report_id, latitude, longitude, description FROM reports";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Database query failed: " . $conn->error]);
    exit;
}

$reports = [];

while ($row = $result->fetch_assoc()) {
    $reports[] = [
        "report_id" => (int) $row["report_id"],
        "latitude" => (float) $row["latitude"],
        "longitude" => (float) $row["longitude"],
        "description" => $row["description"]
    ];
}

echo json_encode($reports);
$conn->close();
?>
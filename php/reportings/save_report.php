<?php
// include('../db_config.php');

// $latitude = $_POST['latitude'];
// $longitude = $_POST['longitude'];
// $description = $_POST['description'];

// $sql = "INSERT INTO reports (latitude, longitude, description) VALUES (?, ?, ?)";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("dds", $latitude, $longitude, $description);

// if ($stmt->execute()) {
//     echo $stmt->insert_id; // Return the inserted report ID
// } else {
//     echo "error";
// }

// $stmt->close();
// $conn->close();

include('../db_config.php');

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$description = $_POST['description'];

$sql = "INSERT INTO reports (latitude, longitude, description, date, time) VALUES (?, ?, ?,  CURDATE(), CURTIME())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("dds", $latitude, $longitude, $description);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "report_id" => $stmt->insert_id,
        "latitude" => $latitude,
        "longitude" => $longitude,
        "description" => $description
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Database insert failed"]);
}

$stmt->close();
$conn->close();
?>
<?php
header('Content-Type: application/json');
include('../db_config.php');

if (!isset($_POST["id"])) {
    echo json_encode(["error" => "Missing report ID"]);
    exit;
}

$report_id = (int) $_POST["id"];
$sql = "DELETE FROM reports WHERE report_id = $report_id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => "Report deleted successfully", "id" => $report_id]);
} else {
    echo json_encode(["error" => "Deletion failed: " . $conn->error]);
}

$conn->close();
?>
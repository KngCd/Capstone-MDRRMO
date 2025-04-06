<?php
include('../db_config.php');

$sql = "SELECT hazard_id, hazard_type, description, status, location FROM hazards";
$result = $conn->query($sql);

$hazards = array();
while ($row = $result->fetch_assoc()) {
    $hazards[] = $row;
}

echo json_encode($hazards);
$conn->close();
?>
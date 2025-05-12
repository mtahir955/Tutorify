<?php
session_start();
header("Content-Type: application/json");
require_once "dbconfig.php"; // This should initialize a PDO instance in $pdo

if (!isset($_SESSION["user"])) {
    echo json_encode(["success" => false, "message" => "User not logged in."]);
    exit;
}

$student_id = $_SESSION["user"]["id"];

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$tutor_id = $data["tutor_id"] ?? null;
$message = $data["message"] ?? null;
$courses_offered = isset($data["courses_offered"]) ? json_encode($data["courses_offered"]) : "[]";
$status = "pending";
$date = date("Y-m-d");

if (!$tutor_id || !$message) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO requests (student_id, tutor_id, message, courses_offered, status, date) VALUES (:student_id, :tutor_id, :message, :courses_offered, :status, :date)");
    $stmt->execute([
        ":student_id" => $student_id,
        ":tutor_id" => $tutor_id,
        ":message" => $message,
        ":courses_offered" => $courses_offered,
        ":status" => $status,
        ":date" => $date
    ]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>

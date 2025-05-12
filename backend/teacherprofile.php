<?php
session_start();
header("Content-Type: application/json");
require_once("dbconfig.php");

$userId = $_SESSION['user']['id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "User not authenticated"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM teachers WHERE user_id = ?");
    $stmt->execute([$userId]);
    $teacher = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($teacher) {
        echo json_encode(["success" => true, "data" => $teacher]);
    } else {
        echo json_encode(["success" => false, "message" => "Teacher not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error"]);
}

<?php
session_start();
header("Content-Type: application/json");
require_once("dbconfig.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$userId = $_SESSION['user']['id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "Not authenticated."]);
    exit;
}

$requestId = $_POST['request_id'] ?? null;
$status = $_POST['status'] ?? null;

if (!$requestId || !in_array($status, ['Accepted', 'Declined'])) {
    echo json_encode(["success" => false, "message" => "Invalid request or status."]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE requests SET status = ? WHERE id = ?");
    $stmt->execute([$status, $requestId]);

    echo json_encode(["success" => true, "message" => "Status updated."]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error."]);
}

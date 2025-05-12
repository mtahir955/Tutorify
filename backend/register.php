<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("dbconfig.php");

$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$password = $data['password'] ?? '';
$address = trim($data['address'] ?? '');
$role = strtolower(trim($data['role'] ?? ''));

// Validate required fields
if (empty($fullName) || empty($email) || empty($password) || empty($address) || empty($role)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Validate role
if (!in_array($role, ['student', 'teacher'])) {
    echo json_encode(["success" => false, "message" => "Invalid role. Must be student or teacher."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered."]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, password, address, role) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$fullName, $email, $phone, $hashedPassword, $address, $role]);

    $userId = $pdo->lastInsertId();
    $_SESSION['user'] = [
        "id" => $userId,
        "email" => $email,
        "name" => $fullName,
        "role" => $role
    ];

    echo json_encode(["success" => true, "message" => "Registration successful", "user" => $_SESSION['user']]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Server error"]);
}
?>

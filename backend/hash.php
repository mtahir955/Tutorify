<?php
// Enable full error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once("dbconfig.php");

// Fetch all users (you may want to filter out already hashed ones if possible)
$stmt = $pdo->query("SELECT id, password FROM users");

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $id = $row['id'];
    $plainPassword = $row['password'];

    // Skip if already hashed (basic check: bcrypt hashes start with $2y$)
    if (strpos($plainPassword, '$2y$') === 0) {
        continue;
    }

    // Hash the plain-text password
    $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

    // Update the password in the database
    $updateStmt = $pdo->prepare("UPDATE users SET password = :password WHERE id = :id");
    $updateStmt->execute([
        ':password' => $hashedPassword,
        ':id' => $id
    ]);
}

echo "All passwords have been hashed.";
?>


<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
require_once("dbconfig.php");
session_start();

$userId = $_SESSION['user']['id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "User not authenticated"]);
    exit;
}

try {
    // Get student data
    $stmtStudent = $pdo->prepare("SELECT id, full_name, email FROM users WHERE id = ?");
    $stmtStudent->execute([$userId]);
    $student = $stmtStudent->fetch(PDO::FETCH_ASSOC);

    if (!$student) {
        echo json_encode(["success" => false, "message" => "Student not found"]);
        exit;
    }

    // Get tutors
    $stmtTutors = $pdo->query("SELECT id, full_name, courses_offered, experience, education, photo, rating, review_count FROM teachers LIMIT 6");
    $tutors = $stmtTutors->fetchAll(PDO::FETCH_ASSOC);

    // Get requests
    $stmtRequests = $pdo->prepare("SELECT r.id, r.tutor_id, t.full_name AS tutor_name, r.courses_offered, r.status, r.date 
        FROM requests r 
        JOIN teachers t ON r.tutor_id = t.id 
        WHERE r.student_id = ? 
        ORDER BY r.date DESC");
    $stmtRequests->execute([$student['id']]);
    $requests = $stmtRequests->fetchAll(PDO::FETCH_ASSOC);

    // Get messages
    $stmtMessages = $pdo->prepare("SELECT m.id, m.tutor_id, t.full_name AS tutor_name, t.photo AS tutor_avatar,
        m.last_message, m.time, m.unread 
        FROM messages m 
        JOIN teachers t ON m.tutor_id = t.id 
        WHERE m.student_id = ? 
        ORDER BY m.time DESC");
    $stmtMessages->execute([$student['id']]);
    $messages = $stmtMessages->fetchAll(PDO::FETCH_ASSOC);
    
     $stmtStudents = $pdo->prepare("
    SELECT 
  u.id AS user_id,
  u.full_name AS name,
  u.email,
  u.phone,
  ts.subjects,
  ts.start_date,
  ts.progress
FROM teacher_students ts
JOIN teachers t ON ts.teacher_id = t.id
JOIN users u ON t.user_id = u.id
WHERE ts.student_id = ?;
");
    $stmtStudents->execute([$student['id']]);
    $tutorss = $stmtStudents->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => [
            "student" => $student,
            "tutors" => $tutors,
            "requests" => $requests,
            "messages" => $messages,
            "tutorss"=> $tutorss
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error", "error" => $e->getMessage()]);
}

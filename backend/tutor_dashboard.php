<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
header("Content-Type: application/json");
require_once("dbconfig.php");

// Check if user is logged in
$userId = $_SESSION['user']['id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "User not authenticated"]);
    exit;
}

// Get teacher ID from teachers table
$stmtTeach = $pdo->prepare("SELECT id FROM teachers WHERE user_id = ?");
$stmtTeach->execute([$userId]);
$teacherRow = $stmtTeach->fetch(PDO::FETCH_ASSOC);

if (!$teacherRow) {
    echo json_encode(["success" => false, "message" => "Teacher profile not found"]);
    exit;
}

$teacherId = $teacherRow['id'];

try {
    


    // Get teacher full name
    $stmtTeacher = $pdo->prepare("SELECT full_name FROM users WHERE id = ?");
    $stmtTeacher->execute([$userId]);
    $teacher = $stmtTeacher->fetch(PDO::FETCH_ASSOC);

    if (!$teacher) {
        echo json_encode(["success" => false, "message" => "Teacher not found"]);
        exit;
    }

    // Fetch student requests
    $stmtRequests = $pdo->prepare("
        SELECT r.id, u.full_name AS studentName, r.courses_offered, r.status, r.message
        FROM requests r
        JOIN users u ON r.student_id = u.id
        WHERE r.tutor_id = ?
        ORDER BY r.date DESC
    ");
    $stmtRequests->execute([$teacherId]);
    $requests = $stmtRequests->fetchAll(PDO::FETCH_ASSOC);

    // Fetch responses/messages sent by teacher
    $stmtResponses = $pdo->prepare("
        SELECT m.id, u.full_name AS studentName, m.last_message, m.time
        FROM messages m
        JOIN users u ON m.student_id = u.id
        WHERE m.tutor_id = ? AND m.sender = 'tutor'
        ORDER BY m.time DESC
    ");
    $stmtResponses->execute([$teacherId]);
    $responses = $stmtResponses->fetchAll(PDO::FETCH_ASSOC);

    // Fetch current students
        $stmtStudents = $pdo->prepare("
    SELECT DISTINCT 
        u.id, 
        u.full_name AS name, 
        u.email, 
        u.phone, 
        t.subjects, 
        t.start_date, 
        t.progress
    FROM teacher_students t
    JOIN users u ON t.student_id = u.id
    WHERE t.teacher_id = ?
");
    $stmtStudents->execute([$teacherId]);
    $students = $stmtStudents->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => [
            "teacherName" => $teacher['full_name'],
            "requests" => $requests,
            "responses" => $responses,
            "students" => $students,
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error",
        "error" => $e->getMessage()
    ]);
}

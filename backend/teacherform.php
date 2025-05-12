<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require_once("dbconfig.php"); // This must define $pdo (your PDO connection)

// Get userId from session
$userId = $_SESSION['id'] ?? 1;

// Check if the form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Safely retrieve form fields
    $fullName        = $_POST['fullName'] ?? '';
    $fatherName      = $_POST['fatherName'] ?? '';
    $cnic            = $_POST['cnic'] ?? '';
    $gender          = $_POST['gender'] ?? '';
    $bio             = $_POST['bio'] ?? '';
    $coursesOffered  = $_POST['coursesOffered'] ?? '';
    $education       = $_POST['education'] ?? '';
    $certifications  = $_POST['certifications'] ?? '';
    $experience      = $_POST['experience'] ?? '';
    $expertise       = $_POST['expertise'] ?? '';
    $country         = $_POST['country'] ?? '';
    $state           = $_POST['state'] ?? '';
    $city            = $_POST['city'] ?? '';
    $availability    = $_POST['availability'] ?? '';
    $termsAccepted   = $_POST['termsAccepted'] ?? '0';

    // File upload handling
    $resumePath = null;
    $photoPath = null;

    if (!empty($_FILES['resume']['tmp_name'])) {
        $resumePath = "uploads/" . basename($_FILES['resume']['name']);
        move_uploaded_file($_FILES['resume']['tmp_name'], $resumePath);
        $resumePath= "api../" . $resumePath;
    }

    if (!empty($_FILES['photo']['tmp_name'])) {
        $photoPath = "uploads/" . basename($_FILES['photo']['name']);
        move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
        $photoPath= "api../" . $photoPath;
    }

    try {
        $sql = "INSERT INTO teachers (
            user_id, full_name, father_name, cnic, gender, bio, courses_offered,
            education, certifications, experience, expertise, country, state,
            city, resume, photo, availability, terms_accepted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute([
            $userId, $fullName, $fatherName, $cnic, $gender, $bio, $coursesOffered,
            $education, $certifications, $experience, $expertise, $country, $state,
            $city, $resumePath, $photoPath, $availability, $termsAccepted
        ]);

        if ($result) {
            echo json_encode(['message' => 'Teacher registration successful']);
        } else {
            echo json_encode(['message' => 'Failed to register teacher']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid request']);
}
?>

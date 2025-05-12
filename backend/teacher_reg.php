<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    http_response_code(200);
    exit();
}

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("dbconfig.php");

$userId = $_SESSION['user']['id'] ?? null;
if (!$userId) {
    echo json_encode(['message' => 'User is not logged in']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract and sanitize
    $fullName        = $_POST['fullName'] ?? '';
    $fatherName      = $_POST['fatherName'] ?? '';
    $cnic            = $_POST['cnic'] ?? '';
    $gender          = $_POST['gender'] ?? '';
    $bio             = $_POST['bio'] ?? '';
    $education       = $_POST['education'] ?? '';
    $certifications  = $_POST['certifications'] ?? '';
    $experience      = $_POST['experience'] ?? '';
    $coursesOffered = isset($_POST['coursesOffered']) 
    ? implode(', ', json_decode($_POST['coursesOffered'], true)) 
    : '';

$expertise = isset($_POST['expertise']) 
    ? implode(', ', json_decode($_POST['expertise'], true)) 
    : '';


    $monthlyFee      = isset($_POST['monthlyFee']) ? (int)$_POST['monthlyFee'] : 10000;
    $country         = $_POST['country'] ?? '';
    $state           = $_POST['state'] ?? '';
    $city            = $_POST['city'] ?? '';
    $availability    = $_POST['availability'] ?? '';
    $termsAccepted   = (isset($_POST['termsAccepted']) && $_POST['termsAccepted'] === 'true') ? 1 : 0;

    $resumePath = null;
    $photoPath = null;

    try {
        // Validate
        $required = ['fullName' => $fullName, 'fatherName' => $fatherName, 'cnic' => $cnic, 'gender' => $gender, 'education' => $education, 'country' => $country, 'monthlyFee' => $monthlyFee];
        $errors = [];
        foreach ($required as $field => $value) {
            if (empty($value)) $errors[] = "$field is required";
        }
        if (!empty($errors)) {
            echo json_encode(['message' => 'Validation failed', 'errors' => $errors]);
            exit;
        }

        // Create upload folder
       $uploadDir = __DIR__ . '/../uploads/';


        if (!file_exists($uploadDir)) mkdir($uploadDir, 0755, true);

        // Handle file upload
        if (!empty($_FILES['resume']['tmp_name'])) {
            $allowedResumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!in_array($_FILES['resume']['type'], $allowedResumeTypes)) {
                echo json_encode(['message' => 'Invalid resume file type']);
                exit;
            }
            $resumeName = uniqid() . '_' . basename($_FILES['resume']['name']);
            $resumePath = 'uploads/' . $resumeName;
            move_uploaded_file($_FILES['resume']['tmp_name'], $uploadDir . $resumeName);
        }

        if (!empty($_FILES['photo']['tmp_name'])) {
            $allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!in_array($_FILES['photo']['type'], $allowedImageTypes)) {
                echo json_encode(['message' => 'Invalid photo file type']);
                exit;
            }
            $photoName = uniqid() . '_' . basename($_FILES['photo']['name']);
            $photoPath = 'uploads/' . $photoName;
            move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoName);
        }

        // Check if teacher record exists
        $checkStmt = $pdo->prepare("SELECT resume, photo FROM teachers WHERE user_id = ?");
        $checkStmt->execute([$userId]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            // Keep existing resume/photo if not uploaded
            $resumePath = $resumePath ?? $existing['resume'];
            $photoPath = $photoPath ?? $existing['photo'];

            // Update record
            $updateStmt = $pdo->prepare("
                UPDATE teachers SET 
                    full_name = ?, father_name = ?, cnic = ?, gender = ?, bio = ?, courses_offered = ?, 
                    education = ?, certifications = ?, experience = ?, expertise = ?, fee = ?, country = ?, 
                    state = ?, city = ?, resume = ?, photo = ?, availability = ?, terms_accepted = ? 
                WHERE user_id = ?
            ");
            $updateStmt->execute([
                $fullName, $fatherName, $cnic, $gender, $bio, $coursesOffered,
                $education, $certifications, $experience, $expertise, $monthlyFee, $country,
                $state, $city, $resumePath, $photoPath, $availability, $termsAccepted, $userId
            ]);

            echo json_encode(['message' => 'Teacher profile updated successfully']);
        } else {
            // Insert new record
            $insertStmt = $pdo->prepare("
                INSERT INTO teachers (
                    user_id, full_name, father_name, cnic, gender, bio, courses_offered,
                    education, certifications, experience, expertise, fee, country, 
                    state, city, resume, photo, availability, terms_accepted
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $insertStmt->execute([
                $userId, $fullName, $fatherName, $cnic, $gender, $bio, $coursesOffered,
                $education, $certifications, $experience, $expertise, $monthlyFee, $country,
                $state, $city, $resumePath, $photoPath, $availability, $termsAccepted
            ]);

            echo json_encode(['message' => 'Teacher registration successful']);
        }
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['message' => 'Database error', 'error' => $e->getMessage()]);
    } catch (Exception $e) {
        error_log("General error: " . $e->getMessage());
        echo json_encode(['message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once 'dbconfig.php'; // Assumes $pdo is your PDO connection

try {
    // Collect GET parameters
    $subject = $_GET['subject'] ?? '';
    $priceRange = $_GET['price_range'] ?? '';
    $tutorLevel = $_GET['tutor_level'] ?? '';
    $search = $_GET['search_term'] ?? '';
    $sortBy = $_GET['sort_by'] ?? '';

    $sql = "SELECT id, full_name AS name, rating, fee AS price, education, 
                   courses_offered, expertise, review_count AS studentsCount, photo 
            FROM teachers 
            WHERE terms_accepted = 1";

    $conditions = [];
    $params = [];

    if (!empty($subject)) {
        $conditions[] = "courses_offered LIKE :subject";
        $params[':subject'] = '%' . $subject . '%';
    }

    if (!empty($priceRange)) {
        [$minPrice, $maxPrice] = explode('-', $priceRange);
        $conditions[] = "fee BETWEEN :minPrice AND :maxPrice";
        $params[':minPrice'] = (int)$minPrice;
        $params[':maxPrice'] = (int)$maxPrice;
    }

    if (!empty($tutorLevel)) {
        $conditions[] = "education LIKE :level";
        $params[':level'] = '%' . $tutorLevel . '%';
    }

    if (!empty($search)) {
        $conditions[] = "(full_name LIKE :search OR expertise LIKE :search OR courses_offered LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    // Append conditions
    if (!empty($conditions)) {
        $sql .= " AND " . implode(' AND ', $conditions);
    }

    // Sorting
    switch ($sortBy) {
        case 'price-asc':
            $sql .= " ORDER BY fee ASC";
            break;
        case 'price-desc':
            $sql .= " ORDER BY fee DESC";
            break;
        case 'rating-desc':
            $sql .= " ORDER BY rating DESC";
            break;
        case 'students-desc':
            $sql .= " ORDER BY review_count DESC";
            break;
        default:
            $sql .= " ORDER BY id DESC";
    }

    // Prepare and execute
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $tutors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert course string to array
    foreach ($tutors as &$tutor) {
        $tutor['subjects'] = array_map('trim', explode(',', $tutor['courses_offered']));
    }

    echo json_encode($tutors);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

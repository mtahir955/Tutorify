<?php
session_start();

if (isset($_SESSION['user'])) {
    // User is logged in
    $userId = $_SESSION['user']['id'];
    echo json_encode(['loggedIn' => true, 'userId' => $userId]);
} else {
    // User is not logged in
    echo json_encode(['loggedIn' => false, 'message' => 'User is not logged in']);
}
?>

<?php
// Include database connection
require_once 'db_connect.php';

// Set header to return JSON
header('Content-Type: application/json');

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = isset($_POST['name']) ? $conn->real_escape_string(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? $conn->real_escape_string(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? $conn->real_escape_string(trim($_POST['phone'])) : '';
    $message = isset($_POST['message']) ? $conn->real_escape_string(trim($_POST['message'])) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please  {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all required fields.'
        ]);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please enter a valid email address.'
        ]);
        exit;
    }
    
    // Insert message into database
    $sql = "INSERT INTO messages (name, email, phone, message, created_at) 
            VALUES ('$name', '$email', '$phone', '$message', NOW())";
    
    if ($conn->query($sql) === TRUE) {
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Your message has been sent successfully!'
        ]);
    } else {
        // Return error response
        echo json_encode([
            'success' => false,
            'message' => 'Error saving your message: ' . $conn->error
        ]);
    }
} else {
    // Return error if not a POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}

// Close connection
$conn->close();
?>


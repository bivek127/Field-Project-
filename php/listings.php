<?php
// Include database connection
require_once 'db_connect.php';

// Set header to return JSON
header('Content-Type: application/json');

// Get sort parameter (default to newest)
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'newest';

// Build query based on sort parameter
switch ($sort) {
    case 'price-asc':
        $orderBy = "ORDER BY price ASC";
        break;
    case 'price-desc':
        $orderBy = "ORDER BY price DESC";
        break;
    case 'newest':
    default:
        $orderBy = "ORDER BY created_at DESC";
        break; 
}

// Query to get all listings
$sql = "SELECT * FROM listings WHERE active = 1 $orderBy";
$result = $conn->query($sql);

if ($result) {
    $listings = [];
    // Fetch all listings
    while ($row = $result->fetch_assoc()) {
        $listings[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'price' => $row['price'],
            'image' => $row['image'],
            'created_at' => $row['created_at']
        ];
    }
    
    // Return success response with listings
    echo json_encode([
        'success' => true,
        'listings' => $listings
    ]);
} else {
    // Return error response
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching listings: ' . $conn->error
    ]);
}

// Close connection
$conn->close();
?>


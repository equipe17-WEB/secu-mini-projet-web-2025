<?php
session_start();
require_once '../config/db.php';
header('Content-Type: application/json');

// Check admin authentication
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

try {
    // 1. Stock by Category
    $stocks = $pdo->query("
        SELECT c.name as category, SUM(i.stock) as total_stock 
        FROM items i 
        JOIN categories c ON i.category_id = c.id 
        GROUP BY c.id
    ")->fetchAll();

    // 2. Price Distribution
    $prices = $pdo->query("
        SELECT 
            CASE 
                WHEN price < 50 THEN 'Under $50'
                WHEN price BETWEEN 50 AND 100 THEN '$50 - $100'
                WHEN price BETWEEN 100 AND 200 THEN '$100 - $200'
                ELSE 'Over $200'
            END as price_range,
            COUNT(*) as count
        FROM items
        GROUP BY price_range
    ")->fetchAll();

    // 3. Simple simulated sales (since no orders table yet)
    // In a real app, this would query the orders/order_items tables
    $sales = [
        ['label' => 'Mon', 'value' => 120],
        ['label' => 'Tue', 'value' => 190],
        ['label' => 'Wed', 'value' => 300],
        ['label' => 'Thu', 'value' => 250],
        ['label' => 'Fri', 'value' => 450],
        ['label' => 'Sat', 'value' => 600],
        ['label' => 'Sun', 'value' => 350],
    ];

    echo json_encode([
        'success' => true,
        'stocks' => $stocks,
        'prices' => $prices,
        'sales' => $sales
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
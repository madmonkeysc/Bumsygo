<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Get raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON payload"]);
    http_response_code(400);
    exit;
}

$productId = $data['id'] ?? 'unknown';
$productName = $data['name'] ?? 'Producto Bumsy';
$productPrice = floatval($data['price'] ?? 0);
$buyerEmail = $data['buyerEmail'] ?? 'test_user@test.com';
$buyerName = $data['buyerName'] ?? 'Comprador Bumsy';

// 2. Mercado Pago Sandbox Access Token
$accessToken = "APP_USR-1936480768921556-053122-c9f30d58ec69d210d235a95f7a1d2373-3440257554";

// 3. Determine base redirection URL dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$baseReturnUrl = $protocol . $host;

// 4. Build Preference Request Payload
$payload = [
    "items" => [
        [
            "id" => strval($productId),
            "title" => $productName,
            "quantity" => 1,
            "unit_price" => $productPrice,
            "currency_id" => "USD"
        ]
    ],
    "payer" => [
        "name" => $buyerName,
        "email" => $buyerEmail
    ],
    "back_urls" => [
        "success" => $baseReturnUrl . "/crm?payment_status=success&product_id=" . urlencode($productId) . "&amount=" . urlencode($productPrice) . "&buyer_email=" . urlencode($buyerEmail) . "&buyer_name=" . urlencode($buyerName),
        "failure" => $baseReturnUrl . "/crm?payment_status=failure",
        "pending" => $baseReturnUrl . "/crm?payment_status=pending"
      ],
    "auto_return" => "approved",
    "binary_mode" => true
];

// 5. Initialize cURL request to Mercado Pago
$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    $resData = json_decode($response, true);
    // Automatically detect if we are using a test/sandbox seller account (ID 3440257554 or token starts with TEST-)
    $isTestMode = (strpos($accessToken, 'TEST-') === 0) || (isset($resData['collector_id']) && $resData['collector_id'] == 3440257554);
    $initPoint = ($isTestMode && !empty($resData['sandbox_init_point'])) ? $resData['sandbox_init_point'] : ($resData['init_point'] ?? '');

    echo json_encode([
        "preference_id" => $resData['id'] ?? '',
        "init_point" => $initPoint
    ]);
} else {
    echo json_encode([
        "error" => "Failed to create preference with Mercado Pago",
        "details" => json_decode($response, true),
        "http_code" => $httpCode
    ]);
    http_response_code(500);
}
?>

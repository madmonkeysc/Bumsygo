<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$input = file_get_contents('php://input');
$data  = json_decode($input, true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON payload"]);
    http_response_code(400);
    exit;
}

$accessToken = "APP_USR-4126169954775238-053122-3986ebcd4b81182fcc46b8f43ade5b05-268062769";

$buyerEmail = $data['buyerEmail'] ?? 'cliente@bumsygo.com';
$buyerName  = $data['buyerName']  ?? 'Socio Club Bumsy';

$protocol      = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host          = $_SERVER['HTTP_HOST'];
$baseReturnUrl = $protocol . $host;

// One-time $3 USD promo payment — unlocks 3 months of Club Mágico access
$payload = [
    "items" => [
        [
            "id"          => "promo_3meses",
            "title"       => "Club Mágico Bumsy Go — Promo 3 Meses",
            "description" => "Acceso completo al Club Mágico por 3 meses por solo $3 USD. ¡Oferta de bienvenida!",
            "quantity"    => 1,
            "unit_price"  => 3.00,
            "currency_id" => "USD"
        ]
    ],
    "payer" => [
        "name"  => $buyerName,
        "email" => $buyerEmail
    ],
    "back_urls" => [
        "success" => $baseReturnUrl . "/crm?subscription_status=promo_success&buyer_email=" . urlencode($buyerEmail) . "&buyer_name=" . urlencode($buyerName),
        "failure" => $baseReturnUrl . "/crm?subscription_status=failure",
        "pending" => $baseReturnUrl . "/crm?subscription_status=pending"
    ],
    "auto_return"  => "approved",
    "binary_mode"  => true,
    "statement_descriptor" => "BUMSY GO CLUB"
];

$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
]);

$response = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    $resData = json_decode($response, true);
    echo json_encode([
        "preference_id" => $resData['id']          ?? '',
        "init_point"    => $resData['init_point']   ?? ''
    ]);
} else {
    echo json_encode([
        "error"     => "Failed to create promo payment",
        "details"   => json_decode($response, true),
        "http_code" => $httpCode
    ]);
    http_response_code(500);
}
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON payload"]);
    http_response_code(400);
    exit;
}

// Production Access Token (real account)
$accessToken = "APP_USR-4126169954775238-053122-3986ebcd4b81182fcc46b8f43ade5b05-268062769";

$buyerEmail   = $data['buyerEmail']  ?? '';
$buyerName    = $data['buyerName']   ?? 'Socio Club Bumsy';
$currencyId   = $data['currency']    ?? 'MXN'; // MXN or USD
$reason       = "Club Mágico Bumsy Go - Membresía Mensual";

// Dynamic price based on currency
$amount = ($currencyId === 'USD') ? 9.00 : 99.00;

$protocol      = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host          = $_SERVER['HTTP_HOST'];
$baseReturnUrl = $protocol . $host;

// Build Preapproval Plan payload (creates a reusable subscription plan)
$payload = [
    "reason"             => $reason,
    "auto_recurring"     => [
        "frequency"       => 1,
        "frequency_type"  => "months",
        "transaction_amount" => $amount,
        "currency_id"     => $currencyId
    ],
    "back_url"           => $baseReturnUrl . "/crm?subscription_status=success&buyer_email=" . urlencode($buyerEmail),
    "payer_email"        => $buyerEmail,
    "status"             => "pending"
];

$ch = curl_init('https://api.mercadopago.com/preapproval');
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
        "subscription_id" => $resData['id']       ?? '',
        "init_point"      => $resData['init_point'] ?? ''
    ]);
} else {
    echo json_encode([
        "error"     => "Failed to create subscription with Mercado Pago",
        "details"   => json_decode($response, true),
        "http_code" => $httpCode
    ]);
    http_response_code(500);
}
?>

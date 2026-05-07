<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php'; // Adjust path based on where composer installed PHPMailer

// Set CORS headers so your Ionic app can reach this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Get the JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['otp'])) {
    $email = $data['email'];
    $otp = $data['otp'];
    $firstName = isset($data['firstName']) ? $data['firstName'] : 'User';

    $mail = new PHPMailer(true);

    try {
        // Server settings (example using Gmail SMTP)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'YOUR_REAL_GMAIL@gmail.com'; 
        $mail->Password   = 'YOUR_16_CHARACTER_APP_PASSWORD'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients (Use the same email as Username for 'setFrom')
        $mail->setFrom('YOUR_REAL_GMAIL@gmail.com', 'Forecast App');
        $mail->addAddress($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'FORECAST App Registration Verification';
        $mail->Body    = "Hello <b>$firstName</b>,<br><br>Your verification code is: <h2>$otp</h2>";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "OTP sent successfully"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data provided"]);
}
?>
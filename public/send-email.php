<?php
/**
 * Al Amin Robin Portfolio - Contact Form PHP Backend
 * Supports both PHPMailer (composer autoload) and native multi-part PHP mail() fallback.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// 1. Input Sanitization
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$projectType = filter_input(INPUT_POST, 'projectType', FILTER_SANITIZE_SPECIAL_CHARS);
$budget = filter_input(INPUT_POST, 'budget', FILTER_SANITIZE_SPECIAL_CHARS);
$timeline = filter_input(INPUT_POST, 'timeline', FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$name || !$email || !$message) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide all required fields (Name, Email, Message).'
    ]);
    exit;
}

$recipient = 'contact@alaminrobin.com';
$subject = "🔥 New Project Brief: {$projectType} from {$name}";

// 2. Build the HTML Email Template
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>New Project Brief</title>
  <style>
    body {
      background-color: #0A0A0C;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #0A0A0C;
      padding: 40px 20px;
    }
    .container {
      background: #111115;
      border: 1px solid #222228;
      border-radius: 24px;
      max-width: 600px;
      margin: 0 auto;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #FA8334 0%, #EA580C 100%);
      padding: 30px 40px;
      text-align: left;
    }
    .header h1 {
      color: #0A0A0C;
      font-size: 24px;
      font-weight: 800;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .header p {
      color: rgba(10, 10, 12, 0.8);
      font-size: 14px;
      font-weight: 600;
      margin: 5px 0 0 0;
    }
    .content {
      padding: 40px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .details-table td {
      padding: 12px 0;
      border-bottom: 1px solid #222228;
      font-size: 14px;
    }
    .details-table td.label {
      color: #FA8334;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 1.5px;
      width: 130px;
    }
    .details-table td.value {
      color: #FFFFFF;
      font-weight: 500;
    }
    .message-container {
      background: #18181F;
      border-left: 3px solid #FA8334;
      border-radius: 8px;
      padding: 20px;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .message-container p {
      color: #94A3B8;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      white-space: pre-wrap;
    }
    .footer {
      background: #0A0A0C;
      padding: 24px 40px;
      border-top: 1px solid #222228;
      text-align: center;
    }
    .footer p {
      color: #64748B;
      font-size: 11px;
      margin: 0;
      letter-spacing: 1px;
    }
    .attachment-badge {
      display: inline-flex;
      align-items: center;
      background: rgba(250, 131, 52, 0.1);
      border: 1px solid rgba(250, 131, 52, 0.2);
      color: #FA8334;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class='wrapper'>
    <div class='container'>
      <div class='header'>
        <h1>Project Brief</h1>
        <p>New request submitted via alaminrobin.com</p>
      </div>
      <div class='content'>
        <table class='details-table'>
          <tr>
            <td class='label'>Client Name</td>
            <td class='value'>{$name}</td>
          </tr>
          <tr>
            <td class='label'>Client Email</td>
            <td class='value'><a href='mailto:{$email}' style='color: #FA8334; text-decoration: none;'>{$email}</a></td>
          </tr>
          <tr>
            <td class='label'>Project Type</td>
            <td class='value'>{$projectType}</td>
          </tr>
          <tr>
            <td class='label'>Est. Budget</td>
            <td class='value'>{$budget}</td>
          </tr>
          <tr>
            <td class='label'>Est. Timeline</td>
            <td class='value'>{$timeline}</td>
          </tr>
        </table>

        <div style='color: #FA8334; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; margin-bottom: 10px;'>Message Detail</div>
        <div class='message-container'>
          <p>{$message}</p>
        </div>

        " . (isset($_FILES['specification']) && $_FILES['specification']['error'] === UPLOAD_ERR_OK ? "
        <div style='color: #FA8334; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; margin-bottom: 5px;'>Attached Document</div>
        <div class='attachment-badge'>
          📁 File Attached: " . htmlspecialchars($_FILES['specification']['name']) . "
        </div>
        " : "") . "
      </div>
      <div class='footer'>
        <p>&copy; " . date('Y') . " Al Amin Robin. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
";

// 3. Attempt to load PHPMailer if Autoloader exists (Composer setup)
$phpmailerAutoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($phpmailerAutoload)) {
    // Try parent directory context if public directory is nested in a project structure
    $phpmailerAutoload = __DIR__ . '/../vendor/autoload.php';
}

if (file_exists($phpmailerAutoload)) {
    require_once $phpmailerAutoload;
    
    // Check if PHPMailer exists
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        try {
            // Using standard mail sender engine
            $mail->isMail();
            $mail->CharSet = 'UTF-8';
            $mail->setFrom($recipient, $name);
            $mail->addAddress($recipient);
            $mail->addReplyTo($email, $name);
            
            // Attachment support
            if (isset($_FILES['specification']) && $_FILES['specification']['error'] === UPLOAD_ERR_OK) {
                $mail->addAttachment($_FILES['specification']['tmp_name'], $_FILES['specification']['name']);
            }
            
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $htmlBody;
            
            if ($mail->send()) {
                echo json_encode(['success' => true]);
                exit;
            }
        } catch (Exception $e) {
            // Log or ignore to fallback below
        }
    }
}

// 4. Native PHP mail() with attachment multipart encoder Fallback
$boundary = md5(time());
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: {$name} <{$recipient}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// Multipart body formatting
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlBody . "\r\n";

if (isset($_FILES['specification']) && $_FILES['specification']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['specification']['tmp_name'];
    $fileName = $_FILES['specification']['name'];
    $fileSize = $_FILES['specification']['size'];
    $fileType = $_FILES['specification']['type'];

    if (is_uploaded_file($fileTmpPath)) {
        $handle = fopen($fileTmpPath, "r");
        $content = fread($handle, $fileSize);
        fclose($handle);
        $encodedContent = chunk_split(base64_encode($content));

        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: {$fileType}; name=\"{$fileName}\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $encodedContent . "\r\n";
    }
}
$body .= "--{$boundary}--";

if (mail($recipient, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'PHP mail delivery failed on the host server.'
    ]);
}

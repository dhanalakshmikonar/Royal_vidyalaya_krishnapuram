<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    $to = "konardhanalakshmi@gmail.com";
    $subject = "New Contact Message from Royal Vidyalaya";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully.'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Failed to send message.'); window.history.back();</script>";
    }
} else {
    echo "Invalid request.";
}
?>

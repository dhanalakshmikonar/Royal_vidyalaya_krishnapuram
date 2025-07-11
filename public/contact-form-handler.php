<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize input
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    // Set destination email
    $to = "konardhanalakshmi@gmail.com";
    $subject = "New Contact Us Submission from Royal Vidyalaya Website";

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $body = "You have received a new message:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Thank you! Your message has been sent.');window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Message could not be sent. Please try again later.');window.history.back();</script>";
    }
} else {
    // If not POST request
    http_response_code(403);
    echo "Forbidden";
}
?>

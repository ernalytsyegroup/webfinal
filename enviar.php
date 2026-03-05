
<?php
// Incluir PHPMailer
require 'js/PHPMailer-master/src/PHPMailer.php';
require 'js/PHPMailer-master/src/SMTP.php';
require 'js/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$destino = "soporte.mariangelmujica@gmail.com";
$asunto = "Nuevo registro de formulario";

$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';

$cuerpo = "Nombre: $nombre<br>";
$cuerpo .= "Email: $email<br>";
$cuerpo .= "Mensaje: $mensaje<br>";

$mail = new PHPMailer(true);
try {
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'soporte.mariangelmujica@gmail.com'; // Tu correo Gmail
    $mail->Password = 'mutnxeyhhtjpcsji'; // Tu contraseña de aplicación
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Remitente y destinatario
    $mail->setFrom($email, $nombre);
    $mail->addAddress($destino);
    $mail->addReplyTo($email, $nombre);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $asunto;
    $mail->Body    = $cuerpo;

    $mail->send();
    echo "Gracias por registrarte. Tu información ha sido enviada.";
} catch (Exception $e) {
    echo "Hubo un error al enviar el formulario. Intenta de nuevo.<br>";
    echo "Error: " . $mail->ErrorInfo;
}
?>

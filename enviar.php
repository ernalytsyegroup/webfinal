
<?php
// Incluir PHPMailer
require 'js/PHPMailer-master/src/PHPMailer.php';
require 'js/PHPMailer-master/src/SMTP.php';
require 'js/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$destino = "soporte.mariangelmujica@gmail.com";
$asunto = "Nuevo registro de formulario";



$nombre = $_POST["fullname"] ?? '';
$codigo = $_POST["code"] ?? '';
$celular = $_POST["phone"] ?? '';
$pais = $_POST["country"] ?? '';
$correo = $_POST["email"] ?? '';

$cuerpo = "Nombre: $nombre<br>";
$cuerpo .= "Código país: $codigo<br>";
$cuerpo .= "Celular: $celular<br>";
$cuerpo .= "País: $pais<br>";
$cuerpo .= "Correo: $correo<br>";

$mail = new PHPMailer(true);
try {
        echo '<div style="background:#ffeeba;color:#856404;padding:12px 18px;margin:24px 0;border-radius:8px;font-size:1.05rem;">Intentando enviar correo...</div>';
    // Configuración SMTP servidor propio
    $mail->isSMTP();
    $mail->Host = 'c2671731.ferozo.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'notificaciones@bigleapgroup.website';
    $mail->Password = 'SoloDios24/';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Remitente y destinatario
    $mail->setFrom('noreply@' . $_SERVER['SERVER_NAME'], 'Formulario Web');
    $mail->addAddress($destino);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $asunto;
    $mail->Body    = $cuerpo;

    if($mail->send()) {
        echo '<div style="background:#d4edda;color:#155724;padding:12px 18px;margin:24px 0;border-radius:8px;font-size:1.05rem;">Correo enviado correctamente.</div>';
        echo '<div style="text-align:center;margin-top:40px;">'
            . '<img src="https://bigleapgroup.website/models/MM%202025%202.png" alt="Logo" style="max-width:120px;margin-bottom:24px;">'
            . '<h2 style="color:#222;font-size:1.3rem;">¡Gracias por contactarnos!</h2>'
            . '<p style="color:#444;font-size:1.08rem;">Tu información ha sido enviada correctamente.</p>'
            . '</div>';
    } else {
        echo '<div style="background:#f8d7da;color:#721c24;padding:12px 18px;margin:24px 0;border-radius:8px;font-size:1.05rem;">Error al enviar el correo.</div>';
    }
} catch (Exception $e) {
    echo "Hubo un error al enviar el formulario. Intenta de nuevo.<br>";
    echo "Error: " . $mail->ErrorInfo;
}
?>

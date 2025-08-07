<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $game_ref = htmlspecialchars($_POST["game_ref"] ?? "", ENT_QUOTES, 'UTF-8');
    $email   = htmlspecialchars($_POST["email"] ?? "", ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST["message"] ?? "", ENT_QUOTES, 'UTF-8');
    $wants_interpretation = isset($_POST["request_interpretation"]);
    $wants_board_game     = isset($_POST["order_board_game"]);

    // Who receives the email
    $to = "hra@kameny.life";

    // Subject line
    $subject = "Kameny: Zpetna vazba od $email";

    // Message body
    $body .= "Email: $email\n\n";
    $body .= "Požadavky: \n- Výklad: ";
    if ($wants_interpretation) {
        $body .= "Ano.";
    } else {
      $body .= "Ne.";
    }
    $body .= "\n- Desková hra: ";
    if ($wants_board_game) {
      $body .= "Ano.";
    } else {
      $body .= "Ne.";
    }
    $body .= "\nPrůběh hry: https://kameny.life/#$game_ref";
    $body .= "\n\nVlastní zpráva:\n$message\n";

    $headers  = "From: no-reply@kameny.life\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Odesláno, brzy se vám ozveme.";
    } else {
        echo "Omlouváme se, ale zprávu se nepodařilo odeslat. Napište nám na adresu <a href='mailto:hra@kameny.life'>hra@kameny.life</a>.";
    }
}
?>

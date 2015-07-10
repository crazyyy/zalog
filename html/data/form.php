<?php

date_default_timezone_set('Europe/Moscow');
// User settings
$to = "usov@cfservices.ru";
$subject = "Кредит под залог недвижимости";

if(@$_POST["hidden"])
  {
    $dt=date("d F Y, H:i:s"); // дата и время

    $fnm=$_POST["name"];

    $fnm=htmlspecialchars($fnm); // обрабатываем


    $email = $_POST["email"];; // e-mail откуда письмо
    $phone = $_POST["phone"];
    $credit_value = $_POST["summ"];
    $residence_region = $_POST["region"];
    $residence_registration = $_POST["region_registration"];
    $pledge_object = $_POST["object_type"];
    $age = $_POST["age"];

    $mess.="Имя: $fnm\n";
    $mess.="Телефон: $phone\n";
    $mess.="Сумма: $credit_value\n";
    $mess.="Регион: $residence_region\n";
    $mess.="Тип объекта: $pledge_object\n";
    $mess.="Возраст: $age\n";
    $mess.="Сумма: $credit_value\n";
    $mess .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
    $mess .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];

    $headers = "From: $email\n";
    $headers .= "X-Mailer: PHP/SimpleModalContactForm\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/plain; charset=utf-8\n";
    $headers .= "Content-Transfer-Encoding: quoted-printable\n";
    mail($to, $subject, $mess, $headers); // отправляем
  }
?>

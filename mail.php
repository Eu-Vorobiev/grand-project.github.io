<?php
	$name      = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
	$username  = filter_var($_POST["username"], FILTER_SANITIZE_STRING);
	$email     = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
	$errors;

	if ( empty($name)) {
		$errors = "PLease, enter Your name";
	} else {
		$userName = $name;
	}

	if (empty($userName)) {
		$errors = "Please, enter Your Username";
	} else {
		$nickName = $username;
	}

	if (empty($email)) {
		$errors = "Please, enter Your Email";
	} else {
		$userEmail = $email;
	}


	$to = "info@vorobieveu.ru"; 
	$mailBody = "Регистрация нового пользователя\n"; 
	$mailBody .= "Name: " . $userName . "\n";
	$mailBody .= "Email: " . $userEmail . "\n";
	$mailBody .= "Nickname: " . $nickName . "\n";

	if (mail($to, 'Регистрация нового пользователя', $mailBody)) {
			$output = "ok";
			die($output);
	} else {
			$output = $errors;
			die($output);
	}
?>
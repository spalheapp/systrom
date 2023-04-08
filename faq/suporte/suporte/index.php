<?php

	header('Content-Type: text/html; charset=utf-8');

	$lang = isset($_GET['lang']) ? true : false;

	$json = json_decode(file_get_contents('translate.json'));

	// $json = json_decode($json);

	$file = 'https://systrom.online/faq';

	if(!$lang):

		include '../suporte.php';

	else:

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL,$file);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$page = curl_exec($ch);

		curl_close($ch);

		foreach($json as $key => $row):

			$page = str_replace($key, $row, $page);

		endforeach;

		echo $page;

	endif;

?>
<?php
	//	   ___            _               _      _             
	//	  / _ \__ _ _   _| | ___   /\   /(_) ___| |_ ___  _ __ 
	//	 / /_)/ _` | | | | |/ _ \  \ \ / / |/ __| __/ _ \| '__|
	//	/ ___/ (_| | |_| | | (_) |  \ V /| | (__| |_ (_) | |   
	//	\/    \__,_|\__,_|_|\___/    \_/ |_|\___|\__\___/|_|   
	//
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////                   System made by Paulo Victor - Skype: traindesign                   ////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/// Sign this configurations to change somethings that the site need to get on

	$site = '';
	$sitename = '';
	$slogan = '';
	$ip = '';
	$port = '';
	$protection = 'false'; /// If you have a player, you must active this protection to have a good security
	/// If you want to active, put there 'true' ///
	/// If you want to take off protection put there 'false' ///

	/// Iniatializing the configuration

	$server = 'localhost';
	$user = 'root';
	$password = 'oi';
	$db = '';
	$conn = new mysqli($server, $user, $password, $db);
	/// Checking a problem or error with configuration
	if($conn->connect_error){
		die('There is a problem in mysqli connection!');
	}
?>
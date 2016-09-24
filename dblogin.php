<?php
/*-------------------------
This php file is included when a file needs to access the database.
--------------------------*/
$dbuser = "cschafer";   //Sets the username for the database.
$dbpass = "3wasdar";    //Sets the password for the database.
$db = "SSID";           //Sets the database name.

/*-------------------------
Sets the variable $connect.
Used to connect to the oracle database.
--------------------------*/
$connect = oci_connect($dbuser,$dbpass,$db);
/*-------------------------
If the connection fails then echo this error.
--------------------------*/
if(!$connect){
	echo "An error occured connecting to the database";
	exit;
}
?>

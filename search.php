<?php
/*-------------------------
Ajax Request to this php file.
This php file will process the AJAX request.
Will echo the result, which will be displayed in the users browser.
$keywords
$light
$minPrice
$maxPrice
--------------------------*/

/*-------------------------
Include the dblogin.php file that will allow connection to the oracle databse.
--------------------------*/
include("dblogin.php");
//connection to the database is started.

$sqlKeyword = "select * from plants";
$sqlSearch = oci_parse($connect,$sqlKeyword);
if(!$sqlSearch){
  echo "An error occurred in parsing the sql string.\n";
  exit;
}
oci_execute($sqlSearch);
/*-------------------------
loop for finding plant features and then setting features to a string within an array.
common: Common Name.
botan: Botanical Name.
price: Price.
descrip: Description.
lightlevels: Light Levels.
seasons: Seasons.
zone: Zone.
--------------------------*/
$countMatches = 10;
$plantInfo = array();
$incr = 0;
$pregCheck = "/$keywords/i";

while(oci_fetch_array($sqlSearch)){
  $common = oci_result($sqlSearch,"COMMON");
  $botan = oci_result($sqlSearch,"BOTAN");
  $price = oci_result($sqlSearch,"PRICE");
  $descrip = oci_result($sqlSearch,"DESCRIP");
  $lightlevels = oci_result($sqlSearch,"LIGHTLEVELS");
  $seasons = oci_result($sqlSearch,"SEASONS");
  $zone = oci_result($sqlSearch,"ZONE");
  $plantInfo[$incr] = $common . "||" . $botan . "||" . $price . "||" . $descrip . "||" . $lightlevels . "||" . $seasons . "||" . $zone;
  $incr++;
}
oci_close($connect);

$count = 0;
$check = 0;
$plantCheck = array();
while($count < count($plantInfo)){
  //echo $plantInfo[$count] . "<br>";
  $keywordCheck = $plantInfo[$count];
  //echo "<span style='color:red'>" . preg_match($pregCheck,$keywordCheck) . "</span><br><br>";
  if(preg_match($pregCheck,$keywordCheck)){
    $plantCheck[$check] = $keywordCheck;
    $check++;
  }
  $count++;
}
$count = 0;
while($count < count($plantCheck)){
  echo "<span class='resp' style='color:blue'>" . $plantCheck[$count] . "</span><br class='resp'><br class='resp'>";
  $count++;
}

if($light != ""){


}






/*-------------------------
Comment layout
--------------------------*/
?>

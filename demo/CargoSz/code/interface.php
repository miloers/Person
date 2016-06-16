<?php 
      include 'class.php';
      $HScode=@@$_POST['HSCode'];
      $CargoName=@@$_POST['CargoName'];
	$LoginPassword="";
      $SzSearch = new SzSearch();
      $SzResult=$SzSearch->getSearch($HScode,$CargoName,$LoginPassword); 
      $Number = sizeof(json_decode($SzResult,true));
      echo $Number;
      echo "+";
      echo $SzResult;
?>

 


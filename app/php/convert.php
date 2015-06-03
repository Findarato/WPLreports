<?php
include "classes/db.class.php";
$db = db::getInstance();

$query["Adult Fiction"] = "SELECT * FROM ItemCirculationStats WHERE items IN ('Book - Adult Fiction Hardcover' , 'Book - Leased Fiction' ,'Book - NEW' , 'Book - Young Adult Fiction','Large Print - Fiction') GROUP BY branch, transactions;";
$query["Adult Non-Fiction"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Book - Adult Non-Fiction Hardcover" ,  "Book - Leased Non-Fiction" ,  "Book - Reference" ,  "Book - Young Adult Non-Fiction" , "College Catalog" ) GROUP BY Branch, transactions;';
$query["Adult Paperback"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Book - Adult Paperback" ,  "Book - Young Adult Paperback" ) GROUP BY Branch, transactions;';
$query["Compact Disc"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "CD - Audio" ,  "CD - Book" ,  "CD - ROM" ) GROUP BY Branch, transactions;';
$query["DVD"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "DVD" ) GROUP BY Branch, transactions;';
$query["Electronic Games"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Electronic Games" ) GROUP BY Branch, transactions;';
$query["Game/Toy"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Game/Toy") GROUP BY Branch, transactions;';
$query["Juvenile Fiction"] = "SELECT * FROM ItemCirculationStats WHERE items IN ('Board Book' , 'Book - Juvenile Fiction Hardcover' ,'EASY Reader - Fiction' , 'Picture Book') GROUP BY branch, transactions;"; 
$query["Juvenile Non-Fiction"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Book - Juvenile Non-Fiction Hardcover" , "EASY Reader - Non-Fiction") GROUP BY Branch, transactions;';
$query["Juvenile Paperback"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Book - Juvenile Paperback" ) GROUP BY Branch, transactions;';
$query["Other Media"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "MP3 - Book" , "Newspaper" , "Realia" , "Study Notes" , "USB Drive" , "Audiotape - Cassette" , "Audiotape - Language") GROUP BY Branch, transactions;';
$query["Periodical"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Periodical") GROUP BY Branch, transactions;';
$query["Video Tape"] = 'SELECT * FROM `ItemCirculationStats` WHERE Items IN ( "Videotape - Fiction" , "Videotape - Language" , "Videotape - Non-Fiction" , "Videotape") GROUP BY Branch, transactions;';

foreach($query as $key => $value){
	$value = "CREATE TEMPORARY TABLE ICS ".$value;
	$db->Query($value,"FALSE","assoc_array");
	$result = $db->Query("SELECT date,branch,items,SUM(transactions) AS transactions FROM ICS GROUP BY branch","FALSE","assoc_array");
	$db->Query("DROP TABLE ICS;","FALSE","row");
//  echo "DELETE FROM CircStatsCategorized WHERE ReportMonth = '".$r['date']."'<br>";
  foreach($result as $r){
    echo "INSERT INTO CircStatsCategorized VALUES('".$r['date']."','".$r['branch']."','".$key."','".$r['transactions']."');";
    echo "<br>";
  }

  //$db->Query("INSERT INTO")
  //echo "<pre>";
  //print_r($result);
  //echo "</pre>";
}

<?Php
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Sun, 08 Aug 1982 01:52:00 GMT');
  header('Content-type: application/json');
  date_default_timezone_set( 'America/Chicago' );
  include "dbConnect.inc.php";
  $mysqli = mysqli_connect($host,$user,$password,$database);

  $fullTable = array();


  //get all the categories filter_list
  $query ="SELECT * FROM CircStatsCategorized ORDER BY ReportMonth;";
  $res = $mysqli->query($query);



//  $fullTable = $db->Query("SELECT * FROM CircStatsCategorized ORDER BY ReportMonth;","FALSE","assoc_array");

  while($row = $res->fetch_assoc()){
     $fullTable[] = $row;
  }
  //$fullTable = $db->Query("","FALSE","assoc_array");
  //print_r($fullTable);
  //print_r($db);

  echo json_encode($fullTable);

?>

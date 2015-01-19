<?Php
  include "classes/db.class.php";
  $db = db::getInstance();
  date_default_timezone_set( 'America/Chicago' );


  $fullTable = $db->Query("SELECT * FROM CircStatsCategorized ORDER BY ReportMonth;","FALSE","assoc_array");
  //$fullTable = $db->Query("","FALSE","assoc_array");
  //print_r($fullTable);
  //print_r($db);

  echo json_encode($fullTable);

?>

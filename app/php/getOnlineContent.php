<?Php
include "dbConnect.inc.php";
$mysqli = mysqli_connect($host,$user,$password,$database);

$query = "SELECT * FROM onlineContent ORDER BY date DESC;";

$res = $mysqli->query($query);
$json = array();

while($row = $res->fetch_assoc()){

   $json["dates"][] = $row["date"];
   $json["data"][$row["category"]][] = $row["amount"];
}



print json_encode($json);

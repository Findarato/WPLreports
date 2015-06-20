<?Php
include "databaseConnect.php";
$mysqli = mysqli_connect($host,$user,$password,$dataabse);

$res = mysqli_query($mysqli,"SELECT * FROM onlineContent ORDER BY date DESC;");
$assoc = mysqli_fetch_assoc($res);

print "<pre>";
echo json_encode($assoc);
print "</pre>";

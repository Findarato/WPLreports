<?php
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Sun, 08 Aug 1982 01:52:00 GMT');
  header('Content-type: application/json');
  include "dbConnect.inc.php";
  $mysqli = mysqli_connect($host,$user,$password,$database);

  $json = array();


//get all the categories filter_list
  $query = "SELECT category FROM onlineContent GROUP BY category;";
  $res = $mysqli->query($query);
  $ocCategories = array();
  while($row = $res->fetch_assoc()){
     $ocCategories[] = $row['category'];
  }

/*
@TODO loop though the categoeis and then make a query based on eacy one of
them to create an array specifially for each of them. This is not the best
solution but it is probably the quickist. It will also scale

*/


//Adding the dates to the array
  $query = "SELECT date FROM onlineContent ORDER BY date DESC;";
  $res = $mysqli->query($query);
  while($row = $res->fetch_assoc()){
    $json["dates"][] = $row["date"];
  }

//Adding the data to the graph
  foreach($ocCategories as $key=>$oc){
    $query = "SELECT * FROM onlineContent ORDER BY date DESC;";
    $res = $mysqli->query($query);
    $json["info"][$key]["name"] = $oc;
    while($row = $res->fetch_assoc()){
      $json["info"][$key]["data"][] = intval($row["amount"]);
    }
  }
rint json_encode($json,JSON_PRETTY_PRINT);

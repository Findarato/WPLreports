<?php
  include "dbConnect.inc.php";
  $mysqli = mysqli_connect($host,$user,$password,$database);


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
  $query = "SELECT * FROM onlineContent ORDER BY date DESC;";

  $res = $mysqli->query($query);
  $json = array();

  while($row = $res->fetch_assoc()){

     $json["dates"][] = $row["date"];
     $json["info"][]["name"] = $row["category"];
     $json["info"][]["data"] = $row["amount"];

  }



  print json_encode($json);

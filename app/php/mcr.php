<?php
  include "classes/db.class.php";
  $db = db::getInstance();
  $returnData = array();
  $compairMonth = "";
  $currentMonth = "";
  date_default_timezone_set( 'America/Chicago' );

  if(is_numeric($_POST["year"])) $year = $_POST["year"];else die("Bad Year");

  if(is_numeric($_POST["month"])) $month = $_POST["month"];else die("Bad Month");

  $month = $month-1;
  $compMonth = $month;
  $month = str_pad($month,2,"0",STR_PAD_LEFT);
  $currentMonth = $year."-".str_pad($month,2,"0",STR_PAD_LEFT)."-01";
  $compaireMonth = ($year-1)."-".$month."-01";
  $curYear = $year;
  $compYear = ($year-1);


  $returnData["month"] = $month."-01-".$year;
  $returnData["branches"] = array("Thomas Library","Hageman Library");

  $tlCur = $db->Query("SELECT CSC.ReportMonth AS ReportMonth1,  CSC.Group AS Group1, SumOfCheckouts AS SumOfCheckouts1 FROM CircStatsCategorized AS CSC WHERE CSC.ReportMonth='".$currentMonth."' AND CSC.Branch='Thomas Library' ORDER BY CSC.Group;","FALSE","assoc_array");
  $tlComp = $db->Query("SELECT CSC.ReportMonth AS ReportMonth2,  CSC.Group AS Group1, SumOfCheckouts AS SumOfCheckouts2 FROM CircStatsCategorized AS CSC WHERE CSC.ReportMonth='".$compaireMonth."' AND CSC.Branch='Thomas Library' ORDER BY CSC.Group;","FALSE","assoc_array");
  $tlCurYTD = $db->Query("SELECT CSC.Group AS Group1,SUM(CSC.SumOfCheckouts) AS YTD1 FROM CircStatsCategorized AS CSC WHERE ( YEAR(CSC.ReportMonth)='".$curYear."' AND CSC.Branch = 'Thomas Library' AND MONTH(CSC.ReportMonth) BETWEEN 01 AND '".$month."') GROUP BY Group1 ORDER BY Group1;","FALSE","assoc_array");
  $tlCompYTD = $db->Query("SELECT CSC.Group AS Group1,SUM(CSC.SumOfCheckouts) AS YTD2 FROM CircStatsCategorized AS CSC WHERE ( YEAR(CSC.ReportMonth)='".$compYear."' AND CSC.Branch = 'Thomas Library' AND MONTH(CSC.ReportMonth) BETWEEN 01 AND '".$month."') GROUP BY Group1 ORDER BY Group1;","FALSE","assoc_array");
  $returnData["Thomas Library"] = array_merge($tlCur,$tlComp, $tlCurYTD, $tlCompYTD);

  $hlCur = $db->Query("SELECT CSC.ReportMonth AS ReportMonth1,  CSC.Group AS Group1, SumOfCheckouts AS SumOfCheckouts1 FROM CircStatsCategorized AS CSC WHERE CSC.ReportMonth='".$currentMonth."' AND CSC.Branch='Hageman Library' ORDER BY CSC.Group;","FALSE","assoc_array");
  $hlComp = $db->Query("SELECT CSC.ReportMonth AS ReportMonth2,  CSC.Group AS Group1, SumOfCheckouts AS SumOfCheckouts2 FROM CircStatsCategorized AS CSC WHERE CSC.ReportMonth='".$compaireMonth."' AND CSC.Branch='Hageman Library' ORDER BY CSC.Group;","FALSE","assoc_array");
  $hlCurYTD = $db->Query("SELECT CSC.Group AS Group1,SUM(CSC.SumOfCheckouts) AS YTD1 FROM CircStatsCategorized AS CSC WHERE ( YEAR(CSC.ReportMonth)='".$curYear."' AND CSC.Branch = 'Hageman Library' AND MONTH(CSC.ReportMonth) BETWEEN 01 AND '".$month."') GROUP BY Group1 ORDER BY Group1;","FALSE","assoc_array");
  $hlCompYTD = $db->Query("SELECT CSC.Group AS Group1,SUM(CSC.SumOfCheckouts) AS YTD2 FROM CircStatsCategorized AS CSC WHERE ( YEAR(CSC.ReportMonth)='".$compYear."' AND CSC.Branch = 'Hageman Library' AND MONTH(CSC.ReportMonth) BETWEEN 01 AND '".$month."') GROUP BY Group1 ORDER BY Group1;","FALSE","assoc_array");
  $returnData["Hageman Library"] = array_merge($hlCur,$hlComp, $hlCurYTD, $hlCompYTD);


  //$returnData["Thomas Library"]["alt"]=array();
  foreach($returnData["Thomas Library"] as $v){
    if(isset($v["ReportMonth1"])){
      $tempDataT[$v["Group1"]]["month"]=$v["ReportMonth1"];
    }
    if(isset($v["SumOfCheckouts1"])){
      $tempDataT[$v["Group1"]]["SOC1"]=$v["SumOfCheckouts1"];
    }
    if(isset($v["SumOfCheckouts2"])){
      $tempDataT[$v["Group1"]]["SOC2"]=$v["SumOfCheckouts2"];
    }
    if(isset($v["YTD2"])){
      $tempDataT[$v["Group1"]]["YTD1"]=$v["YTD2"];
    }
    if(isset($v["YTD1"])){
      $tempDataT[$v["Group1"]]["YTD2"]=$v["YTD1"];
    }
  }
  $returnData["Thomas Library"] = $tempDataT;

  foreach($returnData["Hageman Library"] as $v){
    if(isset($v["ReportMonth1"])){
      $tempDataH[$v["Group1"]]["month"]=$v["ReportMonth1"];
    }
    if(isset($v["SumOfCheckouts1"])){
      $tempDataH[$v["Group1"]]["SOC1"]=$v["SumOfCheckouts1"];
    }
    if(isset($v["SumOfCheckouts2"])){
      $tempDataH[$v["Group1"]]["SOC2"]=$v["SumOfCheckouts2"];
    }
    if(isset($v["YTD2"])){
      $tempDataH[$v["Group1"]]["YTD1"]=$v["YTD2"];
    }
    if(isset($v["YTD1"])){
      $tempDataH[$v["Group1"]]["YTD2"]=$v["YTD1"];
    }
  }
  $returnData["Hageman Library"] = $tempDataH;


  echo json_encode($returnData);
?>

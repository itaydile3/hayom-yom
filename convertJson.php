<?php
require 'createConnection.php';

$rawData = $_POST['data'];
$date_val = array_keys($rawData)[0];
$id_val = $rawData[$date_val]['id'];
$title_val = str_replace("'", "''", $rawData[$date_val]['title']);
$link_val = $rawData[$date_val]['link'];

//in case title has date
if ($_POST['titleDate']){
  $title_val_date = substr($title_val, strlen($title_val) - 10, strlen($title_val));
  $date_val_exp = explode(' ',  $title_val_date);
  $date_val = "$date_val_exp[2]-$date_val_exp[1]-$date_val_exp[0]";
  $title_val = substr($title_val, 0,strlen($title_val) - 11);
}

$sql = "INSERT INTO `videos`(`vid_id`, `date`, `title`) VALUES ('$id_val','$date_val','$title_val')";
//print_r("INSERT INTO `videos`(`vid_id`, `date`, `title`) VALUES ('$id_val','$date_val','$title_val')");

if (mysqli_query($conn, $sql)) {
  echo "$id_val created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}









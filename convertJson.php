<?php
require 'createConnection.php';

$rawData = $_POST['data'];
$date_val = array_keys($rawData)[0];
$id_val = $rawData[$date_val]['id'];
$title_val = str_replace("'", "''", $rawData[$date_val]['title']);
$link_val = $rawData[$date_val]['link'];

$sql = "INSERT INTO `videos`(`vid_id`, `date`, `title`) VALUES ('$id_val','$date_val','$title_val')";
//print_r("INSERT INTO `videos`(`vid_id`, `date`, `title`) VALUES ('$id_val','$date_val','$title_val')");

if (mysqli_query($conn, $sql)) {
  echo "$id_val created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}









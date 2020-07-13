<?php
require 'createConnection.php';

$sql = "SELECT `date` FROM `videos` ORDER BY `date` ASC";
$result = $conn->query($sql);

$datesArr = [];

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $datesArr[] = $row["date"];
  }
} else {
  echo "0 results";
}
$conn->close();

$jsonstring = json_encode($datesArr);
echo $jsonstring;

<?php

require 'createConnection.php';

$selectedDateRaw = $_POST['selectedDate'];
$selectedDate = date("Y-m-d", strtotime($selectedDateRaw));

$sql = "SELECT `vid_id`,`title` FROM `videos` WHERE `date` = '$selectedDate'";
$result = $conn->query($sql);
$rows = $result->fetch_all();

$jsonstring = json_encode($rows);
echo $jsonstring;

$conn->close();


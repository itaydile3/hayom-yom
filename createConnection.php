<?php
$servername = "localhost";
$username = "minute4soul";
$password = "jghj3455FHG765Fjh576567@jlkjkljkl";
$database = "minute4soul";

header('Content-Type: text/html; charset=utf-8');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);
$conn->query("set names 'utf8'");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

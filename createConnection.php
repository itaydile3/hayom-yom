<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "hayom";

header('Content-Type: text/html; charset=utf-8');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
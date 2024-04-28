<?php
header("Access-Control-Allow-Origin: *");

// Retrieve the name from the POST request
$name = $_POST['name'];

// Sample data to be sent back
$data = array(
  'name' => $name,
  'age' => 30,
  'city' => 'New York'
);
$data2 = array(
  'name' => $data,
  'age' => 30,
  'city' => 'New York'
);

// Convert data to JSON
$json_data = json_encode($data);

// Send JSON response
header('Content-Type: application/json');
// echo $json_data;
echo "this is php";
// echo $json_data;

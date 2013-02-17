<?php
/**
 * jQuery RoughDraft.js Plugin
 * @copyright Nick Dreckshage, licensed GPL & MIT
 *
 * This creates an API for the open source PHP faker port 
 * https://github.com/fzaninotto/Faker
 */

// load and initialize the program
require_once '../faker/src/autoload.php';
$faker = Faker\Factory::create();

// if number is set and in correct format, set number to that. or set default of 1
if (isset($_REQUEST["number"]) && intval($_REQUEST["number"])) {
  $number_requested = intval($_REQUEST["number"]);
} else {
  $number_requested = 1;
}

// serve a max of 500 results per request
$number_requested < 1 ? $number_requested = 1 : $number_requested;
$number_requested > 500 ? $number_requested = 500 : $number_requested;

// set up array to hold all results
$to_return = array();

/**
 * grab new random information from generator for each number request
 * then format the data into an array to be used in javascript
 */
while ($number_requested > 0) {
  
  $item = array();

  $item['user']['first'] = htmlentities($faker->firstName());
  $item['user']['last'] = htmlentities($faker->lastName());
  $item['user']['email'] = htmlentities($faker->email());
  $item['user']['phone'] = htmlentities($faker->phoneNumber());
  $item['user']['username'] = htmlentities($faker->username());
  
  $item['place']['address'] = htmlentities($faker->streetAddress());
  $item['place']['city'] = htmlentities($faker->city());
  $item['place']['state'] = htmlentities($faker->state());
  $item['place']['zip'] = htmlentities($faker->postcode());
  $item['place']['country'] = htmlentities($faker->country());
  
  array_push($to_return, $item);
  $number_requested--;
}

/**
 * format the data to json and json p
 * this will then be used through jquery ajax call
 */
if (isset($_REQUEST["callback"])) {
  header("Content-Type: application/javascript");
  echo $_GET['callback'] . '(' . json_encode($to_return) . ')';
} else {
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode($to_return);
}

exit;
?>
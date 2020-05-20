<?php
$dbh = new PDO("mysql:host=localhost;dbname=at215loc_velocity", "root", "");
$id = isset($_GET['id'])? $_GET['id'] : "";
$stat = $dbh->prepare("select * from myblob where id=?");
$stat->bindParam(1, $id);

$stat->execute();

$row = $stat->fetch();

header( 'Content-Type: '.$row[ 'mime' ]);

echo $row[ 'data'];
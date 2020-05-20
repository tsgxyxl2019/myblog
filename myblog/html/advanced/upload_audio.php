<?php
    $dbh = new PDO("mysql:host=localhost;dbname=at215loc_velocity", "root", "");
   
    if(isset($_POST['btn'])){
        $name = $_FILES['myfile']['name'];
        $type = $_FILES['myfile']['type'];
        $data = file_get_contents($_FILES['myfile']['tmp_name']);
        $stmt = $dbh->prepare("insert into myblob value('', ?, ?, ?)");
        $stmt->bindParam(1,$name);
        $stmt->bindParam(2,$type);
        $stmt->bindParam(3,$data);
        $stmt->execute();
    }
    ?>
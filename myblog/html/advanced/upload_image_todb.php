<?php

// $db_type = env('DB_CONNECTION', 'mysql');
// $db_host = env('DB_HOST', 'localhost');
// $db_port = env('DB_PORT', 3306);
// $db_name = env('DB_DATABASE', 'at215loc_velocity');
// $db_username = env('DB_USERNAME', 'root');
// $db_password = env('DB_PASSWORD', '');

$conn = mysqli_connect('localhost', 'root', '', 'at215loc_velocity', 3306);
if (!$conn) {
    die('Connection error: '.mysqli_connect_error());
    return false;
}else {
    echo "已连上数据库";
}


// //5 准备sql语句
// $sql = "select * from asqanswer";
	
// //6 发送sql语句
// $res = mysqli_query($conn,$sql);

// //7 处理数据
// $row = mysqli_fetch_array($res);
// var_dump($res);


// mysqli_close($conn);


 
// 判断action
$action = isset($_REQUEST['action'])? $_REQUEST['action'] : '';
 
 
// 上传图片
if($action=='add'){
 
    $image = mysqli_escape_string(file_get_contents($_FILES['photo']['tmp_name']));
    $type = $_FILES['photo']['type'];
    $sqlstr = "insert into photo(type,binarydata) values('".$type."','".$image."')";
 
    @mysqli_query($conn, $sqlstr);
 
    header('location:upload_image_todb.php');
    exit();
 
// 显示图片
}elseif($action=='show'){
 
    $id = isset($_GET['id'])? intval($_GET['id']) : 0;
    $sqlstr = "select * from photo where id=$id";
    $query = mysql_query($sqlstr) or die(mysql_error());
    
    $thread = mysql_fetch_assoc($query);
    
    if($thread){
        header('content-type:'.$thread['type']);
        echo $thread['binarydata'];
        exit();
    }
 
}else{
// 显示图片列表及上传表单
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> upload image to db demo </title>
 </head>
 
 <body>
  <form name="form1" method="post" action="upload_image_todb.php" enctype="multipart/form-data">
  <p>图片：<input type="file" name="photo"></p>
  <p><input type="hidden" name="action" value="add"><input type="submit" name="b1" value="提交"></p>
  </form>
 
<?php
    $sqlstr = "select * from photo order by id desc";
    $query = mysql_query($sqlstr) or die(mysql_error());
    $result = array();
    while($thread=mysql_fetch_assoc($query)){
        $result[] = $thread;
    }
    foreach($result as $val){
        echo '<p><img src="upload_image_todb.php?action=show&id='.$val['id'].'&t='.time().'" width="150"></p>';
    }
?>
 
 </body>
</html>
<?php
}
?>
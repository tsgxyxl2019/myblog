<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

//get_post from html form
function crtArr($post_array){
    $arr = array(); //声明一个空的数组
    $i =1;
    foreach($post_array as $value){ 
        echo $value." /person $i".'<br />'; 
        $arr[$value] = 'Person '.$i;
        $i++;
    } 
    return $arr;
}
$recipient_list = crtArr($_POST['vname']);
$email_title = $_POST['email_title'];
$email_message = $_POST['email_message'];

try {
    // //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    // $mail->isSMTP();                                            // Send using SMTP
    // $mail->Host       = 'smtp1.example.com';                    // Set the SMTP server to send through
    // $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    // $mail->Username   = 'user@example.com';                     // SMTP username
    // $mail->Password   = 'secret';                               // SMTP password
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    // $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    // //Recipients
    // $mail->setFrom('from@example.com', 'Mailer');
    // $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // // Attachments
    // // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // // Content
    // $mail->isHTML(true);                                  // Set email format to HTML
    // $mail->Subject = 'Here is the subject';
    // $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    // $mail->send();

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output

    $mail->IsSMTP();
    
    $mail->CharSet = "UTF-8";
    
    $mail->Encoding = 'base64';
    
    // $mail->SMTPDebug = 0; //是否调试
    
    $mail->SMTPAuth = true;
    
    $mail->Host = 'ssl://smtp.gmail.com:465'; //host
    
    $mail->Port = 25; //端口
    
    $mail->Username = "tsgxyxl0818"; //发件人
    
    $mail->Password = "hfrdxcjfvcqyccen"; //发件人专用密码
    
    $mail->SetFrom("tsgxyxl0818@gmail.com","Daniel_test"); //发件人邮箱和名称
    
    $mail->Subject = $email_title; //标题
    
    $mail->Body = $email_message; //内容
    
    $mail->IsHTML(true); //是否启用html
    
    $mail->AddAddress('1085072143@qq.com'); //单一收件用户

    //群发邮件
    $recipients = array(
        '1085072143@qq.com' => 'Person One',
        '2589422180@qq.com' => 'Person Two',
        // ..
     );


    var_dump($recipients);
    echo "<hr>";
    var_dump($recipient_list);
    foreach($recipient_list as $email => $name)
    {
        $mail->AddCC($email, $name);
    }
    
    $mail->Send();

    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
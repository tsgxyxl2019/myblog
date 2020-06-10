<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        class File_Upload {
            /* 成员变量 */
            var $name; // 文件名
            var $type; // 文件类型
            var $tmpName; // 

            /* 成员函数 */
            function setFileName($fileName){
               $this->name = $fileName;
            }

            function setFileType($fileType){
               $this->type = $fileType;
            }

            function setTmpName($fileTmpName){
                $this->tmpName = $fileTmpName;
            }


            function getFileName(){
            //    echo $this->Name . "<br>";
               return $this->name;
            }

            function getTmpName(){
                //    echo $this->Name . "<br>";
                   return $this->tmpName;
            }

            function getDetails(){
                echo "Upload: " .$this->name . "<br />";
                echo "Type: " . $this->type . "<br />";
                echo "Stored in: " . $this->tmpName."<br />";
                echo "success<br>";
            }

            // 上传至upload文件夹下
            function upload(){
                if ($this->name == "correct_text"){
                    move_uploaded_file($this->tmpName,"../upload/" .$this->name);
                }else{
                    move_uploaded_file($this->tmpName,"../upload/" .$this->name.".wav");
                }
            }

            // 读取txt文件 相当于原题文字 之后会被取代
            function toText(){
                return file_get_contents('../upload/'.$this->name);;
            }

            // 读取音频文件, 得出相应文字
            

    
        }


        if ($_FILES["correct_text"]["error"] > 0)
        {
            echo "Error: " . $_FILES["correct_text"]["error"] . "<br />";
        }
        else
        {
            $text_file = new File_Upload;
            $text_file->setFileName( "correct_text" );
            $text_file->setFileType($_FILES["correct_text"]["type"]);
            $text_file->setTmpName($_FILES["correct_text"]["tmp_name"]);
            $text_file->upload();
            $text_file->getDetails();

            $original_text = $text_file->toText();
        }

        if ($_FILES["audio_file"]["error"] > 0)
        {
            echo "Error: " . $_FILES["audio_file"]["error"] . "<br />";
        }
        else
        {
            $audio_file = new File_Upload;
            $audio_file->setFileName( "upload_audio" );
            $audio_file->setFileType($_FILES["audio_file"]["type"]);
            $audio_file->setTmpName($_FILES["audio_file"]["tmp_name"]);
            $audio_file->upload();
            $audio_file->getDetails();
        }
        // $original_text = file_get_contents('../upload/'.$fileName);
        // $onedata = explode("\r\n",$alldata);
    ?>
    <h3>原文：</h3>
    <p style="color: green"><?php echo "$original_text"?></p>
    <h3>分析区域：</h3>
    
</body>
</html>


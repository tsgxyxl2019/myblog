<?PHP

    $var = 6;
    $var1 = 12;
    $l = exec("python ./py/Helloworld.py  2>error.txt 2>&1",$Array,$ret);
    //exec($String , $Array , $ret)函数有三个参数，$String 表示执行的语句，这里不能直接像Linux系统下一样直接写"python xx.py"而是需要
    //找到python的exe文件的路径 hah.py后面跟了两个参数$var和$var1 表示传给python文件的参数，$Array是json格式的返回集，$ret等于0表示
    //执行成功，等于1表示执行失败。另外！！如果python程序有错误的话，php这边是不会报错的。
    //echo ($l);
    foreach($Array as $value){
        //Print the element out.
        echo $value, '<br>';
    }
    echo $ret;
?> 
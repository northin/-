<?php
  require 'config.php';
  
  $_pass=sha1($_POST['pass']);
  
  $query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}' AND pass='{$_pass}'");
  
  if(mysql_fetch_array($query,MYSQL_ASSOC)){
	  sleep(3);
	  echo(0);//正确
  }else{
	  sleep(3);
	  echo(1);//不正确
  }
  
  mysql_close();


?>
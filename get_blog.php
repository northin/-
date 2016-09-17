<?php
      require 'config.php';
	
	$query = mysql_query("SELECT title,content,data FROM blog ORDER BY data DESC LIMIT 0,3") or die('SQL错误！');
	
	$json = '';
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	
	sleep(3);
	echo '['.substr($json, 0 , strlen($json) - 1).']';

	mysql_close();


?>
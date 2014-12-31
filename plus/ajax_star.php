<?php
/**
 * @id             ajax.php 
 * @name           AJAX�Ǽ���ʾ���ֲ�� FOR DEDECMS
 * @version        ajax.php 213��02��16�� yqsheng
 * @copyright      Copyright (c) 213, yqsheng
 * @linkweb        blog.very68.com, kan.very68.com
 * @license        This is a freeware.
 *
 **/
require_once(dirname(__FILE__)."/../include/common.inc.php");
$id = intval(preg_replace("/[^\d]/",'', $_GET['id']));
$action = (isset($_GET['action']) && !empty($_GET['action'])) ? trim($_GET['action']) : '';
$gscore = $_GET['score'];
$result = $dsql->GetOne("SELECT id,total_votes,total_value,level1_votes,level1_value,level2_votes,level2_value,level3_votes,level3_value,level4_votes,level4_value,level5_votes,level5_value FROM `dede_ratings` WHERE id='$id' ");
if(empty($result['total_votes']))
{
	$votes = 5;
	$value = 44;
	$level='level1';
	if($scores>8){
		$level='level5';
	}elseif($scores>6){
		$level='level4';
	}elseif($scores>4){
		$level='level3';
	}elseif ($scores>2){
		$level='level2';
	}else{
		$level='level1';
	}
	$insert = "INSERT INTO `dede_ratings` (id,total_votes,total_value,'$level'_votes,'$level'_value) VALUES ('$id','$votes','$value',1，'$value');";
	echo $insert;
	$dsql->ExecuteNoneQuery($insert);
	$array1 = $votes;
	$array2 = $value;
}
else
{
	$array1 = $result['total_votes'];
	$array2 = $result['total_value'];
	$level1_votes= round($result['level1_votes']/$array1,2)*100;
	$level2_votes= round($result['level2_votes']/$array1,2)*100;
	$level3_votes= round($result['level3_votes']/$array1,2)*100;
	$level4_votes= round($result['level4_votes']/$array1,2)*100;
	$level5_votes= round($result['level5_votes']/$array1,2)*100;
}
if($action=='videoscore'){ echo "{\"totalVotes\":".$array1.",\"totalValue\":".$array2.",\"level1_votes\":\"".$level1_votes."%\",\"level2_votes\":\"".$level2_votes."%\",\"level3_votes\":\"".$level3_votes."%\",\"level4_votes\":\"".$level4_votes."%\",\"level5_votes\":\"".$level5_votes."%\"}"; }
$cookieName = "very68.com_score_".$id;
$getCookie = $_COOKIE[$cookieName];
if($getCookie=="ok") { echo "havescore"; }
if($action=='score' && $getCookie!="ok")
{
	$scores = $gscore;
	$rscore = ($scores+$array2)/($array1+1);
	$update = "update `dede_ratings` set total_value=total_value+'$scores',total_votes=total_votes+1 ";
	if($scores>8){
		$update=$update.',level5_value=level5_value+'.$scores.',level5_votes=level5_votes+1';
	}elseif($scores>6){
		$update=$update.',level4_value=level4_value+'.$scores.',level4_votes=level4_votes+1';
		
	}elseif($scores>4){
		$update=$update.',level3_value=level3_value+'.$scores.',level3_votes=level3_votes+1';
		
	}elseif ($scores>2){
		$update=$update.',level2_value=level2_value+'.$scores.',level2_votes=level2_votes+1';
		
	}else{
		$update=$update.',level1_value=level1_value+'.$scores.',level1_votes=level1_votes+1';
		
	}
	$update=$update." WHERE id='$id'";
	echo  $update;
	$dsql->ExecuteNoneQuery($update);
	setcookie($cookieName,"ok",time()+60*60*12);
}
?>
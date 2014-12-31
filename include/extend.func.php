<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c 
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);
    
    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");
    
    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);
    
    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);
    
    //返回结果
    return $lit_imglist;
}

function GetMemberInfos($fields,$mid){
	global $dsql; if($mid <= 0){
		$revalue = "Error"; }
		else{
			$row=$dsql->GetOne("select * from dede_member where mid = '{$mid}'");
			if(!is_array($row)){
				$revalue = "Not user"."select * from dede_member where mid = '{$mid}'";
			} else{
				$revalue = $row[$fields];
				if($fields=='face'){
				if(empty($revalue))
				{
					$revalue=($row['sex']=='女')? '/member/templets/images/dfgirl.png' : '/member/templets/images/dfboy.png';
				}
				}
			}
		}
		return $revalue;
}
/**
 * 根据文章关键字 拆分成list
 * Enter description here ...
 */
function GetTagsForArticle($fields){
	$array =  split('\,',$fields) ;
	$revalue="";
	foreach ($array as $key=>$value){
		$revalue.='<a	href="/tags.php?/'.$value.'"><span	class="tag-span">'.$value.'</span></a>';
	}
	return $revalue;
}
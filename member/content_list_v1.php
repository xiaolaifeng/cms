<?php
/**
 * 用户动态ajax显示页
 *
 * @version        $Id: feed.php 1 17:55 2010年7月6日Z tianya $
 * @package        DedeCMS.Helpers
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
require_once(dirname(__FILE__)."/config.php");
CheckRank(0,0);
$menutype = 'config';
AjaxHead();

function quoteReplace($quote)
{
    $quote = str_replace('{quote}','',$quote);
    $quote = str_replace('{title}','',$quote);
    $quote = str_replace('{/title}','',$quote);
    $quote = str_replace('&lt;br/&gt;','',$quote);
    $quote = str_replace('&lt;', '', $quote);
    $quote = str_replace('&gt;', '', $quote);
    $quote = str_replace('{content}','',$quote);
    $quote = str_replace('{/content}','',$quote);
    $quote = str_replace('{/quote}','',$quote);
    return $quote;
}

//选择数据库
$feeds = array();
$type=(empty($type))? "" : $type;
 if ($type=="myarticle"){    
    $sql="select arc.id,arc.typeid,arc.senddate,arc.flag,arc.ismake,arc.channel,arc.arcrank,
        arc.click,arc.title,arc.color,arc.litpic,arc.pubdate,arc.mid
        from `#@__archives` arc  where mid='".$cfg_ml->M_ID."' ORDER BY arc.senddate desc ";
    $dsql->SetQuery($sql);
    $dsql->Execute();
    while ($row = $dsql->GetArray()) {
        if($cfg_soft_lang == 'gb2312') {
            $row['title'] = gb2utf8(htmlspecialchars_decode($row['title'],ENT_QUOTES));
        }else{
            $row['title'] = htmlspecialchars_decode($row['title'],ENT_QUOTES);
        }
        $feeds[] = $row;
    }
} 
$output = json_encode($feeds);
print($output);
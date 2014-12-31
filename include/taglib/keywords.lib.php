<?php
//function GetTags($num,$ltype='new',$InnerText='')
/**
 * TAG调用标签
 *
 * @version        $Id: tag.lib.php 1 9:29 2010年7月6日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
 
/*>>dede>>
<name>TAG调用</name>
<type>全局标记</type>
<for>V55,V56,V57</for>
<description>TAG调用标签</description>
<demo>
{dede:tag sort='new' getall='0'}
<a href='[field:link/]'>[field:tag /]</a>
{/dede:tag}
</demo>
<attributes>
    <iterm>row:调用条数</iterm> 
    <iterm>sort:排序方式 month，rand，week</iterm>
    <iterm>getall:获取类型 0 为当前内容页TAG标记，1为获取全部TAG标记</iterm>
</attributes> 
>>dede>>*/
 
function lib_keywords(&$ctag,&$refObj)
{
    global $dsql,$envs,$cfg_cmsurl;
    //属性处理
    $attlist="row|30,sort|new,getall|0,typeid|0";
    FillAttsDefault($ctag->CAttribute->Items,$attlist);
    extract($ctag->CAttribute->Items, EXTR_SKIP);

    $InnerText = $ctag->GetInnerText();
    if(trim($InnerText)=='') $InnerText = GetSysTemplets('tag_one.htm');
    $revalue = '';

    $ltype = $sort;
    $num = $row;

    $addsql = '';

        $dsql->SetQuery("SELECT * FROM `#@__keywords` order by aid asc  ");
        $dsql->Execute();


    $ctp = new DedeTagParse();
    $ctp->SetNameSpace('field','[',']');
    $ctp->LoadSource($InnerText);
    while($row = $dsql->GetArray())
    {
        $row['keyword'] = htmlspecialchars($row['keyword']);
        $row['link'] = $cfg_cmsurl."/tags.php?/".urlencode($row['keyword'])."/";
        $row['highlight'] = 0;
        foreach($ctp->CTags as $tagid=>$ctag)
        {
            if(isset($row[$ctag->GetName()]))
            {
                $ctp->Assign($tagid,$row[$ctag->GetName()]);
            }
        }
        $revalue .= $ctp->GetResult();
    }
    return $revalue;
}
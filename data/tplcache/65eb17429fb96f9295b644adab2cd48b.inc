<li style="border-top: solid 1px #ddd; height: 75px;">
						<div	style="clear: both; margin: 5px 0px 5px 0px; width: 65%; float: left; font-size: 12px">
							<a class="all-want-txt-a" href="[field:arcurl/]">[field:title/]</a>
							<p style="margin: 5px 0px 5px 0px; font-size: 10px;">
								<strong style="color: #ddd">
								<a		href="[field:arcurl/]"			class="all-want-txt-a-10"> 
								[field:writer/]</a> 
								&nbsp;&nbsp;[field:pubdate function="GetDateMk(@me)"/]</strong>
							</p>
						</div>
							 [field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a  style='line-height: 70px;'  href='{@me['arcurl']}' class='article-img'  target='_blank'><img   style='width:98px;height:43px;padding: 5px 0px 0px 0px' alt='title' src='{@me['litpic']}'/></a>"); [/field:array]
							
					</li>
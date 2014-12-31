<li>
      				[field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>"); [/field:array]
					<a href="[field:arcurl/]" class="title">[field:title/]</a>
					<span class="info">
						<small>推荐级别：</small>[field:softrank function='GetRankStar(@me)'/]
						<small>下载次数：</small>[field:click/]
						<a href="{dede:field name='softlinks'/}">下载</a>
					</span>
					<p class="intro">
						[field:app /]
						<small>app简介：</small><span>[field.app/]</span>
					</p>
				</li>
<li>
      				[field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>"); [/field:array]
					<a href="[field:arcurl/]" class="title">[field:title/]</a>
					<span class="info">
						<small>推荐级别：</small>[field:softrank function='GetRankStar(@me)'/]
						<small>下载次数：</small>[field:click/]
					</span>
					<p class="intro">
						[field:description/]...
					</p>
				</li>
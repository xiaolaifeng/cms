<div class="row app-card">
              <div class="col-xs-3 app-icon">
              		[field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='preview'><img  alt='' width='68' height='68'  src='{@me['litpic']}'/></a>"); [/field:array]
              </div>
              <div class="col-xs-9 app-content">
                <div class="row">
                  <div class="app-title pull-left">
                    <h4><a href="[field:arcurl/]" class="title">[field:title/]</a></h4>
                  </div>
                  <div class="app-device-logo pull-left">
                    <div class="android-logo active pull-left">
                      <em class="fa fa-android"></em>
                    </div>
                    <div class="ios-logo active pull-left">
                      <em class="fa fa-apple"></em>
                    </div>
                    <div class="windows-logo pull-left unsupport">
                      <em class="fa fa-windows"></em>
                    </div>
                  </div>
                  <div class="pull-right">
                    <button class="btn btn-info" >
                    <li class="fa fa-download"></li><a class="btn btn-info"  href="{dede:field name='softlinks'/}">下载</a>
                    </button>
                  </div>
                </div>
                <div class="row">
                	[field:softrank function='GetRankStar(@me)'/]
                  <em class="fa fa-star"></em> <em class="fa fa-star"></em> <em class="fa fa-star"></em> <em class="fa fa-star"></em> <em class="fa fa-star-half-o"></em> 4.5
                </div>
                <div class="row">
	                  <p>[field:app_desc/]</p>
                </div>
              </div>
            </div>
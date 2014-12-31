<div class="dropdown pull-left app-category">
            <button data-toggle="dropdown" id="dropdownMenu1" type="button" class="btn btn-default dropdown-toggle" href="{dede:field.typeurl/}">
            {dede:field name='typename'/} <span class="caret"></span>
            </button>
            <ul aria-labelledby="dropdownMenu1" role="menu" class="dropdown-menu">
             {dede:sql sql='Select * from dede_arctype where reid =~id~'}  
              <li role="presentation"><a href="[field:typeurl/]" tabindex="-1" role="menuitem" class="type[field:id/]">[field:typename /]</a></li>
               {/dede:sql}   
              <li role="presentation"><a href="[field:typeurl/]" tabindex="-1" role="menuitem" class="type">专题</a></li>
            </ul>
          </div>
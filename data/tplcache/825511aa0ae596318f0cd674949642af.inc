<li class="tenint">
		                  	<a href='{dede:field name='typeurl'/}' class=" on{dede:field.id/}">{dede:field name='typename'/}</a>
		                    <ul class='autod' id="dis{dede:field.id/}">
			                   {dede:sql sql='Select * from dede_arctype where reid =~id~'}  
		               {dede:if field.id>10 }---------
						{/dede:if}
			                 <li><a href="../plus/list.php?tid=[field:id/]" class="type[field:id/]">[field:typename /]</a></li>
			                {/dede:sql}    
			                </ul>	
		                  </li>
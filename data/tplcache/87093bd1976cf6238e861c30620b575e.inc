<li class="tenint">
		                  	<a href='[field:typeurl/]' class=" on{dede:field.id/}">{dede:field name='typename'/}</a>
		                    <ul class='autod' id="dis{dede:field.id/}">
			                   {dede:sql sql='Select * from dede_arctype where reid =~id~'}  
			                 <li><a href="[field:typeurl/]" class="type[field:id/]">[field:typename /]</a></li>
			                {/dede:sql}    
			                </ul>	
		                  </li>
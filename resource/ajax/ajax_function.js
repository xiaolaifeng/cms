/**
 * 
 * @param vd
 *            被评分的软件id
 * @param d
 *            被评分次数
 * @param t
 *            总评分
 * @param s
 *            被评分次数
 */
function markVideo(vd) {

	var textStart = Array("很烂", "很烂", "一般", "一般", "不妨一看", "不妨一看", "比较精彩",
			"比较精彩", "棒极了", "棒极了");
	var id = 'BT' + (new Date()).getTime();
	$.ajax({
		type : "GET",
		url : "/plus/ajax_star.php?id=" + vd + "&action=videoscore",
		data : {	},
		dataType : "json",
		success : function(data) {
			$('#startLevel1').width(data.level1_votes);
			$('#startLevel2').width(data.level2_votes);
			$('#startLevel3').width(data.level3_votes);
			$('#startLevel4').width(data.level4_votes);
			$('#startLevel5').width(data.level5_votes);
			var totalValue = data.totalValue;
			var totalVotes = data.totalVotes;
			var y = (Math.round(totalValue / totalVotes * 10) / 10.0) || 0;
			
			var ky = y.toString();
				ky = ky.replace(".","<i>.");
				ky = ky + "</i>";
			$('#starScore').html(ky);
			$('#totalVotes').html(totalVotes);
			$('#MARK_B1').value(1);
			$('#MARK_B2').value(1);
			$('#MARK_B3').value(1);
		}
	});
}
function startm(v) {
	var textStart = Array("很烂", "很烂", "一般", "一般", "不妨一看", "不妨一看", "比较精彩",
			"比较精彩", "棒极了", "棒极了");
	document.getElementById("filmStarScoreTip").innerHTML = textStart[v - 1];
	document.getElementById("start").className = "starB s" + v.toString();
	document.getElementById("filmStarScore").innerHTML = v + "<i>.0</i>"

}
function OnStar(mid, v) {
	var textStart = Array("很烂", "很烂", "一般", "一般", "不妨一看", "不妨一看", "比较精彩",
			"比较精彩", "棒极了", "棒极了");
	$.ajax({
		type : "GET",
		url : "/plus/ajax_star.php?id=" + mid + "&action=score&score="+ v,
		data : {	},
		dataType : "text",
		success : function(obj) {
			var x = '' + obj.responseText;
			if (x.indexOf("havescore") != -1) {
				alert('亲，您已经评过分啦，非常感谢您的参与！');
			} else {
				alert(obj);
				var x = parseFloat($('#MARK_B1').value());//评分人数
				var y = parseFloat($('#MARK_B2').value());//总分：百分比
				var z = parseFloat($('#MARK_B3').value());//总分
				var kx = x + 1;
				var kz = z + v;
				var ky = (Math.round(kz / kx * 10) / 10) || 0;
				$('#MARK_B1').value(kx);
				$('#MARK_B2').value(ky);
				$('#MARK_B3').value(kz);
				var kky = ky.toString();
				if (kky.indexOf(".") < 0) {
					kky = kky + ".0";
				}
				kky = kky.replace(".", "<i>.");
				kky = kky + "</i>";
				$("#filmStarScore").innerHTML = kky;
				$("#starScore").innerHTML = kky;
				$("#start").className = "starB s"
						+ (parseInt(ky, 10) - 1).toString();
				$("#filmStarScoreTip").innerHTML = "感谢您的参与！";
				alert("已有" + kx + "人参与评分");
				if ($("#renums")) {
					$("#renums").innerHTML = kx;
				}
				setTimeout(kaifach, 10000);
			}
		}
	});
}
function kaifach() {
	var textStart = Array("很烂", "很烂", "一般", "一般", "不妨一看", "不妨一看", "比较精彩",
			"比较精彩", "棒极了", "棒极了");
	var x = parseFloat(document.getElementById("MARK_B1").value);
	var y = parseFloat(document.getElementById("MARK_B2").value);
	var z = parseFloat(document.getElementById("MARK_B3").value);

	var ky = y.toString();
	if (ky.indexOf(".") < 0) {
		ky = ky + ".0";
	}
	ky = ky.replace(".", "<i>.");
	ky = ky + "</i>";
	document.getElementById("filmStarScore").innerHTML = ky;
	document.getElementById("start").className = "starB s"
			+ parseInt(y, 10).toString();
	if (parseInt(y, 10) > 0) {
		document.getElementById("filmStarScoreTip").innerHTML = textStart[parseInt(
				y, 10) - 1];
	} else {
		if (z > 0) {
			document.getElementById("filmStarScoreTip").innerHTML = textStart[0];
		} else {
			document.getElementById("filmStarScoreTip").innerHTML = "";
		}
	}
}
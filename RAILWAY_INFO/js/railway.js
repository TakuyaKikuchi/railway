$(function(){
	var root = 'http://express.heartrails.com/api/json?method=getStations&line=';
	var line = "";
	var name = "";
	var next = "";
	var prev = "";
	var list = [];
	var currently = "";
	var updata = "";
	var moreDetail = [];
	var a = "";
	$(".delay_button").on("click",function(){
		list = "";
		$(".railway_list").remove();
		var selectRail = $('.label').text();
		if(selectRail == "路線を選んでください"){
			$(".section_inr").find("p").remove();
			$(".section_inr").append('<p class="' + 'error_txt' + '"' + ' style=' + '"' + 'color:#ff0000' + '"' + '>路線を選んでください</p>');
		} else {
			$(".section_inr").find("p").remove();
		}
		console.log(selectRail);
		$.ajax({
			method: 'GET',
			url: root + selectRail,
			dataType: "jsonp"
		}).then(function(data) {
			console.log(data);
			var stationNum = data.response.station;
			for (var i = 0; i < stationNum.length; i++){
				prefecture = stationNum[i].prefecture;
				line = stationNum[i].line;
				name = stationNum[i].name;
				next = stationNum[i].next;
				prev = stationNum[i].prev;
				length = i;
				postal = stationNum[i].postal;
				x = stationNum[i].x;
				y = stationNum[i].y;
				list +=
				'<li class=' + '"' + 'getStations' + '"' + '>' +
				'<div class=' + '"' + 'pulldown_desc' + ' ' + 'passive' + '"' + '>' + name + '</div>' +
				'<div class=' + '"' + 'pulldown_inr' + '"' + ' style=' + 'display:none' + '>' +
				'<iframe width=' + '"' + '100%' + '"' + 'height=' + '"' + '250' + '"' + 'frameborder=' + '"' + '0' + '"' + 'scrolling=' + '"' + 'no' + '"' + 'marginheight=' + '"' + '0' + '"' + 'marginwidth=' + '"' + '0' + '"' + 'src=' + '"' + 'http://maps.google.co.jp/maps?ll=' + x + ',' + y + '&q=' + name + '&output=embed&t=m&z=18' + '"' + '></iframe>' +
				'<dl class=' + '"' + 'clearfix' + '"' + '>' +
				'<dt>' + '駅 名：' + '</dt>' + '<dd>' + name + '駅' + '</dd>' +
				'<dt>' + '路線名：' + '</dt>' + '<dd>' + line + '</dd>' +
				'<dt>' + '都道府県：' + '</dt>' + '<dd>' + prefecture + '</dd>' +
				'<dt>' + '郵便番号：' + '</dt>' + '<dd>' + postal + '</dd>' +
				'<dt>' + '緯度：' + '</dt>' + '<dd class=' + '"' + 'ido' + '"' + '>' + x + '</dd>' +
				'<dt>' + '経度：' + '</dt>' + '<dd class=' + '"' + 'keido' + '"' + '>' + y + '</dd>' +
				'</dl>' +
				'<div class=' + '"' + 'more_detail' + '"' + '>' + 'さらに詳細を見る' + '</div>' +
				'<div class=' + '"' + 'more_detail_inr' + '"' + '></div>' +
				'</div>' +
				'</li>';
			}
			$('.section_inr').append("<ul class=" + 'railway_list' + ">" + list + "</ul>");
			$('.more_detail').on("click", function(){
				var ido = $(this).prev().find('.ido').text();
				var keido = $(this).prev().find('.keido').text();
				var xy = keido + ',' + ido;
				console.log(xy);
				$(document).ready(function(){
					$.simpleWeather({
						location: xy,
						unit: 'c',
						success: function(weather) {
							console.log(weather);
							currently = weather.currently;
							updata = weather.updated;
							moreDetail +=
							'<div class="' + 'detail_inr' +  '">' +
							'<ul>' +
							'<li>' + '天気:' + weather.text + '</li>' +
							'<li>' + '気温:' + weather.temp + '°C' + '</li>' +
							// '<li><img ' + 'src="' + image +  '"' + + ' ></li>' +
							'</ul>' +
							'</div>';
						}
					});
					console.log(moreDetail);
					$('.more_detail_inr').append("<div class=" + 'more' + ">" + moreDetail + "</div>");
				});
			})
			$('.pulldown_desc').on("click", function(){
				if ($(this).hasClass('passive')) {
					$(this).addClass('active');
					$(this).removeClass('passive');
					$(this)
					.next(".pulldown_inr").slideDown();
					$(this).find(".balloon_arrow").css({
						display: "inline-block"
					})
				} else if ($(this).hasClass('active')) {
					$(this).addClass('passive');
					$(this).removeClass('active');
					$(this)
					.next(".pulldown_inr").slideUp()
					$(this).find(".balloon_arrow").css({
						display: "none"
					})
				}
			});
		});
	})
})

var UI = function() {
	var $ajaxing = $('#ajaxing');
	var tagDynamic = function($ipt, opts) {
		yepnope({
			test : $.fn.TagDynamic,
			load : [ '/public/js/libs/tagDynamic/jquery.tagDynamic.js',
					'/public/js/libs/tagDynamic/jquery.tagDynamic.css',
					'/public/js/libs/autocomplete/jquery.autocomplete.js',
					'/public/js/libs/autocomplete/jquery.autocomplete.css' ],
			complete : function() {
				$ipt.TagDynamic(opts);
			}
		});
	};
	var trigger = function(obj, hideD, showD) {
		var $hide = $(obj).parents().filter("." + hideD).eq(0);
		var $show = $hide.parent().find("." + showD);
		$hide.hide();
		$show.show();
	};
	var submenu_active = function() {
		$('.sub').bind(
				'mouseenter',
				function() {
					$(this).find(">a").addClass("open").end().find(">div")
							.addClass("open");
					$(this).find(">ul").delay(100).show();
					$(this).find("input[type=search]").focus();
					return false;
				});
		$('.sub').bind(
				'mouseleave',
				function() {
					$(this).find(">a").removeClass("open").end().find(">div")
							.removeClass("open");
					;
					$(this).find(">ul").delay(100).slideUp('fast');
					return false;
				});
	};
	var global_search = function() {
		$('#search-form').submit(function() {
			var $input = $(this).find('input#search');
			alert("hh");
			if ($.trim($input.val()) == '') {
				$input.focus();
				return false;
			}
		});
		yepnope({
			test : $.fn.autocomplete,
			load : [ '/public/js/libs/autocomplete/jquery.autocomplete.js',
					'/public/js/libs/autocomplete/jquery.autocomplete.css' ],
			complete : function() {
				var $ipt = $('#search');
				$ipt
						.autocomplete(
								'/search/autocomplete',
								{
									minChars : 1,
									matchContains : true,
									width : 274,
									scroll : false,
									scrollHeight : 400,
									selectFirst : false,
									cacheLength : 0,
									on_enter : function() {
										var key = $.trim($ipt.val());
										window.location.href = '/search/all/'
												+ key;
									},
									on_change : function($dom, $list) {
										if (!$dom) {
											return
										}
										if ($dom.find('li.search')[0]) {
											$dom.find('li.search').remove()
										}
										var key = $.trim($ipt.val());
										if (key != '') {
											$(
													'<li class="search"><span>搜索 '
															+ key
															+ '</span></li>')
													.appendTo($list)
													.click(
															function() {
																window.location.href = '/search/all/'
																		+ key
															})
										}
									},
									formatItem : function(data, i, total) {
										var type_str = '';
										switch (data.type) {
										case 'user':
											type_str = '人';
											break;
										case 'event':
											type_str = '活动';
											break;
										case 'clip':
											type_str = '广播';
											break
										case 'seed':
											type_str = '观察';
											break
										default:
										}
										var html = type_str == ''
												|| type_str == '人' ? ''
												: '<span class="' + data.type
														+ '">' + type_str
														+ '</span>';
										html += type_str == '人' ? '<img src="'
												+ data.avatar
												+ '" class="avatar" style="float:left;margin-right:10px">'
												: '';
										html += data.title;
										return html;
									},
									formatMatch : function(data, i, total) {
										return data.title;
									},
									formatResult : function(data) {
										return data.title;
									},
									parse : function(data) {
										var parsed = '';
										if (data) {
											var list = eval('(' + data + ')'), parsed = [];
											for ( var i = 0, j = list.length; i < j; i++) {
												parsed[i] = {
													data : list[i],
													value : list[i].title,
													result : list[i].title
												};
											}
										}
										return parsed;
									}
								}).result(function(e, data, formatted) {
							if (data.href != '') {
								window.location.href = data.href;
							}
							$ipt.val('');
							return false;
						})
			}
		})
	};
	var event_history = function() {
		var $root = $('#event-history');
		$root.find('li').each(
				function() {
					var me = $(this), $offset = me.offset(), $m_offset = $(
							'#main').offset();
					if ($offset.left - $m_offset.left + 620 > $('#main')
							.width()) {
						me.find('.detail').css({
							'right' : 0
						})
					} else {
						me.find('.detail').css({
							'left' : 0
						})
					}
					var nub1 = $offset.top - 0 + 205;
					var nub2 = $('#footer').height()
							+ $('#footer').offset().top;
					if (nub1 > nub2) {
						me.find('.detail').css({
							'bottom' : 0
						})
					} else {
						me.find('.detail').css({
							'top' : 0
						})
					}
				});
		$root.find('.detail').bind('click', function(e) {
			e.stopPropagation();
		})
		$(document).bind('click', function() {
			$root.find('.active').removeClass('active');
			$root.find('.detail').hide();
			$root.find('li').css('opacity', 1)
		})
		$root.find('a.plus').click(
				function(e) {
					e.stopPropagation();
					$root.find('.detail').hide();
					$(this).parents().filter('li').eq(0).addClass('active')
							.css({
								opacity : 1
							}).find('.detail').fadeIn(1000).end().siblings()
							.removeClass('active').css({
								opacity : 0.3
							})
				});
		$root.find('a.close').click(
				function(e) {
					e.stopPropagation();
					$(this).parents().filter('.detail').hide();
					$(this).parents().filter('li').eq(0).removeClass('active')
							.parents().find('li').css({
								opacity : 1
							})
				})
	};
	var foot_hide = function(item, position) {
		if (position == "bottom") {
			item
					.css({
						"background" : "url(/public/img/icons/lodging.gif) center bottom no-repeat",
						"padding-bottom" : "30px"
					});
		} else {
			item
					.css({
						"background" : "url(/public/img/icons/lodging.gif) center bottom no-repeat",
						"padding-bottom" : "30px"
					});
		}
	}
	return {
		ajaxing : function() {
		},
		ajaxed : function() {
		},
		tagDynamic : tagDynamic,
		trigger : trigger,
		global_search : global_search,
		event_history : event_history,
		foot_hide : foot_hide,
		submenu_active : submenu_active
	}
}();
UI.submenu_active();
var AjaxTooltip = function() {
	var hideDelay = 500;
	var currentID;
	var hideTimer = null;
	var $container = null
	var bind = function($dom, mouseover_handler) {
		if (!$container) {
			$container = $(
					'<div id="ajaxTooltipContainer"><em class="arrow">•</em><div class="main"></div></div>')
					.css({
						'position' : 'absolute',
						'left' : 0,
						'top' : 0,
						'display' : 'none',
						'zIndex' : 20
					}).appendTo($('body'))
		}
		$dom.live('mouseover.ajaxtooltip', function(e) {
			if (hideTimer)
				clearTimeout(hideTimer);
			var $target = $(e.target), pos = $target.offset(), width = $target
					.width();
			$container.css({
				left : pos.left + width + 15,
				top : pos.top - 5
			}).show();
			if (mouseover_handler && typeof (mouseover_handler) == 'function') {
				mouseover_handler($target, $container.find('.main'));
			}
		})
		$dom.live('mouseout.ajaxtooltip', function(e) {
			if (hideTimer)
				clearTimeout(hideTimer)
			hideTimer = setTimeout(function() {
				$container.css('display', 'none')
			}, hideDelay)
		})
		$container.mouseover(function() {
			if (hideTimer)
				clearTimeout(hideTimer);
		})
		$container.mouseout(function() {
			if (hideTimer)
				clearTimeout(hideTimer);
			hideTimer = setTimeout(function() {
				$container.css('display', 'none').find('.main').html('');
			}, hideDelay);
		})
	};
	return {
		bind : bind
	};
}();
var FormValidate = function() {
	var optionsArray = [ {
		rules : {
			email : "required",
			password : {
				required : true,
				minlength : 5
			}
		},
		messages : {
			email : "<em>•</em>请输入您的邮箱",
			password : {
				required : "<em>•</em>请输入您的密码",
				minlength : "<em>•</em>密码至少要输入5位"
			}
		}
	}, {
		rules : {
			email : {
				required : true,
				email : true
			},
			password : {
				required : true,
				minlength : 5
			},
			confirm : {
				required : true,
				minlength : 5,
				equalTo : "#password"
			},
			username : {
				required : true,
				minlength : 2
			},
			verification : "required",
			agree : "required"
		},
		messages : {
			email : "<em>•</em>请输入您的邮箱",
			password : {
				required : "<em>•</em>请输入您的密码",
				minlength : "<em>•</em>密码至少要输入5位"
			},
			confirm : {
				required : "<em>•</em>请再次输入密码以确认",
				minlength : "<em>•</em>密码至少要输入5位",
				equalTo : "<em>•</em>两次输入密码不一致"
			},
			username : {
				required : "<em>•</em>请输入您的昵称",
				minlength : "<em>•</em>昵称长度至少2位"
			},
			verification : "<em>•</em>请输入验证码",
			agree : "<em>•</em>已阅读协议?"
		}
	}, {
		rules : {
			email : "required"
		},
		messages : {
			email : "<em>•</em>请输入您的邮箱"
		}
	}, {
		rules : {
			realname : "required",
			company : "required",
			job : "required",
			mobile : "required"
		},
		messages : {
			realname : "<em>•</em>请输入您的姓名",
			company : "<em>•</em>请输入您的公司",
			job : "<em>•</em>请输入您的职位",
			mobile : "<em>•</em>请输入您的电话"
		}
	}, {
		rules : {
			password : {
				required : true,
				minlength : 5
			},
			new_pwd : {
				required : true,
				minlength : 5
			},
			new_confirm : {
				required : true,
				minlength : 5,
				equalTo : "#new_pwd"
			}
		},
		messages : {
			password : {
				required : "<em>•</em>请输入您的当前密码",
				minlength : "<em>•</em>密码至少要输入5位"
			},
			new_pwd : {
				required : "<em>•</em>请输入您的新密码",
				minlength : "<em>•</em>密码至少要输入5位"
			},
			new_confirm : {
				required : "<em>•</em>请再次输入密码以确认",
				minlength : "<em>•</em>密码至少要输入5位",
				equalTo : "<em>•</em>两次输入密码不一致"
			}
		}
	} ];
	var validate = function($form, options) {
		yepnope({
			test : $.fn.validate,
			load : [ '/public/js/libs/jquery.validate.min.js' ],
			complete : function() {
				$form.validate(options);
			}
		})
	};
	return {
		login : function($form) {
			validate($form, optionsArray[0])
		},
		register : function($form) {
			validate($form, optionsArray[1])
		},
		findpwd : function($form) {
			validate($form, optionsArray[2])
		},
		setting : function($form) {
			validate($form, optionsArray[3])
		},
		setting_pwd : function($form) {
			validate($form, optionsArray[4])
		}
	}
}();
var Avatar = function() {
	var upload = function($btn) {
		yepnope({
			'test' : window.qq,
			'load' : [ '/public/js/libs/ajaxupload/fileuploader.js',
					'/public/js/libs/ajaxupload/fileuploader.css' ],
			'complete' : function() {
				var uploader = new qq.GpkUploader({
					element : $btn[0],
					action : '/upload/ajax_upload_avatar/',
					allowedExtensions : [],
					sizeLimit : 2 * 1024 * 1024,
					minSizeLimit : 0,
					onComplete : function(id, fileName, responseJSON) {
						if (!responseJSON || typeof responseJSON != 'object') {
							$('.avatar-upload-box .msg')
									.html('ajax data error');
						} else if (responseJSON.error) {
							$('.avatar-upload-box .msg').html(
									responseJSON.error)
						} else if (responseJSON) {
						} else {
						}
					},
					showMessage : function(message) {
						$('.avatar-upload-box .msg').html(message);
					},
					onSubmit : function(id, fileName) {
						$('.avatar-upload-box .msg').html('')
					},
					messages : {
						typeError : "只允许上传图片类型jpg, jpeg, png, gif.",
						sizeError : "您上传的图片不能超过2M.",
						minSizeError : "不能上传空文件.",
						emptyError : "不能上传空文件.",
						onLeave : "将取消文件上传."
					}
				});
			}
		})
	};
	return {
		upload : upload
	}
}();
var eventWeibo = function() {
	var upload = function($btn, id) {
		var uploader = new qq.GpkUploader({
			element : $btn[0],
			action : '/upload/weibo_img/',
			allowedExtensions : [ 'jpg', 'jpeg', 'png', 'gif' ],
			params : {
				weibo_id : id
			},
			sizeLimit : 22222 * 1024 * 1024,
			minSizeLimit : 0,
			onComplete : function(id, fileName, responseJSON) {
				if (!responseJSON || typeof responseJSON != 'object') {
					$('.eventWeibo-upload-box .msg').html('ajax data error');
				} else if (responseJSON.error) {
					$('.eventWeibo-upload-box .msg').html(
							responseJSON['message'])
				} else if (responseJSON) {
					$('.eventWeibo-upload-box .msg').html(
							'<img width="50px" height="50px" src="'
									+ responseJSON['info']['thumb_img']
									+ '" />')
				} else {
				}
			},
			showMessage : function(message) {
				$('.eventWeibo-upload-box .msg').html(message);
			},
			onSubmit : function(id, fileName) {
				$('.eventWeibo-upload-box .msg').html('')
			},
			messages : {
				typeError : "只允许上传图片类型jpg, jpeg, png, gif.",
				sizeError : "您上传的图片不能超过2M.",
				minSizeError : "不能上传空文件.",
				emptyError : "不能上传空文件.",
				onLeave : "将取消文件上传."
			}
		});
	};
	return {
		upload : upload
	}
}();
var eventWeibo1 = function() {
	var upload1 = function($btn, id) {
		var uploader1 = new qq.GpkUploader({
			element : $btn[0],
			action : '/upload/weibo_img/',
			allowedExtensions : [ 'jpg', 'jpeg', 'png', 'gif' ],
			params : {
				weibo_id : id
			},
			sizeLimit : 22222 * 1024 * 1024,
			minSizeLimit : 0,
			onComplete : function(id, fileName, responseJSON) {
				if (!responseJSON || typeof responseJSON != 'object') {
					$('.eventWeibo1-upload-box .msg').html('ajax data error');
				} else if (responseJSON.error) {
					$('.eventWeibo1-upload-box .msg').html(
							responseJSON['message'])
				} else if (responseJSON) {
					$('.eventWeibo1-upload-box .msg').html(
							'<img width="50px" height="50px" src="'
									+ responseJSON['info']['thumb_img']
									+ '" />')
				} else {
				}
			},
			showMessage : function(message) {
				$('.eventWeibo1-upload-box .msg').html(message);
			},
			onSubmit : function(id, fileName) {
				$('.eventWeibo1-upload-box .msg').html('')
			},
			messages : {
				typeError : "只允许上传图片类型jpg, jpeg, png, gif.",
				sizeError : "您上传的图片不能超过2M.",
				minSizeError : "不能上传空文件.",
				emptyError : "不能上传空文件.",
				onLeave : "将取消文件上传."
			}
		});
	};
	return {
		upload1 : upload1
	}
}();
var Cast = {};
Cast.wall = function() {
	var dataArray = [], $view_mode, $filter_tags, $filter_order;
	var $thumbs_box, $list_box;
	var isloading = false, isending = false, new_data_have_more = false, start = -1;
	var data_server = '/ajax/get_cast_list/';
	var load_times = 11;
	var current_num;
	var get_view_mode = function() {
		var tmp = $view_mode.find('li.on');
		if (tmp[0]) {
			return tmp.eq(0).attr('data-rel')
		} else {
			return false
		}
	};
	var set_view_mode = function(sType) {
		$view_mode.find('li.on').removeClass('on').end().find('li.' + sType)
				.addClass('on')
		update_view()
	};
	var set_filter_order = function(labelstr) {
		$filter_order.find("select option").removeAttr("selected").each(
				function() {
					if ($(this).text() == labelstr) {
						$(this).attr('selected', 'selected')
					}
				})
	}
	var get_filter_order_str = function() {
		return $filter_order.find(':selected').val()
	};
	var get_filter_tags_str = function() {
		if (is_special_click == '推荐演讲')
			$('#view-order').fadeOut();
		else
			$('#view-order').fadeIn();
		var result = '';
		if (is_special_click) {
			result += '&tags[]=' + is_special_click;
		} else {
			$filter_tags.find('.on').each(function() {
				result += '&tags[]=' + $(this).find('a').attr("rel")
			})
		}
		return result
	};
	var set_filter_tags = function(obj) {
		if ($(obj).parents().filter("ul").eq(0).attr('id') == "special-tags") {
			$(obj).parent().addClass('specialOn').siblings().removeClass(
					'specialOn').end().parents().find("ul#view-tags")
					.children().removeClass('on');
		} else {
			$(obj).parent().toggleClass('on').siblings().removeClass('on')
					.end().parent().find("#special-tags").children()
					.removeClass('specialOn');
		}
	};
	var get_filter_str = function() {
		return 'order=' + get_filter_order_str() + get_filter_tags_str();
	};
	var is_special_click = false;
	var init = function() {
		$thumbs_box = $('div.cast-wall');
		$list_box = $('div.cast-list');
		$view_mode = $('nav#view-mode');
		$filter_order = $('div#view-order');
		$filter_tags = $('ul#view-tags');
		is_special_click = "全部演讲";
		if (!($view_mode.find('li.on')[0])) {
			set_view_mode('thumbs')
		}
		$view_mode.find('a').click(
				function() {
					current_num = $thumbs_box.children().length;
					$("#footer").css("display", "none");
					if (!$(this).parent().hasClass('on')) {
						set_view_mode($(this).parent().attr('data-rel'));
					}
					switch_url = "/ajax/switchover?show_type="
							+ $(this).parent().attr('data-rel');
					$.ajax({
						url : switch_url,
						type : 'get'
					})
					if (start == -1) {
						var mode = get_view_mode();
						if (mode == 'thumbs') {
							$list_box.isotope('remove', $list_box.children());
							$thumbs_box.show()
							$list_box.hide()
						} else {
							$thumbs_box.isotope('remove', $thumbs_box
									.children());
							$list_box.show()
							$thumbs_box.hide()
						}
						load_times = 24
						load()
					} else {
						if (current_num == 36) {
							start = -1;
							load_times = 36
							reload()
						}
						load_times = 12
					}
					return false;
				})
		if ($.browser.msie && $.browser.version < 7) {
			$filter_order.find('select').css({
				"position" : "relative",
				"left" : "80px"
			}).change(function() {
				reload()
			})
		} else {
			$filter_order.find('select').dropkick({
				change : function(value, label) {
					set_filter_order(label);
					reload()
				}
			});
		}
		$filter_tags.find('a').click(
				function() {
					$('html,body').animate({
						scrollTop : 0
					}, 700);
					$("#footer").css("display", "none");
					$filter_tags.find('a').css("cursor", "");
					$(this).css("cursor", "default");
					is_special_click = false;
					if ($(this).parents().parents().filter("ul").eq(0).attr(
							'id') == "special-tags") {
						is_special_click = $(this).attr("rel");
					}
					if ($(this).parents().hasClass("on")) {
						return;
					}
					set_filter_tags(this)
					reload()
				})
		$('.cast-pin a.expand').live(
				'click',
				function() {
					var $root = $(this).parents().filter('.cast-pin').eq(0);
					var $cover = $root.find('.cover');
					var default_top = $root.find('div.photo img')
							.attr('height');
					if (!$cover.get(0).style.top
							|| parseInt($cover.get(0).style.top) != 0) {
						$cover.animate({
							top : 0
						}, 500)
					} else {
						$cover.animate({
							top : parseInt(default_top) + 200
						}, 500)
					}
					$cover.bind('mouseleave', function() {
						$(this).animate({
							top : parseInt(default_top) + 200
						}, 500)
					})
				})
		$('body').removeClass('loading');
		$thumbs_box.isotope({
			itemSelector : '.cast-pin',
			masonry : {
				columnWidth : 200
			}
		})
		$list_box.isotope({
			itemSelector : '.cast-item',
			masonry : {
				columnWidth : 500
			},
			layoutMode : 'fitRows'
		})
		$(window).scroll(infinite_load)
		tem_mode = get_view_mode()
		if (tem_mode == 'list') {
			start = -1;
			load();
		}
	};
	var infinite_load = function() {
		var w_h = $(window).height();
		var d_h = $(document).height();
		var limit = 200;
		if (w_h + $(document).scrollTop() + limit >= d_h) {
			load()
		}
	};
	var ajax_load = function(data, callback) {
		isloading = true;
		var beforeHandler = function() {
			alert('start loading')
		};
		var errorHandler = function(xhr, textStatus, errorThrown) {
			isloading = false;
			UI.ajaxed();
		};
		var successHandler = function(response, textStatus, xhr) {
			isloading = false;
			UI.ajaxed();
			new_data_have_more = eval('(' + response + ')').have_more
			var new_data = eval('(' + response + ')').data;
			if (!new_data) {
				return;
			}
			dataArray = dataArray.concat(new_data);
			if (callback && typeof (callback) == 'function')
				callback(new_data)
		};
		UI.ajaxing();
		$.ajax(data_server + '?' + data + '&t=' + new Date().getTime())
				.success(successHandler).error(errorHandler)
	}
	var do_load = function(callback) {
		current_num = $('div.cast-wall').children().length
		var offset = 12;
		em_mode1 = get_view_mode();
		if (start == -1) {
			if (em_mode1 == 'list') {
				if (current_num == 36)
					offset = 36;
				else {
					offset = 24;
					start = -1
				}
			} else {
				if (current_num == 24)
					start = 24;
				else
					start = -1;
				offset = 12;
			}
		}
		var data = get_filter_str() + '&offset=' + (start + 1) + '&limit='
				+ offset;
		ajax_load(
				data,
				function(x) {
					if (x.length > 0 && start < 20) {
						start += x.length
						if (x.length < offset) {
							isending = true;
						}
					} else if (start > 20) {
						$('.cast-list-more').detach();
						if (new_data_have_more == true)
							$('.cast-list')
									.after(
											'<a class="cast-list-more" href="javascript:;">查看更多</a>')
						isending = true;
						$('.cast-list-more').click(function() {
							start += x.length
							isending = false;
							load();
						})
					} else {
						isending = true;
					}
					if (callback && typeof (callback) == 'function') {
						callback(x)
					}
				});
	};
	var auto_load = function() {
		var $box = get_view_mode() == 'thumbs' ? $thumbs_box : $list_box;
		if ($box.height() + 100 < $(window).height()) {
			load()
		}
	}
	var load = function() {
		if (isloading) {
			var bottom;
			UI.foot_hide($("#castlist-box"), bottom);
			$list_box.css({
				"background-image" : "none",
				"padding-bottom" : "0"
			});
			$thumbs_box.css({
				"background-image" : "none",
				"padding-bottom" : "0"
			});
			return
		} else if (isending) {
			$("#castlist-box").css({
				"background" : "none",
				"padding-bottom" : "0"
			});
			$("#footer").css("display", "block");
		} else {
			do_load(function(x) {
				render(x)
			})
		}
	}
	var reload = function() {
		start = -1;
		dataArray = [];
		isending = false;
		var mode = get_view_mode();
		if (mode == 'thumbs') {
			$thumbs_box.isotope('remove', $thumbs_box.children());
		} else {
			$list_box.isotope('remove', $list_box.children());
		}
		$(window).scroll(infinite_load)
		do_load(function(x) {
			render(x);
		})
	};
	var update_view = function() {
		var mode = get_view_mode();
		if (dataArray.length > 0) {
			if (mode == 'thumbs') {
				$list_box.hide().isotope('remove', $list_box.children());
				$thumbs_box.show();
			} else {
				$thumbs_box.hide().isotope('remove', $thumbs_box.children());
				$list_box.show();
			}
			render(dataArray)
		}
	};
	var render = function(x) {
		var mode = get_view_mode();
		var $items;
		if (mode == 'thumbs') {
			$items = render_thumbs(x);
		} else {
			$items = render_list(x);
		}
	}
	var render_thumbs = function(data) {
		if (data.length < 11)
			$('.cast-list-more').detach();
		var template = '<div class="item cast-pin cast-type-{{color}}" style="width:{{width}}px;">\n \
            <div class="photo loading" style="width:{{width}}px;height:{{height}}px">\n \
                <a target="_blank" href="/cast/view/{{id}}">\n \
                <img  src="{{photo}}" alt="{{intro}}" width="{{width}}" height="{{height}}">\n \
            </a></div>\n \
            <div class="entry">\n \
                <div class="header">\n \
                    <h1><a target="_blank" href="/cast/view/{{id}}">{{title}}</a></h1>\n \
                </div>\n \
                <div class="main">{{intro}}</div>\n \
                <a href="javascript:;" class="expand png_bg"></a>\n \
            </div>\n \
            <div class="cover" style="width:{{width}}px;height:{{height}}px">\n \
                <div class="cast-card">\n \
                    <div class="header">关于本次演讲</div>\n \
                    <div class="main">\n \
                        {{content}}\n \
                    </div>\n \
                    <div class="footer">\n \
                        <div class="toolbar">\n \
                            <a target="_blank" class="play png_bg" href="/cast/view/{{id}}" title="去查看">观看</a>\n \
                        </div>\n \
                    </div>\n \
                </div>\n \
            </div>\n \
        </div>';
		var items = [], bit;
		for ( var i = 0, j = data.length; i < j; i++) {
			bit = template.replace(/\{\{photo\}\}/, data[i].photo);
			bit = bit.replace(/\{\{color\}\}/g, data[i].color);
			bit = bit.replace(/\{\{id\}\}/g, data[i].id);
			bit = bit.replace(/\{\{speaker\}\}/g, data[i].speaker);
			bit = bit.replace(/\{\{title\}\}/g, data[i].title);
			bit = bit.replace(/\{\{intro\}\}/g, data[i].intro);
			bit = bit.replace(/\{\{content\}\}/g, data[i].content);
			bit = bit.replace(/\{\{pubtime\}\}/g, data[i].pub_time);
			bit = bit.replace(/\{\{width\}\}/g, data[i].photo_width);
			bit = bit.replace(/\{\{height\}\}/g, data[i].photo_hight);
			bit = bit.replace(/\{\{num_visited\}\}/g, data[i].view_num);
			bit = bit.replace(/\{\{num_comment\}\}/g, data[i].comment_num);
			$(bit).imagesLoaded(function() {
				$(this).find('.photo').removeClass('loading')
			});
			$thumbs_box.isotope('insert', $(bit));
		}
		setTimeout(auto_load, 2000)
	};
	var render_list = function(data) {
		if (data.length < 11)
			$('.cast-list-more').detach();
		var template = "<div class='item cast-item'>\n \
            <div class='photo loading'> \n \
                <img  src='{{standard}}' alt='{{intro}}'></a>\n \
                <a  target='_blank' href='/cast/view/{{id}}' class='play png_bg' title='去观看'>Play</a>\n \
            </div>\n \
            <div class='entry cast-card'>\n \
                <div class='header'>\n \
                    <h1><a target='_blank' href='/cast/view/{{id}}'>{{title}}</a></h1>\n \
                </div>\n \
                <div class='meta'>\n \
                    <time datetime='{{pubtime}}' pubdate>{{pubtime}}</time>\n \
                </div>\n \
                <div class='main'>\n \
                    {{content}}\n \
                </div>\n \
                <div class='footer'>\n \
                    <div class='toolbar'>\n \
                        <a class='visited png_bg' href='javascript:;' title='被观看次数'>{{num_visited}}</a>\n \
                        <a class='comment png_bg' href='javascript:;' title='被评论次数'>{{num_comment}}</a>\n \
                        <a target='_blank' class='play png_bg' href='/cast/view/{{id}}' title='去观看'>观看</a>\n \
                    </div>\n \
                </div>\n \
            </div>\n \
        </div>";
		var items = [], bit;
		for ( var i = 0; i < data.length; i++) {
			bit = template.replace(/\{\{standard\}\}/, data[i].standard);
			bit = bit.replace(/\{\{id\}\}/g, data[i].id);
			bit = bit.replace(/\{\{speaker\}\}/g, data[i].speaker);
			bit = bit.replace(/\{\{intro\}\}/g, data[i].intro);
			bit = bit.replace(/\{\{title\}\}/g, data[i].title);
			bit = bit.replace(/\{\{content\}\}/g, data[i].extra_content);
			bit = bit.replace(/\{\{pubtime\}\}/g, data[i].pub_time);
			bit = bit.replace(/\{\{num_visited\}\}/g, data[i].view_num);
			bit = bit.replace(/\{\{num_comment\}\}/g, data[i].comment_num);
			$(bit).imagesLoaded(function() {
				$(this).find('.photo').removeClass('loading')
			});
			$list_box.isotope('insert', $(bit));
		}
		setTimeout(auto_load, 2000)
	};
	return {
		init : init,
		load : load
	}
}();
var readSeed = {};
readSeed.wall = function() {
	var dataArray = [], $view_mode, $filter_tags, $filter_order;
	var $thumbs_box, $list_box;
	var isloading = false, isending = false, new_data_have_more = false, start = -1, t = '';
	var data_server = '/ajax/load_seeds/';
	var load_times = 11;
	var current_num;
	var get_view_mode = function() {
		var tmp = $view_mode.find('li.on');
		if (tmp[0]) {
			return tmp.eq(0).attr('data-rel')
		} else {
			return false
		}
	};
	var set_view_mode = function(sType) {
		$view_mode.find('li.on').removeClass('on').end().find('li.' + sType)
				.addClass('on')
		update_view()
	};
	var set_filter_order = function(labelstr) {
		$filter_order.find("select option").removeAttr("selected").each(
				function() {
					if ($(this).text() == labelstr) {
						$(this).attr('selected', 'selected')
					}
				})
	}
	var get_filter_order_str = function() {
		return $filter_order.find(':selected').val()
	};
	var get_filter_tags_str = function() {
		var result = '';
		if (is_special_click) {
			result += '&tag_id=' + is_special_click;
		} else {
			$filter_tags.find('.on').each(function() {
				$('.home').removeClass('home')
				result += '&type=img&tag_id=' + $(this).find('a').attr("class")
			})
		}
		return result
	};
	var set_filter_tags = function(obj) {
		if ($(obj).parents().filter("ul").eq(0).attr('id') == "special-tags") {
			$(obj).parent().addClass('specialOn').siblings().removeClass(
					'specialOn').end().parents().find("ul#view-tags")
					.children().removeClass('on');
		} else {
			$(obj).parent().toggleClass('on').siblings().removeClass('on')
					.end().parent().find("#special-tags").children()
					.removeClass('specialOn');
		}
	};
	var get_filter_str = function() {
		return 'order=' + get_filter_order_str() + get_filter_tags_str();
	};
	var is_special_click = false;
	var init = function() {
		$thumbs_box = $('div.cast-wall');
		$list_box = $('div.cast-list');
		$view_mode = $('nav#view-mode');
		$filter_order = $('div#view-order');
		$filter_tags = $('ul#view-tags');
		is_special_click = "";
		if (!($view_mode.find('li.on')[0])) {
			set_view_mode('thumbs')
		}
		$view_mode.find('a').click(
				function() {
					current_num = $thumbs_box.children().length;
					$("#footer").css("display", "none");
					if (!$(this).parent().hasClass('on')) {
						set_view_mode($(this).parent().attr('data-rel'));
					}
					switch_url = "/ajax/switchover?show_type="
							+ $(this).parent().attr('data-rel');
					$.ajax({
						url : switch_url,
						type : 'get'
					})
					if (t == '') {
						var mode = get_view_mode();
						if (mode == 'thumbs') {
							$list_box.isotope('remove', $list_box.children());
							$thumbs_box.show()
							$list_box.hide()
						} else {
							$thumbs_box.isotope('remove', $thumbs_box
									.children());
							$list_box.show()
							$thumbs_box.hide()
						}
						load_times = 24
						load()
					} else {
						if (current_num == 48) {
							t = '';
							load_times = 36
							reload()
						}
						load_times = 12
					}
					return false;
				})
		if ($.browser.msie && $.browser.version < 7) {
			$filter_order.find('select').css({
				"position" : "relative",
				"left" : "80px"
			}).change(function() {
				reload()
			})
		} else {
			$filter_order.find('select').dropkick({
				change : function(value, label) {
					set_filter_order(label);
					reload()
				}
			});
		}
		$filter_tags.find('a').click(
				function() {
					$('.cast-list-more').detach();
					$('html,body').animate({
						scrollTop : 0
					}, 700);
					$("#footer").css("display", "none");
					$filter_tags.find('a').css("cursor", "");
					$(this).css("cursor", "default");
					is_special_click = false;
					if ($(this).parents().parents().filter("ul").eq(0).attr(
							'id') == "special-tags") {
						is_special_click = $(this).attr("rel");
					}
					if ($(this).parents().hasClass("on")) {
						return;
					}
					set_filter_tags(this)
					reload()
				})
		$('.cast-pin a.expand').live(
				'click',
				function() {
					var $root = $(this).parents().filter('.cast-pin').eq(0);
					var $cover = $root.find('.cover');
					var default_top = $root.find('div.photo img')
							.attr('height');
					if (!$cover.get(0).style.top
							|| parseInt($cover.get(0).style.top) != 0) {
						$cover.animate({
							top : 0
						}, 500)
					} else {
						$cover.animate({
							top : parseInt(default_top) + 200
						}, 500)
					}
					$cover.bind('mouseleave', function() {
						$(this).animate({
							top : parseInt(default_top) + 200
						}, 500)
					})
				})
		$('body').removeClass('loading');
		$thumbs_box.isotope({
			itemSelector : '.cast-pin',
			masonry : {
				columnWidth : 50
			}
		})
		$list_box.isotope({
			itemSelector : '.cast-item',
			masonry : {
				columnWidth : 1000
			},
			layoutMode : 'straightDown'
		})
		$(window).scroll(infinite_load);
		tem_mode = get_view_mode()
		if (tem_mode == 'list') {
			num = 24
			load()
		}
		switch (location.hash) {
		case '#monitor':
			$('a.160388').trigger('click');
			break;
		case '#weekly':
			$('a.160783').trigger('click');
			break;
		}
	};
	var infinite_load = function() {
		var w_h = $(window).height();
		var d_h = $(document).height();
		var limit = 200;
		if (w_h + $(document).scrollTop() + limit >= d_h) {
			load()
		}
	};
	var ajax_load = function(data, callback) {
		isloading = true;
		var beforeHandler = function() {
			alert('start loading')
		};
		var errorHandler = function(xhr, textStatus, errorThrown) {
			isloading = false;
			UI.ajaxed();
		};
		var successHandler = function(response, textStatus, xhr) {
			isloading = false;
			UI.ajaxed();
			new_data_have_more = eval('(' + response + ')').data.have_more
			var new_data = eval('(' + response + ')').data.seeds;
			if (!new_data) {
				return;
			}
			dataArray = dataArray.concat(new_data);
			if (callback && typeof (callback) == 'function')
				callback(new_data)
		};
		UI.ajaxing();
		$.ajax(
				data_server + '?' + data + '&tt=' + new Date().getTime()
						+ '&t=' + t).success(successHandler)
				.error(errorHandler)
	}
	var do_load = function(callback) {
		var num = 12;
		em_mode1 = get_view_mode();
		if (t == '') {
			if (em_mode1 == 'list') {
				if (current_num == 48)
					num = 48;
				else
					num = 24;
			} else {
				start = 35;
				if (is_special_click === '')
					t = $('.cast-wall').attr('id');
				else
					t = '';
				num = 12;
			}
		}
		var data = get_filter_str() + '&start=' + (start + 1) + '&num=' + num;
		ajax_load(
				data,
				function(x) {
					temp = x.length
					t = x[temp - 1]['t']
					if (x.length >= 0 && start < 20) {
						start += x.length + 1
						if (new_data_have_more == false)
							isending = true;
						if (x.length < num) {
							isending = true;
						}
					} else if (start >= 20) {
						$('.cast-list-more').detach();
						$('.cast-list')
								.after(
										'<a class="cast-list-more" href="javascript:;">查看更多</a>')
						isending = true;
						$('.cast-list-more').click(function() {
							start += x.length + 1
							isending = false;
							load();
						})
					} else {
						isending = true;
					}
					if (callback && typeof (callback) == 'function') {
						callback(x)
					}
				});
	};
	var auto_load = function() {
		var $box = get_view_mode() == 'thumbs' ? $thumbs_box : $list_box;
		if ($box.height() + 100 < $(window).height()) {
			load()
		}
	}
	var load = function() {
		$list_box.css({
			"background-image" : "none",
			"padding-bottom" : "0"
		});
		if (isloading) {
			var bottom;
			UI.foot_hide($("#castlist-box"), bottom);
			$list_box.css({
				"background-image" : "none",
				"padding-bottom" : "0"
			});
			$thumbs_box.css({
				"background-image" : "none",
				"padding-bottom" : "0"
			});
			return
		} else if (isending) {
			$("#castlist-box").css({
				"background" : "none",
				"padding-bottom" : "0"
			});
			$("#footer").css("display", "block");
		} else {
			do_load(function(x) {
				render(x)
			})
		}
	}
	var reload = function() {
		start = -1;
		t = ''
		dataArray = [];
		isending = false;
		var mode = get_view_mode();
		if (mode == 'thumbs') {
			$thumbs_box.isotope('remove', $thumbs_box.children());
		} else {
			$list_box.isotope('remove', $list_box.children());
		}
		$(window).scroll(infinite_load)
		do_load(function(x) {
			render(x);
		})
	};
	var update_view = function() {
		var mode = get_view_mode();
		if (dataArray.length > 0) {
			if (mode == 'thumbs') {
				$list_box.hide().isotope('remove', $list_box.children());
				$thumbs_box.show();
			} else {
				$thumbs_box.hide().isotope('remove', $thumbs_box.children());
				$list_box.show();
			}
			render(dataArray)
		}
	};
	var render = function(x) {
		var mode = get_view_mode();
		var $items;
		if (mode == 'thumbs') {
			$items = render_thumbs(x);
		} else {
			$items = render_list(x);
		}
	}
	var render_thumbs = function(data) {
		if (data.length < 11)
			$('.cast-list-more').detach();
		var template = '<div class="type-{{type}}-thumbs item cast-pin render_thumbs" style="width:{{width}}px;">\n \
            <div class="photo loading" style="width:{{width}}px;height:{{height}}px">\n \
                <div class="type-{{type}}"></div>\n \
                <a target="_blank" href="{{url}}">\n \
                <img  src="{{photo}}" alt="" width="{{width}}" height="{{height}}">\n \
            </a></div>\n \
            <div class="entry">\n \
                <div class="header">\n \
                    <h1><a target="_blank" href="{{url}}">{{title}}</a></h1>\n \
                </div>\n \
                <div class="main">{{content}}</div>\n \
                <div class="meta"><a  target="_blank" href="{{author_url}}">{{author}}</a> <i>/</i> {{pubtime}}</div>\n \
            </div>\n \
        </div>';
		var ad_template = '<div class="photo {{mark}} loading" style="width:{{width}}px;height:{{height}}px">\n \
                <div class="type-{{type}}"></div>\n \
                <a target="_blank" href="{{url}}">\n \
                <img  src="{{photo}}" alt="" width="{{width}}" height="{{height}}">\n \
            </a></div>\n \
            <div class="entry">\n \
                <div class="header">\n \
                    <h1><a target="_blank" href="{{url}}">{{title}}</a></h1>\n \
                </div>\n \
                <div class="main">{{content}}</div>\n \
                <div class="meta"><a  target="_blank" href="{{author_url}}">{{author}}</a> <i>/</i> {{pubtime}}</div>\n \
            </div>';
		var items = [], bit, bit_tmp = '', count = 0;
		for ( var i = 0, j = data.length; i < j; i++) {
			if (data[i]['type'] == 4)
				count++;
		}
		for ( var i = 0, j = data.length; i < j; i++) {
			if (data[i]['type'] == 4) {
				for ( var z = i; z < i + count; z++) {
					bit_ad = ad_template.replace(/\{\{photo\}\}/,
							data[z]['thumb_img']);
					bit_ad = bit_ad.replace(/\{\{author\}\}/g,
							data[z]['author']);
					bit_ad = bit_ad.replace(/\{\{author_url\}\}/g,
							data[z]['author_url']);
					bit_ad = bit_ad.replace(/\{\{from\}\}/g, data[z]['from']);
					bit_ad = bit_ad.replace(/\{\{title\}\}/g, data[z]['title']);
					bit_ad = bit_ad.replace(/\{\{content\}\}/g,
							data[z]['content']);
					bit_ad = bit_ad.replace(/\{\{pubtime\}\}/g,
							data[z]['pub_time']);
					bit_ad = bit_ad.replace(/\{\{mark\}\}/g, 'item-type-' + z);
					bit_ad = bit_ad.replace(/\{\{width\}\}/g, 215);
					bit_ad = bit_ad.replace(/\{\{height\}\}/g,
							data[z]['photo_height']);
					bit_ad = bit_ad.replace(/\{\{url\}\}/g, data[z]['url']);
					bit_ad = bit_ad.replace(/\{\{type\}\}/g, data[z]['type']);
					bit_tmp += bit_ad;
				}
				bit = '<div class="type-4-thumbs item cast-pin render_thumbs" style="width:215px;">'
						+ bit_tmp + '</div>';
				i = i + count;
			} else {
				bit = template.replace(/\{\{photo\}\}/, data[i]['thumb_img']);
				bit = bit.replace(/\{\{author\}\}/g, data[i]['author']);
				bit = bit.replace(/\{\{author_url\}\}/g, data[i]['author_url']);
				bit = bit.replace(/\{\{from\}\}/g, data[i]['from']);
				bit = bit.replace(/\{\{title\}\}/g, data[i]['title']);
				bit = bit.replace(/\{\{content\}\}/g, data[i]['content']);
				bit = bit.replace(/\{\{pubtime\}\}/g, data[i]['pub_time']);
				bit = bit.replace(/\{\{width\}\}/g, 215);
				bit = bit.replace(/\{\{height\}\}/g, data[i]['photo_height']);
				bit = bit.replace(/\{\{url\}\}/g, data[i]['url']);
				bit = bit.replace(/\{\{type\}\}/g, data[i]['type']);
			}
			$(bit).imagesLoaded(function() {
				$(this).find('.photo').removeClass('loading')
			});
			$thumbs_box.isotope('insert', $(bit));
		}
		setTimeout(auto_load, 2000)
	};
	var render_list = function(data) {
		if (data.length < 11) {
			$('.cast-list-more').detach();
			$('#castlist-box').addClass('the-end')
		}
		var template = "<div class='item type-{{type}}-list cast-item'>\n \
            <div class='entry {{tag_class}} cast-card'>\n \
                <div class='header'>\n \
                    <h1><a target='_blank' href='{{url}}'>{{title}}</a></h1>\n \
                </div>\n \
                <div class='meta'>\n \
                    <span><a  target='_blank'href='{{author_url}}'>{{author}}</a> <i>/</i> {{pubtime}} <span class='from'><i>/</i> 来源：<span>{{from}}</span></span></span>\n \
                </div>\n \
                <div class='time'>\n \
                    <span class='tag_name'>{{tag}}</span><span class='pubtime_time'><span class='pubtime_year'>{{pubtime_year}}</span><span class='pubtime_date'>{{pubtime_date}}</span></span>\n \
                </div>\n \
                <div class='main'>\n \
                    {{content}}\n \
                </div>\n \
                <div class='bottom_line '><span></span>\n \
                </div>\n \
            </div>\n \
        </div>";
		var items = [], bit;
		var tag_class = '';
		for ( var i = 0; i < data.length; i++) {
			if (data[i]['type'] == 4)
				continue;
			if (data[i]['tag'].toString() != '')
				tag_class = 'tag'
			bit = template.replace(/\{\{photo\}\}/, data[i]['thumb_img']);
			bit = bit.replace(/\{\{type\}\}/g, data[i]['type']);
			bit = bit.replace(/\{\{author\}\}/g, data[i]['author']);
			bit = bit.replace(/\{\{author_url\}\}/g, data[i]['author_url']);
			bit = bit.replace(/\{\{from\}\}/g, data[i]['from']);
			bit = bit.replace(/\{\{title\}\}/g, data[i]['title']);
			bit = bit.replace(/\{\{content\}\}/g, data[i]['content']);
			bit = bit.replace(/\{\{pubtime\}\}/g, data[i]['pub_time']);
			bit = bit.replace(/\{\{pubtime_year\}\}/g, data[i]['pub_time']
					.substr(0, 4));
			bit = bit.replace(/\{\{pubtime_date\}\}/g, data[i]['pub_time']
					.substr(5));
			bit = bit.replace(/\{\{width\}\}/g, 215);
			bit = bit.replace(/\{\{height\}\}/g, data[i]['photo_height']);
			bit = bit.replace(/\{\{url\}\}/g, data[i]['url']);
			bit = bit.replace(/\{\{tag\}\}/g, data[i]['tag']);
			bit = bit.replace(/\{\{tag_class\}\}/g, tag_class + ' tag-' + i);
			$(bit).imagesLoaded(function() {
				$(this).find('.photo').removeClass('loading')
			});
			$list_box.isotope('insert', $(bit));
			$('.meta .from span').each(function(i) {
				if ($(this).text() == '')
					$(this).parent().hide()
			})
			var same_pub_time = [];
			var same_num = []
			$('.pubtime_date').each(function(i) {
				same_pub_time[i] = $(this).text();
			});
			for ( var ii = 0, zz = 0; ii < same_pub_time.length; ii++) {
				for ( var jj = ii + 1; jj < same_pub_time.length; jj++) {
					if (same_pub_time[ii] == same_pub_time[jj]) {
						same_num[zz] = same_pub_time[jj]
						jj++;
						zz++;
					} else {
					}
				}
			}
			for ( var xx = 0; xx < same_num.length; xx++) {
				$('.pubtime_date').each(
						function(i) {
							if ($(this).text() == same_num[xx])
								$(this).parent().parent().parent().addClass(
										'same same-' + xx)
						});
				$('.same-' + xx + ':lt(1) .pubtime_time').show()
				$('.same-' + xx + ' .bottom_line').hide()
				$('.same-' + xx + ':last .bottom_line').show()
				$('.tag .bottom_line').hide()
			}
		}
		setTimeout(auto_load, 2000)
	};
	return {
		init : init,
		load : load
	}
}();
var Comment = function() {
	var $form, $list_box, id = '', comments_load_server = '/ajax/load_comments/', comment_load_server = '/ajax/load_sub_comments/', comment_submit_like = '/ajax/like_comment/', is_login_server = '/ajax/is_login/', generate_captcha = '/user/generate_captcha', check_email_server = '/users/check_email', get_user_header = '/user/get_user_header', comment_submit_server = '/ajax/comment_submit/';
	var offset = 10, type = 'time', page = 1;
	var templ = '<div class="comment"> \n \
        <div class="avatar"> \n \
            <a href="{{user_url}}">\n \
                <img src="{{avatar}}" alt="{{user}}"> \n \
            </a>\n \
        </div>\n \
        <div class="entry"> \n \
            <div class="content">\n \
                <a class="user{{anonymous-user}}" href="{{user_url}}">{{user}} {{anonymous}}</a>{{reply_to}}: {{content}}</div>\n \
            <div class="header">\n \
                <span class="reply-bt-box"><a title="{{is_reply_text}}" class="reply-bt {{has_comment}}" href="javascrit:void(0)" rel="{{id}}"><i class="main_icons is_reply"></i><span>{{reply_count}}</span></a></span>\n \
                <a id="{{id}}" title="{{is_like_text}}" class="like-bt {{is_like}}" href="javascrit:void(0)"><i class="main_icons is_like"></i><span>{{like_count}}</span></a>\n \
                <time datetime="">{{pub_time}}</time>\n \
            </div>\n \
            <div class="toolbar">{{loadparent}}</div>\n \
            <div class="comments_list"><div class="ajax_status"></div><span class="arrow-up-in"></span><div class="comment_list_area"></div><div class="comment_box_area"></div></div>\n \
        </div>\n \
    </div>';
	$anonymous = $('input[name="anonymous"]');
	$anonymous.live('click', function() {
		if ($(this).is(':checked')) {
			$(this).attr('checked', '').parent().addClass('checked');
			$(this).parents(".anonymous").siblings("p.customname-box")
					.slideDown();
		} else {
			$(this).removeAttr('checked').parent().removeClass('checked');
			$(this).parents(".anonymous").siblings("p.customname-box")
					.slideUp();
		}
	});
	var init = function(_id) {
		id = _id;
		$form = $('#comment-box');
		$list_box = $('#comments');
		$
				.get(
						is_login_server,
						function(response) {
							var data = eval('(' + response + ')');
							if (data.is_login) {
								$form.find('input.submit').removeClass(
										"disable")
								$form.find('.ajax-box').hide()
								$form.find('textarea').bind(
										'keydown click focus',
										function() {
											$form = $('#comment-box');
											$form.find('p.anonymous,p.act')
													.slideDown().show();
										});
								$list_box.find('textarea').live(
										'keypress click',
										function() {
											$(this).parent().find(
													'p.anonymous,p.act')
													.slideDown();
										});
							} else {
								$form
										.find('textarea')
										.bind(
												'focus',
												function() {
													$form = $('#comment-box');
													$form
															.find(
																	'p.act,p.loginname-box,p.captcha-box,p.customname-box')
															.slideDown().show();
													do_load_captcha($form);
												});
								if ($('body').hasClass('login-guest')) {
									$form.find('input[name=captcha]').bind(
											'click',
											function() {
												do_load_captcha($form);
												$form.find(
														'input[name=captcha]')
														.unbind('click');
											});
								} else if ($('body').hasClass('login-user')) {
								}
								$list_box
										.find('textarea')
										.live(
												'click',
												function() {
													if (!$(this).hasClass(
															"clicked")) {
														$(this).addClass(
																"clicked");
														console.log("重置");
														placeholder();
														$(this)
																.parent()
																.find(
																		'p.captcha-box,p.loginname-box,p.act,p.customname-box')
																.slideDown();
														do_load_captcha($form);
														if ($('body').hasClass(
																'login-user')) {
															$(this)
																	.parent()
																	.find(
																			'input[name=captcha]')
																	.bind(
																			'click',
																			function() {
																				$(
																						this)
																						.parent()
																						.find(
																								'input[name=captcha]')
																						.unbind(
																								'click');
																			});
														} else if ($('body')
																.hasClass(
																		'login-guest')) {
															$(this)
																	.parent()
																	.find(
																			'input[name=captcha]')
																	.bind(
																			'click',
																			function() {
																				$(
																						this)
																						.parent()
																						.find(
																								'input[name=captcha]')
																						.unbind(
																								'click');
																			});
														}
													}
												});
							}
						});
		placeholder();
		$('.like-bt').live('click', function(e) {
			ajax_submit_comment_like(this);
			e.preventDefault();
		});
		$('.comment-form').live(
				'submit',
				function(event) {
					event.preventDefault();
					$anonymous = $('input[name="anonymous"]');
					is_anonymous = $(this).find('.anonymous-checkbox').is(
							':checked') ? 1 : 0;
					ajax_submit_comment(this);
				});
		$('.comment-form textarea').elastic();
		$('.reply-bt').tipsy({
			gravity : 's',
			fade : true,
			live : true
		});
		$('.freelance-btn').tipsy({
			gravity : 's',
			fade : true,
			live : true
		});
		$('.comment-form .comment-toolbar a').tipsy({
			gravity : 'n'
		});
		$('.comment-form .comment-toolbar a')
				.live(
						'click',
						function(e) {
							e.preventDefault();
							var str = '#' + $(this).text() + '# ', pos = null, flag = true;
							var $f = $(this).parents().filter('form').eq(0), $t = $f
									.find('textarea').eq(0);
							$t.focus();
							pos = $t.val().lastIndexOf(str);
							if (pos > -1) {
								if (pos + str.length == $t.val().length) {
									flag = false;
								}
							}
							if (flag) {
								$t.val($t.val() + str);
							}
							pos = $t.val().length;
							text_moveTxt($t.get(0), pos);
						});
		load_comments(page, type);
		$form.find('.comment-box-type .sort span').tipsy({
			gravity : 's',
			live : true
		});
		$form.find('.comment-box-type .sort span').live('click', function(e) {
			e.preventDefault();
			type = $(this).attr("id");
			$(this).parent().find('span').removeClass('active');
			$(this).addClass('active');
			load_comments(page, type)
		});
		$list_box.find('a.reply-bt').live('click', function(e) {
			e.preventDefault();
			reply(this);
		});
		$('span.close-bt').live('click', function() {
			$(this).parent().slideUp()
		});
		email_input = $('input[name="loginname"]');
		check_loginname($form);
		check_loginname($list_box);
		$('span.captcha-img').live('click', function() {
			load_captcha($(this));
		});
		if ($('body').hasClass('login-user')) {
		} else if ($('body').hasClass('login-guest')) {
		}
	};
	var placeholder = function() {
		if (!Modernizr.input.placeholder) {
			$('[placeholder]').live('focus', function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('').parent().addClass('focus');
					input.removeClass('placeholder');
				}
			}).live(
					'blur',
					function() {
						var input = $(this);
						if (input.val() == ''
								|| input.val() == input.attr('placeholder')) {
							input.addClass('placeholder').parent().removeClass(
									'focus');
							;
							input.val(input.attr('placeholder'));
						}
					});
			$('[placeholder]').each(function(index) {
				if ($(this).val() == '')
					$(this).blur();
			});
		}
	}
	var load_captcha = function($obj) {
		$obj.filter('.captcha-img').html('');
		jQuery.get(generate_captcha
				+ '?img_width=100&img_height=35&font_size=18&t=', {}, function(
				data, textStatus, xhr) {
			if (data)
				$obj.filter('.captcha-img').html(data);
		});
	};
	var do_load_captcha = function($obj) {
		$obj.find('input[name=captcha][type=password]').hide();
		$obj.find('input[name=captcha][type=text]').show();
		$obj.find('input[name=captcha]').animate({
			"width" : "60%"
		}, 600, function() {
			load_captcha($(this).siblings());
			$obj.unbind('focus');
		});
	};
	var live_load_captcha = function($obj) {
		$obj.bind('click', function() {
			do_load_captcha($(this));
		});
		console.log("live_load");
	};
	var do_load_password = function($obj) {
		show_form_msg($obj, '您正在使用注册帐号，请输入密码后发表评论。', 'info');
		$obj.find('p.anonymous').fadeIn();
		$obj.find('input[name=captcha][type=text]').hide();
		$obj.find('input[name=captcha][type=password]').show().focus();
		$obj.find('input[name=captcha]').animate({
			"width" : "100%"
		}, 600, function() {
			$obj.unbind('focus');
		});
	};
	var clear_form_msg = function($obj) {
		$obj.find('div.ajax-box').removeClass(
				'success error warning sending info').html('').slideUp();
	}
	var show_form_msg = function($obj, str, type) {
		clear_form_msg($obj);
		$obj.find('div.ajax-box').html(str + '<span class="close-bt">x</span>')
				.addClass(type).slideDown();
	}
	var refresh_option = function($obj) {
		if (!$('body').hasClass('is-login')) {
			jQuery
					.get(
							get_user_header,
							{},
							function(data, textStatus, xhr) {
								if (data.is_login) {
									if (data.is_admin)
										li_class = '';
									else
										li_class = 'hide';
									var header_tmpl = '<li class="sub follow"> \n \
              <a href="/pg/notification" title="关注我们">关注我们</a> \n \
              <ul> \n \
                <li><a title="新浪微博: @geekpark" target="_blank" href="http://weibo.com/geekpark" class="social-media-icon sina">新浪微博</a></li> \n \
                <li><a title="腾讯微博: @geekparknet" target="_blank" href="http://t.qq.com/geekparknet" class="social-media-icon tencent">腾讯微博</a></li> \n \
                <li><a title="Twitter: @GeekParkNet" target="_blank" href="https://twitter.com/GeekParkNet" class="social-media-icon twitter">Twitter</a></li> \n \
                <li><a title="Google+: @geekpark" target="_blank" href="https://plus.google.com/b/117900237066383009895/" class="social-media-icon google">Google+</a></li> \n \
                <li><a title="人人小站: @geekpark" target="_blank" href="http://zhan.renren.com/geekpark" class="social-media-icon renren">人人小站</a></li> \n \
                <li><a title="RSS" target="_blank" href="http://feeds.geekpark.net/" class="social-media-icon rss">RSS订阅</a></li> \n \
                <li style="width:105px;"><a title="Email Service" target="_blank" href="http://eepurl.com/fzlSk" class="social-media-icon email">订阅活动通知</a></li> \n \
              </ul> \n \
            </li> \n \
            <li> \n \
              <a href="/pg/notification" title="申请报道">申请报道</a> \n \
            </li> \n \
            <li class="first sub sub_avatar"> \n \
              <a href="/user/home/"  title="个人首页"> \n \
              <img src="'
											+ data.avatar_url
											+ '" alt="" class="avatar"><span></span></a> \n \
              <ul> \n \
                <li><a href="/user/home/"  title="个人首页">个人首页</a></li> \n \
                <li><a href="/pg/notification" title="通知">查看通知<span>'
											+ data.notification_num
											+ '</span></a></li> \n \
                <li class="hr"></li> \n \
                <li><a href="jobs/index">招聘方管理</a></li> \n \
                <li><a href="jobs/my_cover_list">应聘方管理</a></li> \n \
                <li class="hr"></li> \n \
                <li><a href="/user/setting/profile" title="设置">帐号设置</a></li> \n \
                <li><a href="/user/logout"  title="退出">退出登录</a></li> \n \
              </ul> \n \
            </li>';
									$('.tool-box ul').html(header_tmpl);
									UI.submenu_active();
									$('body').addClass('is-login');
									$list_box.find('textarea').die();
									$('#comment-box').find('textarea').unbind()
											.die();
									$('p.anonymous,p.act').slideDown()
									$list_box
											.find(
													'p.captcha-box,p.loginname-box,p.customname-box')
											.slideUp();
									$('#comment-box')
											.find(
													'p.captcha-box,p.loginname-box,p.customname-box')
											.slideUp();
									$('p.anonymous input')
											.removeAttr('checked').parent()
											.removeClass('checked');
								} else {
									$('body').removeClass('is-login');
								}
								$
										.get(
												is_login_server,
												function(response) {
													var data = eval('('
															+ response + ')');
													if (data.is_login) {
														$form
																.find(
																		'input.submit')
																.removeClass(
																		"disable")
														$form.find('.ajax-box')
																.hide()
														$form
																.find(
																		'textarea')
																.bind(
																		'keydown click focus',
																		function() {
																			$(
																					this)
																					.parent()
																					.find(
																							'p.anonymous,p.act')
																					.slideDown();
																		});
														$list_box
																.find(
																		'textarea')
																.live(
																		'keypress click',
																		function() {
																			$(
																					this)
																					.parent()
																					.find(
																							'p.anonymous,p.act')
																					.slideDown();
																		});
													} else {
														$list_box
																.find(
																		'textarea')
																.live(
																		'keypress click',
																		function() {
																			$list_box
																					.find(
																							'textarea')
																					.die(
																							'keypress');
																			$(
																					this)
																					.siblings()
																					.find(
																							'input[name=captcha]')
																					.bind(
																							'focus',
																							function() {
																								do_load_captcha($(this));
																							});
																			$(
																					this)
																					.parent()
																					.find(
																							'p.captcha-box,p.loginname-box,p.act,p.customname-box')
																					.slideDown();
																		});
													}
												});
							}, 'json');
		}
	}
	var check_loginname = function($obj) {
		$obj
				.find('input[name=loginname]')
				.live(
						'blur',
						function() {
							var email = $(this), val = email.val(), $form = $(
									this).parent().parent().parent();
							if ($.trim(val) == '') {
								clear_form_msg($form);
								return;
							}
							if (val != '邮箱'
									&& !/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
											.test($.trim(val))) {
								show_form_msg($form, '不是有效电子邮箱地址', 'warning');
							} else {
								clear_form_msg($form);
								jQuery.post('/user/check_email', {
									email : val
								}, function(data, textStatus, xhr) {
									if (data.state == '2') {
										do_load_password($form);
										$form.find("p.customname-box")
												.slideUp();
									} else {
										do_load_captcha($form);
										$form.find("p.customname-box")
												.slideDown();
										$form.find("p.anonymous").fadeOut();
										$anonymous.removeAttr('checked')
												.parent()
												.removeClass('checked');
									}
									$("#comment-box").find(
											"input[name=loginname]").val(val);
								}, "json")
							}
						});
	};
	var ajax_submit_comment_like = function(obj) {
		var $ajax_obj = $(obj), user_guid = $ajax_obj.attr('rel'), is_like = $ajax_obj
				.attr('class').split(' ')[1], guid = $ajax_obj.attr('id'), parent_id = $ajax_obj
				.find('input[name=parent_id]').val(), $submit = $ajax_obj
				.find(':submit'), $content = $ajax_obj.find('#content');
		if ($ajax_obj.hasClass('sending') || is_like == 'true') {
			return
		}
		$.ajax({
			url : comment_submit_like,
			data : {
				guid : guid
			},
			type : 'post',
			beforeSend : function() {
				$ajax_obj.addClass('sending')
			},
			success : function(response, textStatus, xhr) {
				$ajax_obj.removeClass('false').addClass('true').attr('title',
						'已赞成').tipsy('show');
				setTimeout(function() {
					$ajax_obj.tipsy('hide')
				}, 3000);
				$ajax_obj.find('span i').text(
						1 + parseInt($ajax_obj.find('span i').text()));
			},
			error : function(xhr, textStatus, errorThrown) {
				$show_form_msg($list_box, textStatus, 'error');
			}
		})
	}
	var ajax_submit_comment = function(form) {
		var $ajax_form = $(form), parent_id = $ajax_form.find(
				'input[name=parent_id]').val(), $submit = $ajax_form
				.find(':submit'), $content = $ajax_form.find('#content'), email = $ajax_form
				.find('input[name=loginname]').val(), customname = $ajax_form
				.find('input[name=customname]').val(), captcha = $ajax_form
				.find('input[name=captcha]').val(), password = $ajax_form.find(
				'input[type=password]').val(), comment_url = window.location.href;
		$ajax_box = $ajax_form.parents().filter('.comments_list').find(
				'.comment_list_area').eq(0)
		if ($.trim($content.val()) == '') {
			$content.focus();
			clear_form_msg($ajax_form);
			if ($ajax_form.attr('id') == 'comment-box') {
				show_form_msg($ajax_form, '评论不能为空', 'warning');
			} else {
				show_form_msg($ajax_form, '回复不能为空', 'warning');
			}
			return false;
		}
		if ($ajax_form.find('.customname-box').css("display") != 'none') {
			if ($ajax_form.find('input[name=customname]').val() == '') {
				show_form_msg($ajax_form, '请填写昵称', 'warning');
				return false;
			}
		}
		$
				.ajax({
					url : comment_submit_server,
					data : {
						entity_id : id,
						parent_id : parent_id,
						content : $.trim($content.val()),
						is_anonymous : is_anonymous,
						email : email,
						custom_name : customname,
						captcha : captcha,
						password : password,
						comment_url : comment_url
					},
					type : 'post',
					beforeSend : function() {
						if ($list_box.find('.ajax-box')[0]) {
							clear_form_msg($ajax_form);
						}
						if ($ajax_form.find('.ajax-box')[0]) {
							clear_form_msg($ajax_form);
						}
						if ($ajax_form.attr('id') == 'comment-box') {
							show_form_msg($ajax_form, '正在提交', 'sending');
						} else {
							show_form_msg($ajax_form, '正在提交', 'sending');
						}
					},
					success : function(response, textStatus, xhr) {
						$submit.removeAttr('disabled');
						try {
							var data = eval('(' + response + ')');
							if ($ajax_form.attr('id') == 'comment-box') {
								if (data.error) {
									show_form_msg($ajax_form, data.message,
											'warning');
									$ajax_form.find('input[name=captcha]').val(
											'').focus();
								} else {
									show_form_msg($ajax_form, '提交成功!',
											'success');
									refresh_option();
									$form
											.parents()
											.filter('.side')
											.find('#comment-box .ajax-box')
											.eq(0)
											.delay(1000)
											.slideUp(
													function() {
														$(this).hide();
														$list_box
																.find('.latest')
																.removeClass(
																		'latest');
														var html = render_comment_item(data.data);
														var $tmp = $(html)
																.addClass(
																		'latest')
																.animate(
																		{
																			backgroundColor : "#E9F3DA"
																		}, 1)
																.animate(
																		{
																			backgroundColor : "transparent"
																		}, 1500);
														render_com_top();
														$list_box.prepend($tmp);
													})
									$ajax_form
											.parents()
											.filter('.comment')
											.find('.entry > .header')
											.eq(0)
											.find('.reply-bt span i')
											.text(
													parseInt($ajax_form
															.parents()
															.filter('.comment')
															.find(
																	'.entry > .header')
															.eq(0)
															.find(
																	'.reply-bt span i')
															.text()) + 1)
									reset_comment_form($ajax_form);
								}
							} else {
								if (data.error) {
									show_form_msg($ajax_form, data.message,
											'warning');
									$ajax_form.find('input[name=captcha]').val(
											'').focus();
								} else {
									show_form_msg($ajax_form, '提交成功!',
											'success');
									refresh_option();
									$ajax_form
											.find('.ajax-box')
											.delay(1000)
											.slideUp(
													function() {
														$(this).hide();
														$ajax_box
																.find('.latest')
																.removeClass(
																		'latest');
														var html = render_comment_item(data.data);
														var $tmp = $(html)
																.addClass(
																		'latest')
																.animate(
																		{
																			backgroundColor : "#E9F3DA"
																		}, 1)
																.animate(
																		{
																			backgroundColor : "transparent"
																		}, 1500);
														render_com_top();
														$ajax_box.append($tmp);
													})
									$ajax_form
											.parents()
											.filter('.comment')
											.find('.entry > .header')
											.eq(0)
											.find('.reply-bt span i')
											.text(
													parseInt($ajax_form
															.parents()
															.filter('.comment')
															.find(
																	'.entry > .header')
															.eq(0)
															.find(
																	'.reply-bt span i')
															.text()) + 1)
									reset_comment_form($ajax_form);
								}
							}
						} catch (error) {
							show_form_msg($ajax_form, error, 'error');
						}
					},
					error : function(xhr, textStatus, errorThrown) {
						$submit.removeAttr('disabled');
						show_form_msg($ajax_form, textStatus, 'error');
					}
				})
	};
	var reset_comment_form = function($form) {
		$form.find('input,textarea').not(':submit').not('[type="hidden"]').not(
				'input[name=loginname]').val('');
		$('.comment .content p:nth-child(2)').css('display', 'inline');
		$form.find('textarea').animate({
			height : 16
		}, 750)
	};
	var load_comments = function(page, type) {
		$.ajax({
			url : comments_load_server,
			data : {
				guid : id,
				offset : (page - 1) * offset,
				limit : offset,
				type : type
			},
			type : 'GET',
			beforeSend : function() {
				$list_box.html('').addClass('loading');
			},
			success : function(response) {
				$list_box.removeClass('loading');
				var data = eval('(' + response + ')');
				if (!data || typeof data != 'object') {
					alert('comments data error!');
					return;
				}
				if (data.data.length) {
					render_com_top();
					for ( var i = 0; i < data.data.length; i++) {
						var html = render_comment_item(data.data[i]);
						if (i != data.data.length - 1) {
							$list_box.append($(html));
						} else {
							$list_box.append($(html).addClass('clear-border'));
						}
					}
					$('.reply-bt').each(
							function() {
								var has_comment = $(this).attr('class').split(
										' ')[1];
								if (has_comment > 0) {
									$(this).click();
								} else {
									$(this).parents(".header").siblings(
											".comments_list")
											.addClass("opened");
								}
							});
					render_page(data);
					$('.reply-to-text').live('click', function() {
						window.scroll(0, 0);
					})
				}
				$('.like-bt').tipsy({
					gravity : 's',
					fade : true,
					live : true
				});
			},
			error : function(e) {
				$list_box.removeClass('loading');
				$list_box.html(e.error);
			}
		})
	};
	var load_comment = function(obj, id) {
		var $obj = $(obj);
		var $root = $obj.parents().filter('.comment').eq(0);
		var $comment_text = $obj.text();
		if ($root.hasClass('latest')) {
			$root.removeClass('latest')
		}
		if ($obj.hasClass('loading')) {
			return
		}
		if ($obj.hasClass('close')) {
			return

			$obj.removeClass('close');
			var $target = $obj.parents().filter('blockquote.parent')[0] ? $obj
					.parents().filter('blockquote.parent').eq(0) : $obj
					.parent();
			$target.nextAll().filter('blockquote.parent').remove()
		} else {
			$obj.parent().parent().parent().find('.ajax_status').addClass(
					'loading');
			$.ajax(comment_load_server + "?guid=" + id).success(
					function(response) {
						$obj.parent().parent().parent().find('.ajax_status')
								.removeClass('loading');
						var data = eval('(' + response + ')');
						if (!data || typeof data != 'object') {
							return
						}
						$obj.addClass('close');
						for ( var i = 0; i < data.data.length; i++) {
							var html = render_comment_item(data.data[i]);
							var $parent = $obj.parent().parent().siblings()
									.filter('.comments_list').find(
											'.comment_list_area');
							$(html).prependTo($parent);
						}
						$obj.parent().parent().siblings().filter(
								'.comments_list').slideDown();
						$('.reply_text').tipsy({
							gravity : 's',
							fade : true,
							live : true,
							opacity : 0.9
						});
					}).error(function(xhr, textStatus, errorThrown) {
				$obj.removeClass('loading').addClass('error');
			})
		}
	};
	var render_comment_item = function(data) {
		if (data.is_like)
			is_like_text = '已赞成';
		else
			is_like_text = '赞一个';
		if (data.reply_count)
			is_reply_text = '查看回复';
		else
			is_reply_text = '发表回复';
		var html = templ.replace(/\{\{user\}\}/g, data.screen_name);
		if (data.user_url == "###") {
			html = html.replace(/\{\{anonymous\}\}/g, "");
			html = html.replace(/\{\{anonymous-user\}\}/g, " anonymous-user");
		} else {
			html = html.replace(/\{\{anonymous\}\}/g, "");
			html = html.replace(/\{\{anonymous-user\}\}/g, "");
		}
		if (data.parent_id != 0) {
			if (data.parent_url != "###") {
				html = html.replace(/\{\{reply_to\}\}/g,
						'<i class="reply_text" title=\''
								+ data.parent_screen_name + ': '
								+ data.parent_content
								+ '\'> 回复 </i><a class="user" href="'
								+ data.parent_url + '">'
								+ data.parent_screen_name + '</a>');
			} else {
				html = html
						.replace(
								/\{\{reply_to\}\}/g,
								'<i class="reply_text" title=\''
										+ data.parent_screen_name
										+ ': '
										+ data.parent_content
										+ '\'> 回复 </i><a class="user anonymous-user" href="'
										+ data.parent_url + '">'
										+ data.parent_screen_name + '</a>');
			}
		} else {
			html = html.replace(/\{\{reply_to\}\}/g, '');
		}
		html = html.replace(/\{\{user_url\}\}/g, data.user_url);
		html = html.replace(/\{\{id\}\}/g, data.guid);
		html = html.replace(/\{\{avatar\}\}/g, data.avatar);
		html = html.replace(/\{\{is_like_text\}\}/g, is_like_text);
		html = html.replace(/\{\{is_reply_text\}\}/g, is_reply_text);
		html = html.replace(/\{\{is_like\}\}/g, data.is_like);
		html = html.replace(/\{\{has_comment\}\}/g, data.reply_count);
		html = html.replace(/\{\{pub_time\}\}/g, data.pub_date);
		html = html.replace(/\{\{content\}\}/g, data.content);
		if (typeof (data.like_count) != 'undefined') {
			html = html.replace(/\{\{reply_count\}\}/g, '回复 (<i>'
					+ data.reply_count + '</i>)');
			html = html.replace(/\{\{like_count\}\}/g, '赞 (<i>'
					+ data.like_count + '</i>)');
		} else {
			html = html.replace(/\{\{reply_count\}\}/g, '回复');
			html = html.replace(/\{\{like_count\}\}/g, '');
		}
		html = html.replace(/\{\{loadparent\}\}/g, '');
		return html;
	};
	var render_page = function(data) {
		var pages = '<div class="pagination"> \n \
            <a class="prev png_bg" href="javascript:;"><span>上一页</span></a> \n \
            <span class="now">{{page}}</span>/ \n \
            <span class="total">共{{total}}页</span> \n \
            <a class="next png_bg" href="javascript:;"><span>下一页</span></a> \n \
        </div> \n \
        <div class="reply-to-top"><span class="reply-to-textbox"><span class="reply-to-text">↑ 发表回复</span></span></div>';
		pages = pages.replace(/\{\{total\}\}/g, Math.ceil(data.total / offset));
		pages = pages.replace(/\{\{page\}\}/g, page);
		var $page = $(pages);
		$page.find('.prev').bind('click', prev).end().find('.next').bind(
				'click', next)
		if (page <= 1) {
			$page.find('.prev').addClass('disabled');
		}
		if (data.is_end) {
			$page.find('.next').addClass('disabled');
		}
		if (data.total > offset) {
			$list_box.append($page);
		}
	};
	var render_com_top = function() {
		var com_top = '<div class="comment-box-type">\n \
            <span class="comment-box-title"></span>\n \
            <span class="sort">\n \
                <span id="like" title="按赞成数排序" class="by_like main_icons">按赞成数排序</span>\n \
                <span id="time" title="按时间排序" class="by_time main_icons active">按时间排序</span>\n \
            </span>\n \
        </div>';
		var $com_top = $(com_top);
		if (!$('.comment-box-type').attr('class'))
			$form.append($com_top);
	};
	var prev = function(e) {
		type = $('.comment-box-type .sort .active').attr('id');
		console.log(type);
		var $anchor = $(e.target).hasClass('prev') ? $(e.target) : $(e.target)
				.parent();
		if ($anchor.hasClass('disabled')) {
			return
		}
		page -= 1;
		window.scroll(0, 0)
		load_comments(page, type)
	};
	var next = function(e) {
		type = $('.comment-box-type .sort .active').attr('id');
		var $anchor = $(e.target).hasClass('next') ? $(e.target) : $(e.target)
				.parent();
		if ($anchor.hasClass('disabled')) {
			return
		}
		page += 1;
		window.scroll(0, 0)
		load_comments(page, type)
	}
	var reply = function(obj) {
		var form_html = "";
		var $obj = $(obj);
		var id = $obj.attr('rel')
		var has_comment = $obj.attr('class').split(' ')[1]
		var $root = $obj.parents().filter('.comment').eq(0);
		var form_temp = '<form class="format comment-form" method="post" action="" id="comment-box-'
				+ id
				+ '">\n \
                    <div class="ajax-box"></div>\n \
                    <input type="hidden" value="'
				+ id
				+ '" name="parent_id">\n \
                    <div class="box_father">\n \
                      <div class="in-reply-to">\n \
                        正在回复给:\n \
                        <span></span> <i class="main_icons cancel-reply"></i>\n \
                      </div>\n \
                      <textarea class="text" name="content" id="content" placeholder="发表回复"></textarea>\n \
                      <p class="loginname-box">\n \
                        <input type="text" value="" name="loginname" class="text" placeholder="邮箱" maxlength="128"></p>\n \
                      <p class="customname-box">\n \
                        <input type="text" value="" name="customname" class="text" placeholder="昵称（2-16位，允许中文字符）" maxlength="32"></p>\n \
                      <p class="captcha-box">\n \
                        <input type="text" name="captcha" class="text" maxlength="4" placeholder="点击获取验证码">\n \
                        <input type="password" name="captcha" class="text password" placeholder="密码">\n \
                        <span class="captcha-img"></span>\n \
                      </p>\n \
                      <p class="anonymous">\n \
                        <label class="anonymous_label main_icons">\n \
                          <input type="checkbox" class="anonymous-checkbox" name="anonymous">匿名发表</label>\n \
                      </p>\n \
                      <p class="act">\n \
                        <input type="submit" value="回复" class="submit png_bg"></p>\n \
                    </div>\n \
                  </form>';
		$form = $root;
		if ($root.hasClass('latest')) {
			$root.removeClass('latest')
		}
		if (has_comment > 0) {
			load_comment($obj, id);
			$form.find('textarea').focus();
		} else if (has_comment == 0) {
			$form.find('textarea').focus();
		} else {
			if ($root.parent().parent().find('.comment_box_area:last').html() == '') {
				$root.parent().parent().find('.comment_box_area:last').append(
						form_temp);
			}
			$form = $root.parents().filter('.comment').eq(0).find(
					'.comment-form');
			$form.find('input:submit').val('回复').end().find('textarea').focus()
					.elastic().end().find('input[name=parent_id]').val(id)
					.end()
			$root.parents().filter('.comment').eq(0).find('.in-reply-to span')
					.text($root.find('.user').eq(0).text())
			$root.parents().filter('.comment').eq(0).find('.in-reply-to')
					.show()
			$('.cancel-reply').bind(
					'click',
					function() {
						$(this).parent().hide();
						$form.find('input[name=parent_id]').val(
								$(this).parents().filter('.entry').find(
										'.reply-bt').eq(0).attr('rel'));
					})
			return
		}
		if ($obj.parent().parent().siblings().filter('.comments_list')
				.hasClass("opened")) {
			if ($root.find('.comment-form')[0]) {
			} else {
				if ($('.comment-form').not('#comment-box')[0]) {
				}
				$root.find('.comment_box_area:last').append(form_temp);
				$form = $root.find('.comment-form');
				$form.find('input:submit').val('回复').end().find('textarea')
						.focus().elastic().end().find('.comment-toolbar a')
						.tipsy({
							gravity : 's'
						});
				$form.find('textarea').focus();
			}
		}
		$obj.parent().parent().siblings().filter('.comments_list').slideDown(
				function() {
					$obj.attr('title', '发表回复').tipsy("show")
					setTimeout(function() {
						$obj.tipsy("hide")
					}, 1000);
					if (has_comment == 0) {
						$form.find('textarea').focus();
					}
				}).addClass("opened");
		return false
	};
	var text_selectTxt = function(obj, posS, posE) {
		if (obj.setSelectionRange) {
			obj.focus();
			obj.setSelectionRange(posS + 1, posE);
		} else {
			obj.focus();
			var rng = obj.createTextRange();
			rng.moveEnd('character', -($(obj).val().length - posE));
			rng.moveStart('character', posS + 1);
			rng.select();
		}
	};
	var text_moveTxt = function(obj, pos) {
		if (obj.setSelectionRange) {
			obj.focus();
			obj.setSelectionRange(pos, pos);
		} else {
			obj.focus();
			var rng = obj.createTextRange();
			rng.moveStart("character", pos);
			rng.collapse(true);
			rng.select();
		}
	};
	return {
		comment_submit_server : comment_submit_server,
		init : init,
		reply : reply,
		load_parent : load_comment
	}
}();
var Notification = function() {
	var init = function() {
		$('#notice-reply textarea').elastic();
		$('span.close-bt').live('click', function() {
			$(this).parent().slideUp()
		});
		$('.wide .notice-item').hover(function() {
			$(this).addClass('hover')
		}, function() {
			$(this).removeClass('hover')
		}).click(
				function() {
					var oo = $(this)
					if ($(this).hasClass('active')) {
						$('.notice-extra').animate(
								{
									left : -($('.side').width())
								},
								function() {
									$('.side').html('');
									$('.wide .notice-item').filter('.active')
											.removeClass('active');
								})
						return
					}
					var notice_id = $(this).attr('rel');
					if (!notice_id) {
						alert('no id find')
						return
					}
					$('.notice-extra').addClass('loading').show().animate({
						left : 0
					}).load(
							'/ajax/get_notification/' + notice_id,
							function() {
								var w_h = $('.wide').height(), s_h = $('.side')
										.height();
								if (w_h > s_h) {
									$('.side').height(w_h)
								} else {
									$('.wide').height(s_h)
								}
								$('.side').css('height', '100%');
								$('.notice-extra textarea').elastic();
								$('.notice-extra #notice-reply').submit(
										Notification.reply);
								update_unread()
								oo.removeClass('unread').addClass('active')
										.siblings();
								$('.deleted-comment').parent().parent()
										.children().not('blockquote,.content')
										.attr('style', 'opacity:0.5');
								$('.deleted-comment').parent().children().not(
										'.deleted-comment').attr('style',
										'opacity:0.5');
							})
				})
		$('.notice-extra header a.close').live(
				'click',
				function() {
					$('.notice-extra').animate(
							{
								left : -($('.side').width())
							},
							function() {
								$('.side').html('');
								$('.wide .notice-item').filter('.active')
										.removeClass('active');
							})
				})
	};
	var clear_form_msg = function($obj) {
		$obj.find('div.ajax-box').removeClass('error warning sending info');
	}
	var show_form_msg = function($obj, str, type) {
		clear_form_msg($obj);
		$obj.find('div.ajax-box').html(str + '<span class="close-bt">x</span>')
				.addClass(type).slideDown();
	}
	var reply = function(e) {
		e.preventDefault();
		var $ajax_form = $(e.target), $list_box = $ajax_form.parents().find(
				'.notice-replys').eq(0), parent_id = $ajax_form.find(
				'input[name=parent_id]').val(), entity_id = $ajax_form.find(
				'input[name=entity_id]').val(), customname = $ajax_form.find(
				'input[name=customname]').val(), $submit = $ajax_form
				.find(':submit'), $content = $ajax_form
				.find('textarea[name=content]');
		if ($.trim($content.val()) == '') {
			$content.focus();
			if ($ajax_form.find('.ajax-box')[0]) {
				clear_form_msg($ajax_form);
			}
			show_form_msg($ajax_form, '回复不能为空', 'warning');
			return false;
		}
		if ($ajax_form.find('p.customname-box').css('display') != 'none') {
			if (customname == '') {
				show_form_msg($ajax_form, '请输入昵称', 'warning');
				return false;
			}
		}
		is_anonymous = $(this).find('.anonymous-checkbox').is(':checked') ? 1
				: 0;
		$
				.ajax({
					url : Comment.comment_submit_server,
					data : {
						entity_id : entity_id,
						parent_id : parent_id,
						content : $.trim($content.val()),
						custom_name : customname,
						is_anonymous : is_anonymous
					},
					type : 'post',
					beforeSend : function() {
						if ($ajax_form.find('.ajax-box')[0]) {
							clear_form_msg($ajax_form);
						}
						show_form_msg($ajax_form, '正在提交', 'sending');
					},
					success : function(response, textStatus, xhr) {
						$submit.removeAttr('disabled');
						try {
							var data = eval('(' + response + ')');
							if (data.error) {
								show_form_msg($ajax_form, 'Error: '
										+ data.message, 'warning');
							} else {
								show_form_msg($ajax_form, '提交成功！', 'success');
								$ajax_form
										.find('.ajax-box')
										.delay(1000)
										.slideUp(
												function() {
													$(this).hide();
													var html = '<div class="notice-reply">\
                                    <div class="header">'
															+ data.data.pub_date
															+ '</div>\
                                    <div class="content">'
															+ data.data.content
															+ '</div>\
                                </div>';
													$(html)
															.prependTo(
																	$list_box);
													var w_h = $('.wide')
															.height(), s_h = $(
															'.side').height();
													if (w_h > s_h) {
														$('.side').height(w_h)
													} else {
														$('.wide').height(s_h)
													}
												})
								$ajax_form[0].reset();
								$ajax_form.find('textarea').css('height', '40');
								window.scroll(0, 0);
							}
						} catch (error) {
							show_form_msg($ajax_form, 'Error: ' + data.message,
									'warning');
						}
					},
					error : function(xhr, textStatus, errorThrown) {
						$submit.removeAttr('disabled');
						show_form_msg($ajax_form, 'Error: ' + textStatus,
								'warning');
					}
				})
	};
	var update_unread = function() {
		var $dom = $('#header .tool-box a.info');
		get_unread(function(x) {
			try {
				x = parseInt(x)
			} catch (e) {
				alert('Notification unread number invalid')
			}
			if (x > 0) {
				$dom.addClass('on').html(x)
			} else {
				$dom.removeClass('on').html(0)
			}
		})
	};
	var get_unread = function(callback) {
		$.get('/ajax/get_notification_num/', {}, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response)
			} else {
				return response
			}
		})
	};
	return {
		updateUnread : update_unread,
		getUneread : get_unread,
		init : init,
		reply : reply
	}
}();
var FormValidateS = function() {
	var isErrorStatus = function($obj) {
		var flag = false
		if ($obj.next()[0] && $obj.next().hasClass('error')) {
			flag = true
		}
		return flag
	};
	var clear_msg = function($obj) {
		if ($obj.next()[0] && $obj.next().hasClass('msg')) {
			$obj.next().remove()
		}
	};
	var show_msg = function($obj, msg, type) {
		if ($obj.next()[0] && $obj.next().hasClass('msg')) {
			clear_msg($obj);
		}
		$('<label class="msg" for="' + $obj.attr('id') + '"/>').addClass(type)
				.html(msg).insertAfter($obj);
	};
	var check_tip = function($obj, message, chk_val) {
		$obj.bind('focus', function() {
			var me = $(this);
			show_msg(me, message, 'info')
		}).bind('blur', function() {
			var me = $(this);
			if (me.next().hasClass('info')) {
				clear_msg(me)
			}
		})
	};
	var check_required_core = function($obj, message, chk_val) {
		if ($.trim($obj.val()) == '') {
			show_msg($obj, message, 'error')
		}
	};
	var check_required = function($obj, message, chk_val) {
		$obj.bind('blur', function() {
			var me = $(this);
			check_required_core(me, message, chk_val)
		})
	};
	var check_email = function($obj, message, chk_val) {
		$obj
				.bind(
						'blur',
						function() {
							var me = $(this), val = me.val();
							if ($.trim(val) == '') {
								return
							}
							if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
									.test(val)) {
								show_msg(me, message, 'error')
							}
						})
	};
	var check_password = function($obj, message, chk_val) {
		$obj.bind('blur', function() {
			var me = $(this), val = me.val();
			if ($.trim(val) == '') {
				return
			}
			if (val.length < 4) {
				show_msg(me, '<em>•</em>密码不能少于4个字符', 'error')
			} else if (val.length > 16) {
				show_msg(me, '<em>•</em>密码不能多于16个字符', 'error')
			} else if (/\s/g.test(val)) {
				show_msg(me, '<em>•</em>密码中只能包含字母、数字或符号', 'error')
			} else {
			}
		})
	};
	var check_equalTo_core = function($obj, message, chk_val) {
		var target = $(chk_val).val();
		if (target == '') {
			return
		}
		if ($obj.val() != target) {
			show_msg($obj, message, 'error')
		} else {
			show_msg($obj, 'ok', 'success')
		}
	};
	var check_equalTo = function($obj, message, chk_val) {
		$obj.bind('input', function() {
			var me = $(this);
			check_equalTo_core(me, message, chk_val)
		})
	};
	var check_username = function($obj, message, chk_val) {
		$obj.bind('blur', function() {
			var me = $(this), val = me.val();
			if ($.trim(val) == '') {
				return
			}
			if (val.length < 2) {
			}
			if (val.length > 16) {
				show_msg(me, message, 'error')
			}
		})
	};
	var check_remote = function($obj, message, check_val) {
		$obj.bind('blur', function() {
			var me = $(this), val = me.val();
			if ($.trim(val) == '' || isErrorStatus(me)) {
				return
			}
			var param = $obj.attr('id');
			var data = {};
			data[$obj.attr('id')] = val;
			$.ajax({
				url : check_val,
				type : 'POST',
				data : data,
				beforeSend : function() {
					show_msg(me, message, 'ajaxing')
				},
				success : function(response) {
					var data = eval('(' + response + ')');
					if (data.error) {
						show_msg(me, '<em>•</em>' + data.message, 'error')
					} else {
						show_msg(me, 'ok', 'success')
					}
				},
				error : function(x) {
					show_msg(me, '<em>•</em>验证出错', 'alert')
				}
			})
		})
	};
	var register = function($form) {
		var options = {
			rules : {
				email : {
					required : true,
					tip : true,
					email : true,
					remote : '/user/check_email/'
				},
				password : {
					required : true,
					tip : true,
					password : true,
					remote : '/user/check_register/password/'
				},
				passwordconfirm : {
					required : true,
					tip : true,
					password : true,
					equalTo : '#password'
				},
				username : {
					required : true,
					tip : true,
					username : true,
					remote : '/user/check_register/username/'
				},
				verification : {
					required : true,
					tip : true,
					remote : '/user/check_register/verification/'
				}
			},
			message : {
				email : {
					required : '<em>•</em>邮箱地址不能为空',
					tip : '<em>•</em>注册有效电子邮箱，用做登录极客公园',
					email : '<em>•</em>电子邮箱格式不对',
					remote : ''
				},
				password : {
					required : '<em>•</em>密码不能为空',
					tip : '<em>•</em>字母、数字或符号，4-16个字符',
					remote : ''
				},
				passwordconfirm : {
					required : '<em>•</em>必须再次确认密码',
					tip : '<em>•</em>再次输入密码',
					equalTo : '<em>•</em>两次密码输入不一致'
				},
				username : {
					required : '<em>•</em>昵称不能为空',
					tip : '<em>•</em>中英文均可，2-16个字符',
					remote : ''
				},
				verification : {
					required : '<em>•</em>验证码不能为空',
					tip : '<em>•</em>输入验证码',
					remote : ''
				}
			}
		};
		validate($form, options);
	};
	var validate = function($form, options) {
		for (key in options.rules) {
			var $ipt = $form.find('#' + key), $checks = options.rules[key];
			for (key2 in $checks) {
				if ($checks[key2] && FormValidateS.check[key2]) {
					FormValidateS.check[key2]($ipt, options.message[key][key2],
							$checks[key2])
				}
			}
		}
		$form.submit(function(e) {
			var flag = false;
			for (key in options.rules) {
				var $ipt = $form.find('#' + key), $checks = options.rules[key];
				for (key2 in $checks) {
					if (key2 == 'required') {
						check_required_core($ipt, options.message[key][key2],
								$checks[key2])
					}
					if (key2 == 'equalTo') {
						check_equalTo_core($ipt, options.message[key][key2],
								$checks[key2])
					}
				}
			}
			if ($(this).find('label.error').length <= 0) {
				flag = true
			}
			return flag;
		})
	};
	return {
		check : function() {
			return {
				required : check_required,
				tip : check_tip,
				email : check_email,
				remote : check_remote,
				password : check_password,
				equalTo : check_equalTo,
				username : check_username
			}
		}(),
		validate : validate,
		register : register
	}
}();
var Timeline = function() {
	var load = function(url, $anchor, $ul, id) {
		if ($anchor.attr('disabled') == 'disabled') {
			return;
		}
		if (!$anchor.data('index')) {
			$anchor.data('index', 1)
		}
		var id = $anchor.attr("rel");
		var page = $anchor.data('index') + 1;
		var interval;
		$.ajax({
			url : url + '/' + id + '/' + page,
			type : 'get',
			beforeSend : function() {
				$anchor.attr('disabled', 'disabled').text('加载中');
				interval = window.setInterval(function() {
					var text = $anchor.text();
					if (text.length < 6) {
						$anchor.text(text + '.')
					} else {
						$anchor.text('加载中')
					}
				}, 200)
			},
			success : function(response) {
				window.clearInterval(interval);
				$anchor.removeAttr('disabled').html('更多').data('index', page);
				var data = eval('(' + response + ')');
				if (data.error != '') {
					alert(data.error);
				} else {
					if (data.is_end) {
						$anchor.hide()
					} else {
						$anchor.show()
					}
					for ( var i = 0; i < data.data.length; i++) {
						$ul.append(data.data[i].html)
					}
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {
				window.clearInterval(interval);
				$anchor.removeAttr('disabled').html('更多')
				alert(xhr.response);
			}
		})
		$anchor.data('index', $anchor.data('index') + 1);
	};
	var load_data = function(obj) {
		var $anchor = $(obj), $ul = $('#dynamic'), url = '/ajax/load_user_timeline';
		load(url, $anchor, $ul);
	};
	return {
		load_data : load_data
	};
}();
var NewsLoad = function() {
	var final_time = 0;
	var range_type = 0;
	var region_num = 1;
	var is_more = true;
	var range_type_check = 0;
	$("#view-tags").css({
		"background" : "none",
		"padding-left" : "0"
	});
	$(window).scroll(function() {
		var s_h = $(document).scrollTop();
		var w_h = $(window).height();
		var d_h = $(document).height();
		var limit = 10;
		if (w_h + $(document).scrollTop() + limit >= d_h) {
			if (range_type_check == range_type) {
			} else if (is_more) {
				do_load();
				range_type_check = range_type
			} else {
				$("#observe").css({
					"background" : "none",
					"padding-bottom" : "0"
				});
				$("#footer").css("display", "block");
			}
		}
	});
	var auto_load = function(tag_id) {
		$("#footer").css("display", "none");
		var data = "";
		if (tag_id) {
			var url = "/ajax/load_region_seeds/0/0/" + tag_id + "/1";
		} else {
			var url = "/ajax/load_region_seeds/0/0/0/1";
		}
		if (is_more) {
			ajax_load(data, url, "center", do_load);
		} else {
			$("#footer").css("display", "block");
			$("#observe").css({
				"background" : "none",
				"padding-bottom" : "0"
			});
		}
	};
	var do_load = function() {
		$("#footer").css("display", "none");
		var data = {
			type : range_type,
			final_time : final_time,
			region_num : region_num,
			tag_id : tag_id
		};
		var url = "/ajax/load_seeds";
		if (is_more) {
			ajax_load(data, url, "bottom");
		} else {
			$("#footer").css("display", "block");
			$("#observe").css({
				"background" : "none",
				"padding-left" : "0"
			});
		}
	};
	$(".news #view-tags a").live(
			"click",
			function() {
				$("#footer").css("display", "none");
				$(".main_content").empty().append(
						"<div id='observe' class='clearfix'></div>");
				var curTag = $(this).text();
				var preTag = $(this).parent().siblings().find("span");
				preTag.parent().removeClass("on").html(
						"<a href='javascript:void(0)' rel="
								+ preTag.attr('rel') + ">" + preTag.text()
								+ "</a>")
				$(this).parent().addClass("on");
				$(this).parent().html(
						"<span rel=" + $(this).attr('rel') + ">" + curTag
								+ "</span>");
				var tag_id = $(this).attr("rel");
				$("#observe").empty();
				var view_mode = $("#view-mode li[class*='on']").attr("rel");
				if (view_mode == "thumbs") {
					is_more = true;
					auto_load(tag_id);
				} else {
					var tag_name = $("#view-tags li[class='on']").find("span")
							.text();
					var tag_id1 = $("#view-tags li[class='on']").find("span")
							.attr("rel");
					if (tag_id1) {
						$(".main_content").empty().append(
								"<div id='data-list' class='clearfix'><dl><dt><span class='tag'>"
										+ tag_name
										+ "</span></dt><dd></dd></dl></div>");
						ListNewsLoad("", "center", "/ajax/load_seeds_list/",
								tag_id1);
					} else {
						$(".main_content").empty().append(
								"<div id='data-list' class='clearfix'></div>");
						ListNewsLoad("", "center", "/ajax/get_one_day_seed/");
					}
				}
			});
	var ajax_load = function(data, url, position, callback) {
		$.ajax({
			url : url,
			type : "post",
			data : data,
			beforeSend : function() {
				UI.foot_hide($("#observe"), "bottom");
			},
			success : function(response) {
				try {
					var data = eval('(' + response + ')');
					range_type = data.type;
					final_time = data.final_time;
					is_more = data.is_more;
					if (data.tag_id) {
						tag_id = data.tag_id;
					}
					for (i = 0; i < data.data.length; i++) {
						$("#observe").append(data.data[i]);
					}
				} catch (error) {
				}
				if ($.isFunction(callback)) {
					callback();
				}
			},
			error : function() {
			}
		})
	};
	$(".news #view-mode").find("a").click(
			function() {
				$("#view-mode li").removeClass("on");
				$(this).parent().addClass("on");
				if ($(this).parent().attr("rel") == "thumbs") {
					$(".main_content").empty().append(
							"<div id='observe' class='clearfix'></div>");
					is_more = true;
					NewsLoad.auto_load(tag_id);
				} else {
					var tag_name = $("#view-tags li[class='on']").find("span")
							.text();
					var tag_id1 = $("#view-tags li[class='on']").find("span")
							.attr("rel");
					if (tag_id1) {
						$(".main_content").empty().append(
								"<div id='data-list' class='clearfix'><dl><dt><span class='tag'>"
										+ tag_name
										+ "</span></dt><dd></dd></dl></div>");
						ListNewsLoad("", "center", "/ajax/load_seeds_list/",
								tag_id1);
					} else {
						$(".main_content").empty().append(
								"<div id='data-list' class='clearfix'></div>");
						ListNewsLoad("", "center", "/ajax/get_one_day_seed/");
					}
				}
			});
	return {
		auto_load : auto_load,
		do_load : do_load
	}
}();
var ListNewsLoad = function(start_time1, position, url, tag_id1) {
	var start_time = "", start_time_check = "";
	$(window).scroll(
			function() {
				var s_h = $(document).scrollTop();
				var w_h = $(window).height();
				var d_h = $(document).height();
				var limit = 50;
				if (w_h + $(document).scrollTop() + limit >= d_h) {
					if (start_time_check == start_time) {
					} else {
						var tag_name = $("#view-tags li[class='on']").find(
								"span").text();
						var tag_id1 = $("#view-tags li[class='on']").find(
								"span").attr("rel");
						if (tag_id1) {
							doLoad(start_time, "bottom",
									"/ajax/load_seeds_list/", tag_id1);
						} else {
							doLoad(start_time, "bottom",
									"/ajax/get_one_day_seed/");
						}
						start_time_check = start_time;
					}
				}
			});
	var doLoad = function(start_time1, position, url, tag_id1) {
		se = null;
		if (start_time1 === 0) {
			$("#footer").css("display", "block");
			$("#data-list").css({
				"background" : "none",
				"padding-bottom" : "0"
			})
		} else {
			var se = {
				start_time : start_time1,
				tag_id : tag_id1
			};
			ajax_load_news(se, position, url);
		}
	};
	var ajax_load_news = function(my_get_data, position, url) {
		$.ajax({
			url : url,
			type : "get",
			data : my_get_data,
			beforeSend : function() {
				if (start_time != 0) {
					$("#footer").css("display", "none");
					UI.foot_hide($("#data-list"), position);
				}
			},
			success : function(response) {
				try {
					var data = eval('(' + response + ')');
					if (my_get_data.tag_id) {
						for (i = 0; i <= data.data.length; i++) {
							$("#data-list dd").append(data.data[i]);
						}
						$("#data-list a:first-child").addClass("first");
					} else {
						$("#data-list").append(data.data);
					}
					start_time = data.next_time;
				} catch (error) {
				}
			},
			complete : function() {
			},
			error : function() {
			}
		})
	};
	doLoad(start_time1, position, url, tag_id1);
};
jQuery(document)
		.ready(
				function($) {
					$('.footer-content .weixin').mouseenter(function() {
						$('img.weixin-qrcode').tipsy({
							trigger : 'manual',
							gravity : 's',
							fade : true
						}).fadeIn().tipsy('show');
					}).mouseout(function() {
						$('img.weixin-qrcode').fadeOut().tipsy('hide');
					});
					Feedback.init();
					if ($('body').hasClass('feedback'))
						Feedback.feedback_page();
					$(
							".geek_observe p a[href*='http'],.geek_observe .nest a[href*='http']")
							.attr("target", "_blank");
				});
jQuery(function() {
	jQuery('a[href*=#]').live(
			'click',
			function(e) {
				if (location.pathname.replace(/^\//, '') == this.pathname
						.replace(/^\//, '')
						&& location.hostname == this.hostname) {
					var $target = jQuery(this.hash);
					var $url = this.hash.slice(1);
					var $scrollTime = 500;
					function updateUrl() {
						window.location.hash = encodeURIComponent($url);
					}
					$target = $target.length && $target
							|| jQuery('[name=' + $url + ']');
					if (!$url) {
						return false;
					} else if ($target.length) {
						var targetOffset = $target.offset().top;
						jQuery('html,body').animate({
							scrollTop : targetOffset - 50
						}, $scrollTime);
						if ($url.indexOf('section') >= 0)
							targetOffset = $(document).scrollTop() - 50;
						updateUrl();
						return false;
					}
				}
			});
	$('body').append('<a id="anchor-temp" href="' + location.hash + '"></a>');
	$("img:last").load(function() {
		window.setTimeout(function() {
			$('#anchor-temp').trigger('click');
		}, 2000);
	})
});
eval(function(p, a, c, k, e, r) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a)))
				+ ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c
						.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--)
			r[e(c)] = k[c] || e(c);
		k = [ function(e) {
			return r[e]
		} ];
		e = function() {
			return '\\w+'
		};
		c = 1
	}
	;
	while (c--)
		if (k[c])
			p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}
		(
				'8 Z={1v:!!(9.1w&&!9.x),1x:!!9.x,1y:y.z.J("1z/")>-1,10:y.z.J("10")>-1&&y.z.J("1A")==-1,11:!!y.z.1B(/1C.*1D.*1E/)};8 K=Z.11;8 k=d;8 l;4($.q.L){l=0}e{l=M}8 1F=(l==0)?0:1G;8 g=d;8 1H=d;8 12=13 14();6 1I(a){15=13 14();N=(15.16()-12.16());4(17){O=(a)?a+" ":"";O+=(N<1J)?"1K =>":"1L 1M =>";17.1N((O+N))}}4(K){$("#18").m({1O:"1P"});$("#18").m({"1Q-1R":"1S"})}6 19(b,a){r=b.1a("/");r=r[r.P-1].1a(".");1b=r[0]+a;Q 1b}6 1T(a){a="#"+a;$(a)[0].1c=1U+19($(a)[0].1c,".1V")}6 1d(){8 b=0,a=0;4(1W(9.1e)=="1X"){a=9.1e;b=9.1Y}e{4(c.h&&(c.h.A||c.h.7)){a=c.h.7;b=c.h.A}e{4(c.n&&(c.n.A||c.n.7)){a=c.n.7;b=c.n.A}}}Q a}6 1f(a){R=0;1Z(a){20"S":R=0;1g}B=$.q.x?$("s"):$("s, h");B.T({7:R},"1h")}8 C=d;8 j=[0,0,0,1];8 1i=21;8 1j=22;8 U=1k;8 D=d;6 V(){23(i=0;i<j.P;i++){4(j[i]==1){j[i]=0;4(!D){4((i+2)<j.P){j[i+1]=1}e{j[0]=1;D=t}}e{4((i-1)<0){j[1]=1}e{j[i-1]=1;D=d}}1g}}$("#7 .u-2").m({"W-X":"-"+(1j+(i*1i))+"1l 1m",f:"v"});C=Y("V()",U)}6 24(){4(!K){$("#7 1n.u-3").25(6(){4($.q.L){o.E.F[0].p.f="v"}e{$(o.E.F[0]).1o().1p(M,1)}},6(){4(k||g){Q}4($.q.L){o.E.F[0].p.f="w"}e{$(o.E.F[0]).1o().1p(M,0)}});$("#7 1n.u-3").26(6(){g=t;$("#7 .u-2").m({"W-X":"-27 0",f:"v"});B=$.q.x?$("s"):$("s, h");C=Y("V()",U);B.T({7:0},"1h",6(){g=d;4(!k){k=t;1q=$("#7")[0].28+29;$("#7").T({"1r-S":"-="+1q+"1l"},2a,6(){1s()})}})});9.2b=6(){4((!g)&&(!k)){2c=$("h")[0];2d=$("s")[0];4(9.1t){G=9.1t;H=9.2e}e{G=c.n.2f;H=1d()}1u=$("h")[0];I=$("#7")[0];4((1u)&&(I)){4((I.p.f=="w")&&((G*1.5)<H)){g=t;$("#7").2g(l,6(){g=d;o.p.f="v"})}4((I.p.f=="v")&&((G*1.5)>H)){g=t;$("#7").2h(l,6(){g=d;o.p.f="w"})}}}}}e{Y(6(){9.1f(0,1)},1k)}}6 1s(){$("#7 .u-2").m({"W-X":"-2i 1m",f:"w"});$("#7").m({"1r-S":"-2j",f:"w"});k=d;2k(C)};',
				62,
				145,
				'||||if||function|scrollTop|var|window|||document|false|else|display|scroll_animate|body||rocketFireState|upAnimate|anim_time|css|documentElement|this|style|browser|preNewSrc|html|true|level|block|none|opera|navigator|userAgent|scrollLeft|op|rocketFireTimer|toLeftFireAnimation|parentNode|children|wind_height|wind_scroll|scrollBtn|indexOf|mobileSafari|msie|500|loadTime|logStr|length|return|NewDocumentHeight|top|animate|rocketFireAnimateTime|rocketFireAnimate|background|position|setTimeout|browser_detect|Gecko|MobileSafari|domStart|new|Date|domStop|getTime|console|wrapper|getNewSrc|split|newSrc|src|getScrollY|pageYOffset|scrollTo|break|slow|rocketFireFrameLength|rocketFireFrameStart|100|px|0px|div|stop|fadeTo|thisTop|margin|resetScrollUpBtn|innerHeight|elem|IE|attachEvent|Opera|WebKit|AppleWebKit|KHTML|match|Apple|Mobile|Safari|anim_time_short|350|menuSelected|culculateDomRedy|1000|cache|full|refresh|log|overflow|hidden|min|height|1000px|setImgSrc|project_path|svg|typeof|number|pageXOffset|switch|case|149|298|for|initScrollTop|hover|click|298px|offsetTop|250|300|onscroll|body_elem|window_elem|scrollY|clientHeight|fadeIn|fadeOut|149px|125px|clearTimeout'
						.split('|'), 0, {}))
$("form.format div.checkbox span").bind('mouseover', function() {
	$(this).parents('body').addClass('ui-profile');
});
$("form.format div.checkbox span").tipsy({
	fade : true,
	gravity : 'n'
});
var Tags = function() {
	var REAPT_SING = '';
	var Url = {
		addTag : '/ajax/add_tag',
		deleteTag : '/ajax/delete_tag',
		searchTag : '/ajax/auto_tag/tag/',
		loadTag : '/tags/search'
	}
	var guid = $.trim($("#tags_guid").val()), user_guid = $
			.trim($("#user_guid").val()), relation_type = $.trim($(
			"#relation_type").val());
	var eventHandle = function($obj, evt, callback, sign) {
		sign == null ? $obj.bind(evt, callback) : $obj.unbind(evt);
	}
	var tipMsg = function(msg) {
		var $error_div = $('.tags .tags_add').find(".error_msg");
		$error_div.find("strong").text(msg).end()
				.css('display', 'inline-block');
		setTimeout(function() {
			$error_div.fadeOut()
		}, 3000);
		$("#tagsAddTxt").focus();
	}
	var showModify = function() {
		var $remove_div = $(this).parents('.tags'), $tags_add_div = $(this)
				.next('.tags_add');
		$remove_div.find("ul").addClass('edit');
		$remove_div.find(".del").css('display', 'inline-block');
		$tags_add_div.css('display', 'block');
		$tags_add_div.find('input[type=text]').val("").focus();
		$tags_add_div.find('.error_msg strong').html("");
		$tags_add_div.find('.error_msg').hide();
		$(this).hide();
		tags_search($("#tagsAddTxt"));
		$("#tagsAddTxt").bind('keydown', function(e) {
			setTimeout(function() {
				var key = window.event ? e.keyCode : e.which;
				if (key == 13) {
					confirmModify();
					$(".tags_ac_results").fadeOut();
				}
			}, 100);
		});
	};
	var cancelModify = function() {
		var tagsAdd_div = $(this).parent(".tags_add"), remove_div = $(this)
				.parents('.tags'), val = $.trim($("#tagsAddTxt").val());
		tagsAdd_div.hide();
		tagsAdd_div.prev().show();
		remove_div.find('ul').removeClass('edit');
		remove_div.find(".del").hide();
	};
	var confirmModify = function(sign) {
		var val = $.trim($("#tagsAddTxt").val());
		var $ul = $('.tags').find("ul");
		if (val.length === 0) {
			tipMsg("标签不能为空");
			return false;
		}
		var data = "tag_name=" + val + "&guid=" + guid + "&user_guid="
				+ user_guid + "&type=" + relation_type;
		$.post(Url.addTag, data, function(result) {
			switch (result.error) {
			case 0:
				$("#tagsAddTxt").val("").focus();
				$ul.append("<li><span><a target='_blank' href='/tag/" + val
						+ "'>" + val
						+ "</a></span><a href='#' class='del'></a></li>");
				break;
			case 1:
				tipMsg("已存在此标签请重新添加");
				document.getElementById("tagsAddTxt").select();
				REAPT_SING = val;
				$.each($ul.find("li span"), function(i, item) {
					if (val.toUpperCase() == ($(item).text().toUpperCase())) {
						var $repeat = $ul.find('li').eq(i);
						var total = 0;
						var timer = setInterval(function() {
							if (total == 1) {
								clearInterval(timer);
							}
							$repeat.animate({
								'background-color' : '#666'
							}, 200).animate({
								'background-color' : '#EFEFEF'
							}, 200, function() {
								$repeat.removeAttr('style')
							})
							total++;
						}, 300);
					}
				})
				break;
			case 2:
				tipMsg("创建标签失败，请刷新重试！");
				break;
			case 3:
				tipMsg("错误参数，请刷新重试！");
				break;
			}
			if (sign == 'finish') {
				$ul.find('.del').hide();
			}
		}, "json");
	}
	var deleteTag = function(obj) {
		$(obj).delegate(".del", 'click', function() {
			var tag = $(this).parent('li'), tag_val = tag.find("span").text();
			data = "tag_name=" + tag_val + "&guid=" + guid;
			if (!confirm('是否要删除标签“' + tag_val + '”?')) {
				return false;
			}
			$.post(Url.deleteTag, data, function(result) {
				switch (result.error) {
				case 0:
					break;
				case 1:
					tipMsg("关系不存在");
					break;
				case 2:
					tipMsg("标签不存在，请刷新页面重试！");
					break;
				}
				tag.remove();
			}, "json");
			return false;
		})
	}
	var tags_search = function($ipt) {
		yepnope({
			test : $.fn.autocomplete,
			load : [ '/public/js/libs/autocomplete/jquery.autocomplete.js',
					'/public/js/libs/autocomplete/jquery.autocomplete.css' ],
			complete : function() {
				$ipt
						.autocomplete(
								Url.searchTag,
								{
									tips : '',
									minChars : 1,
									cacheLength : 0,
									mustMatch : false,
									matchContains : true,
									scrollHeight : 400,
									selectFirst : false,
									width : 155,
									max : 7,
									formatItem : function(data, i, total) {
										if (i === total) {
											$(".tags_s_list").parents(
													'.ac_results').addClass(
													'tags_ac_results');
										}
										return "<span class='tags_s_list'>"
												+ data.label + "</span>";
									},
									formatMatch : function(data, i, total) {
										return data.label;
									},
									formatResult : function(data) {
										return data.label;
									},
									parse : function(data) {
										var parsed = '';
										if (data) {
											var list = eval('(' + data + ')'), parsed = [];
											for ( var i = 0, j = list.length; i < j; i++) {
												parsed[i] = {
													data : list[i],
													value : list[i].tagname,
													result : list[i].tagname
												};
											}
										}
										return parsed
									}
								}).result(function(e, data, formatted) {
							$ipt.val(data.label);
							return false;
						})
			}
		})
	}
	var modify = function(obj, ipt, add, cancel) {
		var $obj = $(obj), $ipt = $(ipt), $add = $(add), $cancel = $(cancel);
		eventHandle($obj, 'click', showModify);
		eventHandle($add, 'click', confirmModify);
		eventHandle($cancel, 'click', cancelModify);
		deleteTag('.tags');
	}
	var load_tags = function(obj) {
		var $obj = $(obj), total = ($("#tags-total").text()) * 1, tag_name = $
				.trim($(".tags-page h1 strong").text()), $ul = $(".tags-page .tags-page-list ul");
		var li_html = function(guid, entity_guid, title, name, time, highlight,
				abstract_cont, subtype_id) {
			if (subtype_id == 8) {
				return '<li>' + '     <h3><a href="/read/view/' + entity_guid
						+ '">' + title + '</a></h3>'
						+ '     <p class="info"><a href="/user/home/index/'
						+ guid + '">' + name + "</a> / " + time + '</p>'
						+ '     <div class="cont">' + abstract_cont + '</div>'
						+ ' </li>';
			} else if (subtype_id == 5) {
				return '<li>' + '     <h3 class="video"><a href="/cast/view/'
						+ entity_guid + '">' + title + '</a><em></em></h3>'
						+ '     <p class="info">' + time + '</p>'
						+ '     <div class="cont">' + highlight + '</div>'
						+ ' </li>';
			}
		}
		var callback = function() {
			var limit = $(".tags-page .tags-page-list li").length;
			$obj.unbind('click');
			$.post(Url.loadTag, {
				'tag_name' : tag_name,
				"limit" : limit
			}, function(data) {
				$obj.bind('click', callback);
				if (data.toString() !== "NULL") {
					var str = '';
					$.each(data, function(i, item) {
						str += li_html(item.guid, item.entity_guid, item.title,
								item.screen_name, item.time_updated,
								item.highlight, item["abstract"],
								item.subtype_id);
					})
					$ul.append(str);
					if ($(".tags-page .tags-page-list li").length == total) {
						$obj.fadeOut('slow');
					}
				}
			}, 'json')
		}
		$obj.bind('click', callback);
	}
	return {
		modify : modify,
		load : load_tags
	}
}();
Tags.modify('.tags .tags_modify', '#tagsAddTxt', '#tagsAddBtn',
		'#tagsAddCancel');
Tags.load('#tags_load_more');
var Feedback = function() {
	var $fbk_content = $('.fbk-content'), $fbk_reply_box = $('.fbk-reply-box'), $fbk_list_body = $('.fbk-list-body'), $feedback_submit_api = '/feedback/feedback_reply', $feedback_list_api = '/feedback/feedback_list', $feedback_support_api = '/feedback/feedback_like', $feedback_captcha_api = '/feedback/get_captcha', $feedback_reply_form = '/rhea/feedback_reply_form';
	var is_reload = false;
	var type = 0, sort = 0, page = 1;
	var load_data = function(api, post_data) {
		var return_data = false;
		var dataArray = [];
		$.ajax({
			type : 'POST',
			url : api,
			data : post_data,
			async : false,
			success : function(data) {
				if (data && data.success != false) {
					return_data = data;
				} else {
				}
			},
			dataType : 'json'
		});
		return return_data;
	};
	var remove_list = function($fbk_list_body) {
		$fbk_list_body.isotope('remove', $('.fbk-list-item'));
	};
	var do_list_item = function($fbk_list_body, data) {
		remove_list($fbk_list_body);
		$('.total-page').html(data.total_page);
		$('.curent-page').html(data.page);
		$('html,body').animate({
			scrollTop : 0
		}, 700);
		addItem($fbk_list_body, data.feedback)
	};
	var clear_msg = function() {
		$fbk_reply_box.find('.message').html('').slideUp();
	};
	var show_msg = function(msg) {
		$fbk_reply_box.find('.message').html(msg).slideDown();
		setTimeout(function() {
			$fbk_reply_box.find('.message').slideUp();
		}, 2000);
		$('input[name=submit]').removeAttr('disabled');
	};
	var addItem = function($fbk_list_body, data, is_reload) {
		var comment_tpl = '<li id="comment-{{id}}" class="fbk-list-item">\n \
            <div class="support-box">\n \
              <div class="support-num">\n \
                <a data-option-id="{{id}}" href="#support">\n \
                  <span>{{like_cnt}}</span>\n \
                </a>\n \
              </div>\n \
              <a data-option-id="{{id}}" class="support-text" href="#support">支持</a>\n \
            </div>\n \
            <div class="fbk-list-area">\n \
              <div class="fbk-list-content">\n \
                {{content}}\n \
                <span class="arrow-down"></span>\n \
                <span class="arrow-down-border"></span>\n \
              </div>\n \
              <div class="fbk-list-author">\n \
                用户\n \
                <span class="name">{{name}}</span>\n \
                发表于\n \
                <span class="date">{{time_created}}</span>\n \
                <span class="state {{state_class}}">{{state}}</span>\n \
              </div>\n \
              <ul class="fbk-list-reply">\n \
              {{reply}}\n \
              </ul>\n \
            </div>\n \
          </li>';
		var reply_tpl = '<li id="reply-{{id}}" class="fbk-reply-item">\n \
                        <li class="fbk-reply-item">\n \
                  <div class="fbk-reply-content">{{content}}</div>\n \
                  <div class="fbk-reply-author">\n \
                    <span class="name">{{username}}</span>\n \
                    回复于\n \
                    <span class="date">{{time_created}}</span>\n \
                  </div>\n \
                </li>';
		var data_comment = data, data_reply = '', comment_tmp = '', reply_tmp = '';
		for ( var each in data_comment) {
			var reply_list = '';
			data_reply = data_comment[each].reply;
			if (data_reply) {
				for ( var index in data_reply) {
					reply_tmp = reply_tpl.replace(/\{\{id\}\}/,
							data_reply[index].id);
					reply_tmp = reply_tmp.replace(/\{\{content\}\}/,
							data_reply[index].content);
					reply_tmp = reply_tmp.replace(/\{\{username\}\}/,
							data_reply[index].screen_name);
					reply_tmp = reply_tmp.replace(/\{\{time_created\}\}/,
							data_reply[index].time_created);
					reply_list += reply_tmp;
				}
			}
			var state_class = '', state = '';
			if (data_comment[each].status == 1) {
				state_class = 'open';
				state = '已采纳';
			} else if (data_comment[each].status == 2) {
				state_class = 'closed';
				state = '已解决';
			}
			if (data_comment[each].content.substr(75) == '')
				comment_content = data_comment[each].content;
			else
				comment_content = data_comment[each].content.substr(0, 75)
						+ '<span class="more-text">'
						+ data_comment[each].content.substr(75)
						+ '</span><a href="" class="more"> ... [展开]</a>';
			comment_tmp = comment_tpl.replace(/\{\{like_cnt\}\}/,
					data_comment[each].like_cnt);
			comment_tmp = comment_tmp.replace(/\{\{id\}\}/,
					data_comment[each].id);
			comment_tmp = comment_tmp.replace(/\{\{content\}\}/,
					comment_content);
			comment_tmp = comment_tmp.replace(/\{\{name\}\}/,
					data_comment[each].name);
			comment_tmp = comment_tmp.replace(/\{\{time_created\}\}/,
					data_comment[each].time_created);
			comment_tmp = comment_tmp.replace(/\{\{state_class\}\}/,
					state_class);
			comment_tmp = comment_tmp.replace(/\{\{state\}\}/, state);
			comment_tmp = comment_tmp.replace(/\{\{reply\}\}/, reply_list);
			if (is_reload) {
				$fbk_list_body.prepend($(comment_tmp)).isotope('reloadItems')
						.isotope({
							sortBy : 'original-order'
						});
			} else {
				$fbk_list_body.isotope('insert', $(comment_tmp));
			}
		}
	};
	var init_cookies = function(name, key) {
		if ($.cookie(name) == null) {
			$.cookie(name, '{"' + key + '":[]}', {
				expires : 7
			});
		}
	};
	var set_cookies = function(name, key, value) {
		var support_tmp = JSON.parse($.cookie(name));
		for ( var each in support_tmp) {
			support_tmp[each][support_tmp[each].length] = value;
		}
		var str = JSON.stringify(support_tmp)
		$.cookie(name, str);
	};
	var init_supported = function() {
		var supported_tag = JSON.parse($.cookie('feedback'));
		var supported_query = '';
		for ( var i = 0; i < supported_tag['supported'].length; i++) {
			supported_query += '#comment-' + supported_tag['supported'][i]
					+ ',';
		}
		$(supported_query).find('.support-text').addClass('checked')
				.html('已支持').end().find('.support-box').addClass('checked');
	};
	var feedback_load = function($fbk_list_body, type, sort, page) {
		var api_data = {
			"type" : type,
			"sort" : sort,
			"page" : page
		};
		result = load_data($feedback_list_api, api_data);
		if (result) {
			do_list_item($fbk_list_body, result);
			init_supported();
			return true;
		} else {
			return false;
		}
	};
	var feedback_captcha = function() {
		$fbk_reply_box = $('.fbk-reply-box').last();
		$.get($feedback_captcha_api,
				function(data) {
					if (data)
						$fbk_reply_box.find('input[name=captcha]').val(
								data['captcha']);
				}, 'json');
	};
	var feedback_submit = function(type) {
		clear_msg();
		$('input[name=submit]').attr('disabled', 'disabled');
		var content = $.trim($fbk_reply_box.find('textarea[name=content]')
				.val()), email = $.trim($fbk_reply_box
				.find('input[name=email]').val()), url = $.trim($fbk_reply_box
				.find('input[name=url]').val()), name = $.trim($fbk_reply_box
				.find('input[name=name]').val()), mobile = $
				.trim($fbk_reply_box.find('input[name=mobile]').val()), is_agree = $fbk_reply_box
				.find('input[name=is_agree]').attr('checked') ? 1 : 0, captcha = $
				.trim($fbk_reply_box.find('input[name=captcha]').val());
		var api_data = {
			"content" : content,
			"email" : email,
			"url" : url,
			"name" : name,
			"mobile" : mobile,
			"is_agree" : is_agree,
			"captcha" : captcha
		};
		if (content.length == 0)
			show_msg('请填写反馈内容');
		else if (content.length < 5)
			show_msg('意见反馈至少5个字符');
		else if (content.length > 1000)
			show_msg('请将反馈正文长度控制在1000字以内');
		else if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
				.test(email))
			show_msg('请填写格式正确的邮箱地址');
		else if (mobile != ''
				&& !/^(1[0-9]{10})|(15[89][0-9]{8})$/.test(mobile))
			show_msg('请填写格式正确的手机号码');
		else if (name != '' && (name.length < 2 || name.length > 30))
			show_msg('请将称呼长度控制在2-10字以内');
		else {
			result = load_data($feedback_submit_api, api_data);
			if (result) {
				if (result.error_code == 10005) {
					show_msg('请勿多页面重复提交。');
				} else if (result.error_code == 10007) {
					show_msg('您的操作有些频繁，请3分钟之后再次提交反馈。');
				} else if (type == 'single') {
					$('.fbk-form').fadeOut();
					$('.success-page').fadeIn();
					$('.fancybox-inner').animate({
						height : 210
					}, 800);
					var timeout = 10;
					function show() {
						$('.tip-link i').html(timeout);
						timeout--;
						if (timeout == 0) {
							$('.fancybox-close').trigger('click');
						} else {
							setTimeout(show, 1000);
						}
					}
					show();
					$('textarea[name=content]').val('');
				} else {
					feedback_load($fbk_list_body, 0, 0, 1);
					$('textarea[name=content]').val('');
				}
				feedback_captcha();
			}
			$('input[name=submit]').removeAttr('disabled');
		}
	};
	var submit_init = function() {
		var $fbk_content = $('.fbk-content').last(), $fbk_reply_box = $(
				'.fbk-reply-box').last(), $fbk_list_body = $('.fbk-list-body')
				.last();
		$('input').tipsy({
			gravity : 's',
			fade : true,
			live : true
		});
		feedback_captcha();
		$fbk_reply_box.find('.fbk-form label').bind('click', function() {
			if ($('input[name=is_agree]').attr('checked') == 'checked') {
				$(this).addClass('checked');
			} else
				$(this).removeClass('checked');
		});
	};
	var placeholder = function() {
		if (!Modernizr.input.placeholder) {
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('').parent().addClass('focus');
					;
					input.removeClass('placeholder');
				}
			}).blur(
					function() {
						var input = $(this);
						if (input.val() == ''
								|| input.val() == input.attr('placeholder')) {
							input.addClass('placeholder').parent().removeClass(
									'focus');
							;
							input.val(input.attr('placeholder'));
						}
					});
			$('[placeholder]').each(function(index) {
				if ($(this).val() == '')
					$(this).blur();
			});
		}
	}
	var fancybox_page = function() {
		var $submit_btn_single = $('.feedback-single input[type=submit]');
		submit_init();
		if ($.trim($fbk_reply_box.find('input[name=url]').val()) == '')
			$fbk_reply_box.find('input[name=url]').val(document.URL)
		$submit_btn_single.bind('click', function(event) {
			event.preventDefault();
			feedback_submit('single');
		});
		$fbk_reply_box.find('i.close').bind('click', function(event) {
			event.preventDefault();
			$('.fancybox-close').trigger('click');
		});
		placeholder();
	};
	var init = function() {
		$(".fancybox").fancybox({
			helpers : {
				title : null,
				overlay : {
					closeClick : false,
					css : {
						'background' : 'rgba(0, 0, 0, 0.8)'
					}
				}
			},
			padding : 0,
			margin : 0,
			width : 460,
			height : 433,
			autoSize : false,
			closeClick : false,
			scrolling : 'no',
			openEffect : 'none',
			closeEffect : 'none'
		});
	}
	var feedback_page = function() {
		var $submit_btn = $fbk_reply_box.find('input[type=submit]');
		submit_init();
		$fbk_list_body.isotope({
			itemSelector : '.fbk-list-item',
			layoutMode : 'straightDown'
		});
		init_cookies('feedback', 'supported');
		feedback_load($fbk_list_body, type, sort, page);
		init_supported();
		$fbk_content.find('.fbk-sort a').bind('click', function(event) {
			event.preventDefault();
			sort = $(this).attr('data-option-id');
			if (feedback_load($fbk_list_body, type, sort, 1)) {
				$(this).addClass('checked').siblings().removeClass('checked');
			}
		});
		$fbk_content.find('.fbk-type a').bind(
				'click',
				function(event) {
					event.preventDefault();
					type = $(this).attr('data-option-id');
					if (feedback_load($fbk_list_body, type, sort, 1)) {
						$(this).addClass('checked').parent().siblings().find(
								'a').removeClass('checked');
					}
				});
		$fbk_content.find('.fbk-pagination a').bind('click', function(event) {
			event.preventDefault();
			page = parseInt($('.curent-page').html());
			total_page = parseInt($('.total-page').html());
			$('.prev, .next').removeClass('none');
			if ($(this).hasClass('next')) {
				if (page > total_page - 1) {
					$('.next').addClass('none');
				} else {
					if (page == total_page - 1)
						$('.next').addClass('none');
					if (feedback_load($fbk_list_body, type, sort, page + 1)) {
						$('.curent-page').html(page + 1);
					}
				}
			} else {
				if (page < 2) {
					$('.prev').addClass('none');
				} else {
					if (page == 2)
						$('.prev').addClass('none');
					if (feedback_load($fbk_list_body, type, sort, page - 1)) {
						$('.curent-page').html(page - 1);
					}
				}
			}
		});
		$fbk_content.find('.support-box').live(
				'click',
				function(event) {
					event.preventDefault();
					var id = $(this).parents().filter('li').attr('id')
							.substr(8), support_cnt = $(this).find(
							'.support-num span'), support_text = $(this).find(
							'.support-text');
					var api_data = {
						"guid" : id,
					};
					if (!$(this).hasClass('checked')) {
						result = load_data($feedback_support_api, api_data);
						if (result) {
							support_cnt.html(parseInt(support_cnt.html()) + 1);
							$(this).addClass('checked');
							support_text.addClass('checked').html('已支持');
							$.cookie('the_cookie', 'the_value', {
								expires : 7
							});
							set_cookies('feedback', 'id', id)
						}
					}
				});
		$fbk_content.find('a.more').live('click', function(event) {
			event.preventDefault();
			var text = $(this).html();
			if (text == ' ... [展开]') {
				$(this).html(' ... [收起]');
			} else {
				$(this).html(' ... [展开]');
			}
			$(this).siblings().filter('.more-text').fadeToggle(function() {
				$fbk_list_body.isotope('reloadItems').isotope({
					sortBy : 'original-order'
				});
			});
		});
		$submit_btn.bind('click', function(event) {
			event.preventDefault();
			$(this).attr('disabled', 'disabled');
			feedback_submit();
		});
		placeholder();
	};
	return {
		init : init,
		fancybox_page : fancybox_page,
		feedback_page : feedback_page
	}
}();
var Recruitment_manger = function($ele, $cont) {
	var timer = null;
	$ele.mouseenter(function() {
		clearTimeout(timer);
		$cont.show();
	})
	$ele.mouseleave(function() {
		timer = setTimeout(function() {
			$cont.hide();
		}, 500);
	})
	$cont.mouseenter(function() {
		clearTimeout(timer);
	})
	$cont.mouseleave(function() {
		$cont.hide();
	})
}
var TagsInfo = function() {
	var load = function(tag_name, my_object, category) {
		var ajax_url = '';
		var params = 'tag=' + tag_name + '&category=' + category;
		$.ajax({
			url : '/ajax/content_with_tag',
			type : 'get',
			data : params,
			beforeSend : function() {
				my_object.html('正在加载...');
			},
			success : function(response) {
				var all_data = eval('(' + response + ')');
				var content = all_data['data'];
				my_object.html('');
				if (content.length == 0) {
					my_object.parent().hide();
				}
				for ( var count = 0; count < content.length; count++) {
					var seed_data = content[count];
					my_object.append('<div class="info" row-id="' + count
							+ '"></div>');
					var container = my_object.children('[row-id="' + count
							+ '"]');
					container.append('<div class="title"></div>');
					container.children('.title').html(
							'<a href="' + seed_data['url'] + '">'
									+ seed_data['title'] + '</a>');
					add_extra_info(container, seed_data, category);
				}
			},
			error : function() {
				my_object.html('加载失败 : (');
			},
			timeout : function() {
				my_object.html('服务器太累了，请刷新重试');
			}
		})
	};
	var add_extra_info = function(container, info, category) {
		switch (category) {
		case 'seed':
			container.append('<div class="participants"></div>');
			container.append('<div class="abstract"></div>');
			container.children('.participants').html(
					'<a href="' + info['author_url'] + '">' + info['author']
							+ '</a>');
			container.children('.abstract').html(info['abstract']);
			break;
		case 'clip':
			container.append('<div class="participants"></div>');
			container.append('<div class="abstract"></div>');
			container.children('.abstract').html(info['abstract']);
			speakers = info['speakers'];
			for ( var count in speakers) {
				var speaker_info = speakers[count];
				for ( var name in speaker_info) {
					url = speaker_info[name];
				}
				container.children('.participants').append(
						'<a href="' + url + '">' + name + '</a>&nbsp;');
			}
			break;
		case 'topic':
			container.append('<div class="participants"></div>');
			container.children('.participants').append(
					'<a href="' + info['owner_url'] + '">' + info['owner']
							+ '</a>');
			break;
		}
	}
	return {
		load : load
	}
}();
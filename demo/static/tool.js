/*eslint-disable*/

/*===日期、时间、生日、手机号、url参数=====================================* /
 * @param {any} fmt
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
	//author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	}
	return fmt;
};

/**计算当前日期+N天后的日期*/
Date.prototype.CurrentDateAddDay = function(n) {
	var s, d, t, t2;
	t = new Date().getTime();
	t2 = n * 1000 * 3600 * 24;
	t += t2;
	d = new Date(t);
	s = d.getUTCFullYear() + "-";
	s += ("00" + (d.getUTCMonth() + 1)).slice(-2) + "-";
	s += ("00" + d.getUTCDate()).slice(-2);
	return s;
};

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};

/**时间以几分钟、几小时前、几天前等时间差显示的js函数*/
function jsDateDiff(publishTime) {
	var d_minutes, d_hours, d_days;
	var timeNow = parseInt(new Date().getTime() / 1000);
	var d;
	d = timeNow - publishTime;
	d_days = parseInt(d / 86400);
	d_hours = parseInt(d / 3600);
	d_minutes = parseInt(d / 60);
	if (d_days > 0 && d_days < 4) {
		return d_days + "天前";
	} else if (d_days <= 0 && d_hours > 0) {
		return d_hours + "小时前";
	} else if (d_hours <= 0 && d_minutes > 0) {
		return d_minutes + "分钟前";
	} else if (d_minutes <= 0 && d > 0) {
		return "刚刚";
	} else {
		var s = new Date(publishTime * 1000);
		// s.getFullYear()+"年";
		return s.getMonth() + 1 + "月" + s.getDate() + "日";
	}
}

/**获取varchar()长度*/
function GetLength(str) {
	///<summary>获得字符串实际长度，中文2，英文1</summary>
	///<param name="str">要获得长度的字符串</param>
	var realLength = 0,
		len = str.length,
		charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
}

/**验证生日*/
function ChkBirth(sBirth) {
	var pattern = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
	return pattern.test(sBirth);
}

/**验证手机号*/
function checkMobile(sMobile) {
	return /^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(sMobile);
}

/**获取url中的参数，不含特殊符号*/
function getUrlPrmVal(url, name) {
	var reg = new RegExp("(\\?|&)" + name + "=([^&?]*)", "i"); //是正则表达式（regular expression）的简写。
	var arr = url.match(reg);

	if (arr) {
		return decodeURI(arr[2]);
	}

	return "";
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	var q = window.location.pathname.substr(1).match(reg_rewrite);
	if (r != null) {
		//return unescape(r[2]);
		return decodeURI(r[2]);
	} else if (q != null) {
		//return unescape(q[2]);
		return decodeURI(r[2]);
	} else {
		return null;
	}
}
/**
 * 获取跳转页面的url参数，可能含有?
 * //MARK:已废弃的unescape() 方法
 */
function getUrlHrefVal(url, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return "";
}

/*===支付方式、收货方式、订单状态、是否登录、登录跳转、页面加随机数=====================* /
/**判断支付方式*/
function FndPayTp(PayTp) {
	if (PayTp === 0) {
		return "支付宝";
	} else {
		return "微支付";
	}
}

/**判断收货方式*/
function FndRcvTp(RcvTp) {
	if (RcvTp === 0 || RcvTp === 2) {
		return "送货上门";
	} else {
		return "门店自提";
	}
}

/**判断订单状态*/
function FndNetOrdStt(MnStt, SalStt, RfdStt) {
	if (MnStt === 0) {
		if (SalStt === 0) {
			return "未付款";
		} else if (SalStt === 1) {
			return "已付款";
		} else if (SalStt === 2) {
			return "已接单";
		} else if (SalStt === 3) {
			return "已生产";
		} else if (SalStt === 4) {
			return "已发货";
		} else {
			return "已收货";
		}
	} else if (MnStt === 1) {
		if (RfdStt === 0) {
			var s = "";
			if (SalStt === 1) {
				s = "已付款";
			} else if (SalStt === 2) {
				s = "已接单";
			} else if (SalStt === 3) {
				s = "已生产";
			} else if (SalStt === 4) {
				s = "已发货";
			} else {
				s = "已收货";
			}
			if (s !== "") {
				s = s + ",";
			}
			return s + "等待退款";
		} else if (RfdStt === 1) {
			return "已退款";
		}
	} else {
		return "已关闭";
	}
}

/**
 * ????
 */
var Tkt_Options = {
	TKT_VALFIXED: 1,
	TKT_PAYCNNTDSC: 2,
	TKT_PAYDSCOPT_CNNTPAY: 4,
	TKT_PAYDSCOPT_DSCPRC: 8,
	TKT_PAYDSCOPT_ORGPRC: 16,
	TKT_EQLCSH: 32,
	TKT_NTCKBC: 64
};
/**
 * 券使用说明
 * @param {any} PayDscOpt 券折扣属性
 */
function FndTktDescription(PayDscOpt) {
	var str = "";
	if (PayDscOpt == 0) {
		str = "不可支付折扣销售的商品";
	} else if (PayDscOpt == 2) {
		str = "折扣商品恢复原价";
	}
	return str;
}

/**验证是否登录*/
function DoVrfLog(GoTo) {
	var Res = true; //默认已登录，主要依靠后台程序判断登录信息，js判断未登录，再转向登录页面

	$.ajax({
		url: "MainHdl.ashx",
		type: "post",
		//async: false,//同步才可以正常return，异步不能真实return
		data: { method: "VrfLog" },
		success: function success(data) {
			if (data === "1") {
				//已登录
				Res = true;
			} else {
				//未登录
				location.href = "Default.aspx?goto=" + GoTo; //登录页面
			}
		}
	});

	return Res;
}

/**
 * 登录跳转
 * @param {any} GoTo 跳转的页面
 */
function Login() {
	var url = location.href;
	var path = location.pathname;
	var pos = url.indexOf(path);
	var GoTo = url.substring(pos + 1);
	location.href = "Default.aspx?goto=" + GoTo; //登录页面
}

/**
 * 功能描述：公共 JS文件。
 * Copyright (c) 2012 史守阳
 * Date: 2012-10-18
 * version: 1.0.0
 */

//给所有的超链接加上随机数，避免缓存
function f_rand() {
	var rand = Math.random();
	$("a").each(function() {
		var href = $(this).attr("href");
		if (
			!href ||
			href.length === 0 ||
			href.indexOf("javascript") > -1 ||
			href.indexOf("Javascript") > -1 ||
			href.indexOf("#") > -1
		)
			return;
		else if (href.indexOf("?") > -1) {
			$(this).attr("href", href + "&" + rand);
		} else {
			$(this).attr("href", href + "?" + rand);
		}
	});
}

$(function() {
	f_rand();
});

/*===textarea、悬浮导航、没有更多数据、判断是否手机端=====================* /

/**
 * textarea自动增加高度
 * @param {any} oField
 */
function autoGrow(oField) {
	if (oField.scrollHeight > oField.clientHeight) {
		oField.style.height = oField.scrollHeight + "px";
	}
}

/**悬浮导航*/
function ShowNaviFab() {
	var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

	var links;
	switch (i) {
		case -1: //刷新
			links = [
				{
					url: "javascript:location.reload()",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: '<i class="yicon yicon-prepage"></i>',
					title: "刷新"
				}
			];
			break;
		case 0: //主页
			links = [
				{
					url: "Main.aspx?" + Math.random(),
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: '<i class="yicon yicon-zhuye"></i>',
					title: "个人中心"
				}
			];
			break;
		case 1: //返回
			links = [
				{
					url: "javascript:history.go(-1)",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: '<i class="yicon yicon-prepage"></i>',
					title: "返回"
				}
			];
			break;
		case 2: //导航+主页+返回
			links = [
				{
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: "+",
					title: "导航"
				},
				{
					url: "Main.aspx?" + Math.random(),
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "#fffff",
					icon: '<i class="yicon yicon-zhuye"></i>',
					title: "个人中心"
				},
				{
					url: "javascript:history.go(-1)",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "white",
					icon: '<i class="yicon yicon-prepage"></i>',
					title: "返回"
				}
			];
			break;
		case 3: //导航+主页+充值(会员码页面跳转充值页面)
			links = [
				{
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: "+",
					title: "导航"
				},
				{
					url: "Main.aspx?" + Math.random(),
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "#fffff",
					icon: '<i class="yicon yicon-zhuye"></i>',
					title: "个人中心"
				},
				{
					url: "AmtInc.aspx",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "white",
					icon: '<i class="yicon yicon-chongzhi"></i>',
					title: "充值"
				}
			];
			break;
		case 4: //导航+主页+返回+会员码
			links = [
				{
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: "+",
					title: "导航"
				},
				{
					url: "Main.aspx?" + Math.random(),
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "#fffff",
					icon: '<i class="yicon yicon-zhuye"></i>',
					title: "个人中心"
				},
				{
					url: "javascript:history.go(-1)",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "white",
					icon: '<i class="yicon yicon-prepage"></i>',
					title: "返回"
				},
				{
					url: "MmbPayCode.aspx",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					color: "white",
					icon: '<i class="yicon yicon-sweep"></i>',
					title: "会员码"
				}
			];
			break;
		case 10: //商城
			links = [
				{
					url: "MallMain.aspx?" + Math.random(),
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: '<i class="yicon yicon-zhuye"></i>',
					title: "商城中心"
				}
			];
			break;
		case 99: //返回小程序//MARK:href中执行方法 https://www.cnblogs.com/Renyi-Fan/p/8946617.html
			links = [
				{
					url: "javascript:backMinapp()",
					bgcolor: "rgba(198, 127, 197, 0.58)",
					icon: '<img src="images/mainpage/diancan.png" style="width:100%"/>',
					title: "返回小程序"
				}
			];
			break;
	}
	$(".kc_fab_wrapper").kc_fab(links);
	if (i > 1) {
		$(".kc_fab_main_btn").addClass("multi_btn");
	}
}
/**
 * //MARK:返回小程序主页
 */
function backMinapp() {
	wx.miniProgram.redirectTo({
		url: "/pages/main/main"
	});
}
/**主体颜色*/
if ($(".main_color").length > 0) {
	$(".main_color")
		.addClass("yui")
		.addClass("color-royal");
}
/**页面底部加入"没有更多数据"*/
function AddEndHtml() {
	var str =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: "没有更多数据了";

	return (
		'<div class="weui-loadmore weui-loadmore_line">' +
		'<span class="weui-loadmore__tips">' +
		str +
		"</span>" +
		"</div>"
	);
}

/**
 * 促销商品以中文【】开头，标记颜色
 * @param {any} text
 */
function ColorText(text) {
	if (text.indexOf("【") === 0 && text.indexOf("】") > 0) {
		text =
			"<span class=txt-color-red>" +
			text.split("】")[0] +
			"】</span>" +
			text.split("】")[1];
	}
	return text;
}

/*========公共库======================================================*/
/*****************************************************************
                 jQuery Ajax封装通用类  (linjq)     //UNDONE:改为类似ajax({})方式调用的封装
*****************************************************************/
$(function() {
	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
	 *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
	 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	 * successfn 成功回调函数
	 * errorfn 失败回调函数
	 */
	jQuery.rajax = function(url, data, successfn, errorfn, completefn) {
		$.ajax({
			url: url,
			type: "post",
			data: data,
			success: function(data, status, xhr) {
				/*后台redirect跳转错误页面*/
				///alert("登录超时，或未登录，请重新登录",function(){})//分类：未登录跳转，错误跳转
				var redirect = xhr.getResponseHeader("Redirect");
				var RedirectUrl = xhr.getResponseHeader("RedirectUrl");
				if (redirect === "true" && RedirectUrl) {
					location.href = RedirectUrl;
					return false;
				}
				successfn(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				errorfn(XMLHttpRequest, textStatus, errorThrown);
			},
			complete: function(e) {
				completefn(e);
			}
		});
	};
});

//  作者：SuperCookies
//来源：CSDN
//原文：https://blog.csdn.net/supercookies/article/details/80350526
//版权声明：本文为博主原创文章，转载请附上博文链接！
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (
		bIsIpad ||
		bIsIphoneOs ||
		bIsMidp ||
		bIsUc7 ||
		bIsUc ||
		bIsAndroid ||
		bIsCE ||
		bIsWM
	) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * 将form序列化字符串转json
 */
var DataDeal = {
	//将从form中通过$('#form').serialize()获取的值转成json
	formToJson: function(data) {
		data = decodeURIComponent(data, true); //防止中文乱码
		data = data.replace(/&/g, '","');
		data = data.replace(/=/g, '":"');
		data = '{"' + data + '"}';
		data = JSON.parse(data);
		return data;
	}
};

// 拓展内容,处理存储相关
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie =
		c_name +
		"=" +
		escape(value) +
		(expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

//取回cookie
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

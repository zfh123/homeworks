/*
 统计
 * */

//var URL = "http://192.168.0.122:8104/lp-collect-msc/";//统计协议地址
//var T_URL = "http://192.168.0.122:9098/lp-advert-msc/";
var URL = "http://collect.imchumo.com/lp-collect-msc/";//统计协议地址
var T_URL = "http://admsc.yschumo.com/lp-advert-msc/";
var androidAppId;
var iosAppId;
if(location.search.indexOf("=") != -1){
	var str = location.search.split("=")[1];//获取keynum-appid-webcode
	var strData = str.split("-");
	var keynum = strData[0];
	androidAppId = strData[1];
	iosAppId = strData[2];
	var webCode = strData[3];
}

var isture = true;

//设置cookie
 function setcookie(name,value){  
    var Days = 30;  
    var exp  = new Date();  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}  
//获取cookie
function getcookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
        return (arr[2]);  
    }else{  
        return "";  
    }  
} 
//页面跳转
function jump(url){
	window.location.href = url
}

//点击事件
function clickEvent(){
	$(".look,.load_more,.people").click(function(){
		$(".h_mask").show();
	});
	
	$(".hclose").click(function(){
		isture = false;
		$(".h_mask").hide();
	})
	
	$(".aboutus").click(function(){
		isture = false;
		jump("about.html");
	})
	
	$("#back").click(function(){
		jump("index.html");
	})
	
}

function bodyload(){
	autodownload();//自动下载
}

$(function(){
	var i = 0;
	do {
 		history.pushState('', 'http://sm.mmyoou.com/chumoweb/sina_fy')
 		i++;
 	}
 	while(i<1) 
	
	$(".handload").click(function(){
		handerdownload();//手动下载
	})
	
	clickEvent();//点击事件
})
//自动下载
function autodownload(){
	if(webCode){
		if(getcookie("autoname") != str){
			var ticket;
			 if(navigator.appVersion.indexOf("Android") == -1){
			 	//ios
			 	ticket = keynum+"-"+iosAppId+"-"+webCode;
			 }else{
			 	//android
			 	ticket = keynum+"-"+androidAppId+"-"+webCode;
			 }
	        	
			var url = URL + "f_105_10_1.service?ticket="+ticket;
			console.log(url);
			$.get(url,function(data){
				console.log(data);
				setcookie("autoname",str);
				autoOrhander(2);//自动下载
			});
		}else{
			autoCookieSamestr();
		}
	}else{
		autourl();
	}
}

//推广用户应用下载上传
function autoupload(type){
	var appId;
	 if(navigator.appVersion.indexOf("Android") == -1){
	 	//ios
	 	appId = iosAppId;
	 }else{
	 	//android
	 	appId = androidAppId;
	 }
	        	
	var url  = URL + "f_105_11_1.service?keynum="+keynum+"&appId="+appId+"&webCode="+webCode+"&downloadType="+type;
	$.get(url,function(data){
		console.log(data);
		if(data.code == 200){
			autoCookieSamestr();
		}
	});
}

function autourl(){
	var url = T_URL + "f_103_10_1.service?webSource="+1022;
    $.get(url,function(data){
        console.log(data);
        if(navigator.appVersion.indexOf("Android") == -1){
	        	//ios
        	if(data.body["downUrlIos"] != ""){
        		//window.location.href = data.body["downUrlIos"];
        	}
	    }
	    else{
	        //android
	        if(data.body["downUrl"] != ""){
	        	window.location.href = data.body["downUrl"];
	        }
		}
    });
}
//当cookie等于str
function autoCookieSamestr(){
	var url = T_URL + "f_103_10_1.service?webSource="+webCode;
	$.get(url,function(data){
		console.log(data);
		if(navigator.appVersion.indexOf("Android") == -1){
        	//ios
        	if(data.body["downUrlIos"] != ""){
        		//window.location.href = data.body["downUrlIos"];
        	}
	    }
	    else{
	        //android
	        if(data.body["downUrl"] != ""){
	        	window.location.href = data.body["downUrl"];
	        }
		}
	})
}

//手动下载
function handerdownload(){
	if(webCode){
		if(getcookie("handname") != str){
			setcookie("handname",str);
			autoOrhander(1);//手动下载
		}else{
			handerloadurl();
		}
	}else{
		handerurl();
	}
}

function handerurl(){
	var url = T_URL + "f_103_10_1.service?webSource="+1022;
    $.get(url,function(data){
        console.log(data);
        if(navigator.appVersion.indexOf("Android") == -1){
	        	//ios
        	if(data.body["downUrlIos"] != ""){
        		$(".download").attr("href",data.body["downUrlIos"]);
        		document.getElementById("alink").click(); 
        	}
	    }
	    else{
	        //android
	        $(".shaodeng").fadeIn(500);
	        setTimeout(function(){
	        	$(".shaodeng").fadeOut(500);
	        },5000)
	        if(data.body["downUrl"] != ""){
	        	/*$(".download").attr("href",data.body["downUrl"]);
	        	document.getElementById("alink").click(); */
	        	window.location.href = data.body["downUrl"];
	        }
		}
    });
}

function handerloadurl(){
	var url = T_URL + "f_103_10_1.service?webSource="+webCode;
	$.get(url,function(data){
		console.log(data);
		if(navigator.appVersion.indexOf("Android") == -1){
        	//ios
        	if(data.body["downUrlIos"] != ""){
        		$(".download").attr("href",data.body["downUrlIos"]);
        		document.getElementById("alink").click(); 
        	}
	    }
	    else{
	        //android
	        $(".shaodeng").fadeIn(500);
	        setTimeout(function(){
	        	$(".shaodeng").fadeOut(500);
	        },5000)
	        if(data.body["downUrl"] != ""){
	        	/*$(".download").attr("href",data.body["downUrl"]);
	        	document.getElementById("alink").click(); */
	        	window.location.href = data.body["downUrl"];
	        }
		}
	})
}

function autoOrhander(type){
	var appId;
	if(navigator.appVersion.indexOf("Android") == -1){
	 	//ios
	 	appId = iosAppId;
	 }else{
	 	//android
	 	appId = androidAppId;
	 }
	var url  = URL + "f_105_11_1.service?keynum="+keynum+"&appId="+appId+"&webCode="+webCode+"&downloadType="+type;
	$.get(url,function(data){
		console.log(data);
		if(data.code == 200){
			if(type == 1){
				handerloadurl();
			}else{
				autoCookieSamestr();
			}
		}
	});
}



function randomNumChar() {
	var chars = 'abcdefhijkmnprstwxyz';
	var nums = '0123456789';
	var randomChar = [];
	var randomNum = [];
	for(var i = 0; i< 10;i++) {
		var randomnum1 = Math.floor(Math.random() * 20);
		var randomnum2 = Math.floor(Math.random() * 10);
		randomChar.push(chars.charAt(randomnum1));
		randomNum.push(nums.charAt(randomnum2));
	}
	//alert(randomChar.join('') + randomNum.join(''));
	return '?'+randomChar.join('') + randomNum.join('');
}


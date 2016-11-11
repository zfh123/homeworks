$(function(){
	 var index = getIndex();
    if(index == "about"){
        aboutEvent();
    }
})

function aboutEvent(){
	$("#service").click(function(){
		jump("service.html");
	});
	
	$("#deal").click(function(){
		jump("deal.html");
	})
}
//跳转
function jump(url){
	window.location.href = url;
}
//获取当前页面
function getIndex(){
    var path = location.pathname.split("/").pop();
    return path.split(".")[0];
}
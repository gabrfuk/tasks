$(document).ready(function(){

	var storage = window.localStorage;
	
	if(storage.length != 0){
		for(var i = 0; i< storage.length; i++){
			$("#content ul").append('<li id="'+i+'"><i class="far fa-minus-square del" id="'+i+'">' + storage.getItem(i) + '</li>');
		}
	}

	$("#add").click(function(){
		var newTask = $("#newTask").val();
		if(newTask != undefined || newTask != ""){
			$("#content ul").append('<li id="'+storage.length+'" ><i class="far fa-minus-square del" id="'+storage.length+'"></i>' + newTask + '</li> ');
			storage.setItem(storage.length,newTask);
			$("#newTask").val("");
		}
	});
	
	$(document).on('click','.del',function(){
		var id = $(this).attr("id");
		
		$("li").remove("#"+id);
		storage.removeItem(storage.length-1);

	});
	
	$(".clear").click(function(){
		$("li").remove();
		storage.clear();
	});
	
	$("#newTask").keydown(function(e){
		if(event.which == 13)
			$("#add").click();
	});

});
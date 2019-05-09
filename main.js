$(document).ready(function(){

	chrome.storage.sync.get(function (tasks)
	{
		if(tasks.description != undefined)
		var currentDate = Date.parse(new Date());
		{
			for(var i = 0; i< tasks.description.length; i++){
				var color = currentDate > tasks.alarmSet[i] ? "text-danger" : "";
				$("#content ul").append('<li id="'+i+'" class="'+color+
										'" data-time="'+ tasks.alarmTime[i] +
										'" data-reminder="'+ tasks.alarmSet[i] +
										'"><i class="far fa-minus-square del " id="'+i+'"></i>' + tasks.description[i] + ' - ' +currentDate + ' - ' + tasks.alarmSet[i] + '</li>');
			}
		}		
	});
	
	

	$("#add").click(function()
	{
		
		chrome.storage.sync.get(function (tasks)
		{
			var nextKey;
			if(tasks.description == undefined)
			{
				nextKey = 0;
				tasks = {'description':[],'alarmTime':[],'alarmSet':[]};
			}
			else
			{
				nextKey = tasks.description.length;
			}
			
			
			
			tasks.description.push($("#newTask").val());
			tasks.alarmTime.push($(".badge-light").text());
			var dt  = new Date();
			tasks.alarmSet.push(dt.getTime() + tasks.alarmTime[nextKey]*60000);
			
			if(tasks.description[nextKey] != undefined || tasks.description[nextKey] != "")
			{
				$("#content ul").append('<li id="'+nextKey+
											'"data-time="'+ tasks.alarmTime[nextKey] +
											'" data-reminder="'+ tasks.alarmSet[nextKey] +
											'"><i class="far fa-minus-square del" id="'+nextKey+'"></i>' + tasks.description[nextKey] + 
										'</li> ');
				chrome.storage.sync.set(tasks,null);
				$("#newTask").val("");
			}
	
		});
		
	});
	
	$(document).on('click','.del',function(){
		var id = $(this).prop("id");
		
		$("li").remove("#"+id);
		chrome.storage.sync.get(function (tasks){
			tasks.description.splice(id,1);
			tasks.alarmTime.splice(id,1);
			tasks.alarmSet.splice(id,1);
			
			chrome.storage.sync.set(tasks,null);
			
			$("li").each(function(index){
				var currentId = $(this).prop("id");
				if(currentId > id){
					$(this).prop("id",currentId - 1);
					$("li#"+index + ' i').prop("id",currentId - 1);
				}
			})
		});

	});
	
	$(".fa-tasks").click(function(){
		render();
		
	});
	
	$(".clear").click(function(){
		$("li").remove();
		chrome.storage.sync.clear();
	});
	
	$("#newTask").keydown(function(e){
		if(event.which == 13)
			$("#add").click();
	});

	$(".badge").click(function(){
		$(".badge").removeClass("badge-light");
		$(".badge").addClass("badge-dark");
		
		$(this).removeClass("badge-dark");
		$(this).addClass("badge-light");
	});

	function render(){
	chrome.storage.sync.get(function (tasks)
	{
		if(tasks.description != undefined)
		var currentDate = Date.parse(new Date());
		{
			for(var i = 0; i< tasks.description.length; i++){
				var color = currentDate > tasks.alarmSet[i] ? "text-danger" : "";
				$("#content ul").append('<li id="'+i+'" class="'+color+
										'" data-time="'+ tasks.alarmTime[i] +
										'" data-reminder="'+ tasks.alarmSet[i] +
										'"><i class="far fa-minus-square del " id="'+i+'"></i>' + tasks.description[i] + ' - ' +currentDate + ' - ' + tasks.alarmSet[i] + '</li>');
			}
		}		
	});	
	}

});
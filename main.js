$(document).ready(function(){
	var timerShouldRun = true;
	//////////////////////////////////////////////////////
	//Initialization
	//////////////////////////////////////////////////////
	chrome.storage.sync.get(function (tasks)
	{
		if(tasks.description != undefined)
		{
			var currentDate = Date.parse(new Date());
			
			for(var i = 0; i< tasks.description.length; i++){
				
				var color = (currentDate > tasks.alarmSet[i]) && tasks.alarmTime[i] != 0 ? "text-danger" : "";
				var urgent = tasks.urgent[i] ? "fas fa-exclamation-circle urgent" : "fas fa-minus-circle";
				
				$("#content ul").append('<li id="'+i+'" class="'+color+
										'" data-time="'+ tasks.alarmTime[i] +
										'" data-reminder="'+ tasks.alarmSet[i] +
										'" data-urgent="' + tasks.urgent[i] +
										'"><i class="' + urgent + ' icon del p-2" id="'+i+'"></i>' + tasks.description[i] + '</li>');
			}
		}		
	});
	
	
	//////////////////////////////////////////////////////
	//Adding a new task
	//////////////////////////////////////////////////////
	function addTask()
	{
		if($("#newTask").val() != "")
		{
			var dt  = new Date();
			
			chrome.storage.sync.get(function (tasks)
			{
				var nextKey = 0;
				if(tasks.description == undefined)
					tasks = {'description':[],'alarmTime':[],'alarmSet':[],'urgent':[]};
				else
					nextKey = tasks.description.length;
				
				tasks.description.push($("#newTask").val());
				tasks.alarmTime.push($(".badge-light").text());
				tasks.alarmSet.push(dt.getTime() + tasks.alarmTime[nextKey]*60000);
				tasks.urgent.push($("#urgent").hasClass("urgent"));

				var urgent = tasks.urgent[nextKey] ? "fas fa-exclamation-circle urgent" : "fas fa-minus-circle";

				$("#content ul").append('<li id="'+nextKey+
											'"data-time="'+ tasks.alarmTime[nextKey] +
											'" data-reminder="'+ tasks.alarmSet[nextKey] +
											'" data-urgent="' + tasks.urgent[nextKey] +
											'"><i class="' + urgent + ' icon del p-2" id="'+nextKey+'"></i>' + tasks.description[nextKey] + 
										'</li> ');
				chrome.storage.sync.set(tasks,null);
				$("#newTask").val("");
				$("#urgent").removeClass("urgent");
				
			});
		}
	};
	
	//////////////////////////////////////////////////////
	//Deleting a task
	//////////////////////////////////////////////////////
	$(document).on('click','.del',function(){
		var id = $(this).prop("id");
		
		$("li").remove("#"+id);
		chrome.storage.sync.get(function (tasks){
			tasks.description.splice(id,1);
			tasks.alarmTime.splice(id,1);
			tasks.alarmSet.splice(id,1);
			tasks.urgent.splice(id,1)
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
	
	//test
	//$(".fa-tasks").click(function(){
	//	render();
	//	
	//});
	
	//////////////////////////////////////////////////////
	//Clear list
	//////////////////////////////////////////////////////
	$(".clear").click(function(){
		$("li").remove();
		chrome.storage.sync.clear();
	});
	
	//////////////////////////////////////////////////////
	//Enter functionality
	//////////////////////////////////////////////////////
	$(document).keydown(function(e){
		if(event.which == 13)
			addTask();
		else if(event.which == 9)
			$("#urgent").click();
		$(this).focus();
	});

	//////////////////////////////////////////////////////
	//Alarm time assignation
	//////////////////////////////////////////////////////
	$(".badge").click(function(){
		$(".badge").removeClass("badge-light");
		$(".badge").addClass("badge-dark");
		
		$(this).removeClass("badge-dark");
		$(this).addClass("badge-light");
	});

	//urgent mark
	$("#urgent").click(function(){
		if($(this).hasClass("urgent"))
			$(this).removeClass("urgent");
		else
			$(this).addClass("urgent");
	});
	

});
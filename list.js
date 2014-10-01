List = {
	listInput : null,
	tasksContainer : null,

	construct : function(){
		var paContainer = $('#paContainer');
		var listContainer = $('<div>').attr({'id':'listContainer'});
		var that = this;

		var inputBox = $('<input>').attr({'class':'modules', 'id':'listContainer'}).click(function(event){
			that.createNewTask();
		});
		var calendar = null;		//get calendar here

		this.listInput = $('<div>').attr({'id':'listInput'}).append(inputBox).append(calendar);
		this.tasksContainer = $('<div>').attr({'id':'tasksContainer'});
		paContainer.append(listContainer.append(this.listInput).append(this.tasksContainer));
	},

	createNewTask : function(){
		var parsedTask = parseTask(this.listInput.inputBox.html());

		var newTask = Object(Task);
		newTask.init({
			task : parsedTask.task,
			tags : parsedTask.tags,
			time : new time().now(),		//to-do: check this, this may break
		});

		if(this.listInput.calendar !== null){
			newTask.dueDate = this.listInput.calendar;
		}
		//check for reminder condition
		//if reminder to be set 
		//	set reminder
		
		return newTask;
	},

	renderTask : function(data){
		var task = $('<span>').attr('class','task').html(data.task);
		var tagsContainer = $('<span>').attr('class','tagsContainer');
		for(var i = 0; i < data.tags.length; i++){
			tagsConainer.append($('<span>').attr('class','tag').html(data.tags[i]));
		}
		
		return $('<div').attr({'class':'taskItem'}).append(task).append(tagsContainer);
	},

	parseTask : function(task){
		var tags = task.match(/#[\w\d]+/g);
		var sanitizedTask = task.replace(/#[\w\d]+/g, '');
		return {
			'tags': tags,
			'task': sanitizedTask
		}
	}

}

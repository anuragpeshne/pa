$(document).ready(function(){
	timerDisplay = {'container':'#pomodoroTimer','minutes' :'#pomodoroTimer span#minutes', 'seconds' :'#pomodoroTimer span#seconds'};
	timerButtons = {'startButt':'#pomodoroContainer #startButt', 'pauseButt':'#pomodoroContainer #pauseButt', 'resetButt':'#pomodoroContainer #resetButt'};
	PomodoroTimer.initialize(timerButtons, timerDisplay);

	List.construct();
});


if( typeof Object.beget !== 'function' ){
	Object.beget = function(o){
		var F = function(){}; 
		F.prototype = o;
		return new F();
	}
}

chrome.notifications.onClicked.addListener(function(notificationId){
	if(PomodoroTimer.notificationLog.indexOf(notificationId) >= 0){
		chrome.notifications.clear(notificationId, function(wasCleared){ 
			if(!wasCleared) 
				console.log(notificationId+"not cleared. No idea why.")
			});
	}
})

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
	if(PomodoroTimer.notificationLog.indexOf(notificationId) >= 0){
		if(buttonIndex == 0){
			$(PomodoroTimer.timerButtons.startButt).trigger('click');
		}
		else {
			console.log("timer cancelled");
		}
	}
});

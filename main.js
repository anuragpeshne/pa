$(document).ready(function(){
	timerDisplay = {'container':'#pomodoroTimer','minutes' :'#pomodoroTimer span#minutes', 'seconds' :'#pomodoroTimer span#seconds'};
	timerButtons = {'startButt':'#pomodoroContainer #startButt', 'pauseButt':'#pomodoroContainer #pauseButt', 'resetButt':'#pomodoroContainer #resetButt'};
	PomodoroTimer.initialize(timerButtons, timerDisplay);
});


if( typeof Object.beget !== 'function' ){
	Object.beget = function(o){
		var F = function(){}; 
		F.prototype = o;
		return new F();
	}
}

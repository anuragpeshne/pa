$(document).ready(function(){
	timerDisplay = {'minutes' :'#pomodoroTimer span#minutes', 'seconds' :'#pomodoroTimer span#seconds'};
	timerButtons = {'startButt':'#pomodoroContainer #startButt', 'pauseButt':'#pomodoroContainer #pauseButt', 'resetButt':'#pomodoroContainer #resetButt'};
	pomodoroTimer.initialize(timerButtons, timerDisplay);
});

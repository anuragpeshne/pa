PomodoroTimer = {

	initialize:function(timerButtons, timerDisplay){
		this.timerButtons = timerButtons;
		this.timerDisplay = timerDisplay;
		
		this.initTimers();
		
		var that = this;
		$(timerButtons.startButt).click(function(){
			that.workTimer.start();
			$(timerButtons.startButt).hide();
			$(timerButtons.pauseButt).show();
		});
		
		$(timerButtons.pauseButt).click(function(){
			that.workTimer.pause();
			$(timerButtons.startButt).show();
			$(timerButtons.pauseButt).hide();
		});
		$(timerButtons.resetButt).click(function(){that.workTimer.reset()});

		this.reset();
	},

	reset:function(){
		this.workTimer.reset();
		$(this.timerButtons.pauseButt).hide();
		$(this.timerButtons.startButt).show();
	},

	initTimers:function(){
		var that = this;
		this.pomodoroNotifier = Object.beget(Notifier);
		this.pomodoroNotifier.NotificationType = 'basic';
		this.pomodoroNotifier.iconUrl = 'pomodoroIcon.png';

		this.workTimer = Object.beget(Timer);
		this.workTimer.init({
			totalTime: 25,
			callBackTrigger : function(){
				that.pomodoroNotifier.notify({'title':'Pomodoro Done', 'message':'Time for a break'});
				that.reset();
			},
			update:function(){
				console.log(this);
				$(PomodoroTimer.timerDisplay.minutes).html(("0"+PomodoroTimer.workTimer.timeLeft['minutes']).slice(-2));
				$(PomodoroTimer.timerDisplay.seconds).html(("0"+PomodoroTimer.workTimer.timeLeft['seconds']).slice(-2));
			},
		});
	}
}

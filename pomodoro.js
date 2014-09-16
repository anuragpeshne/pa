PomodoroTimer = {

	initialize:function(timerButtons, timerDisplay){
		this.timerButtons = timerButtons;
		this.timerDisplay = timerDisplay;
		
		this.initTimers();
		
		var that = this;
		$(timerButtons.startButt).click(function(){
			that.currentTimer.start();
			$(timerButtons.startButt).hide();
			$(timerButtons.pauseButt).show();
		});
		
		$(timerButtons.pauseButt).click(function(){
			that.currentTimer.pause();
			$(timerButtons.startButt).show();
			$(timerButtons.pauseButt).hide();
		});
		$(timerButtons.resetButt).click(function(){that.currentTimer.reset()});

		this.reset();
	},

	reset:function(){
		this.workTimer.reset();
		this.playTimer.reset();
		$(this.timerButtons.pauseButt).hide();
		$(this.timerButtons.startButt).show();
		$(this.timerDisplay.container).css({'color':this.currentTimer.displayColor});
	},

	initTimers:function(){
		var that = this;
		this.pomodoroNotifier = Object.beget(Notifier);
		this.pomodoroNotifier.NotificationType = 'basic';
		this.pomodoroNotifier.iconUrl = 'pomodoroIcon.png';
		this.pomodoroNotifier.setAlertSound('alert.mp3'); 			//this automatically picks up from resources folder
		
		this.workTimer = Object.beget(Timer);
		this.workTimer.displayColor = 'red';
		this.currentTimer = this.workTimer;
		this.workTimer.init({
			totalTime: 25,
			callBackTrigger : function(){
				that.pomodoroNotifier.notify({'title':'Pomodoro Done', 'message':'Time for a break'});
				that.currentTimer = that.playTimer;
				that.reset();
				$(that.timerButtons.startButt).trigger('click');
			},
			update:function(){
				$(PomodoroTimer.timerDisplay.minutes).html(("0"+PomodoroTimer.currentTimer.timeLeft['minutes']).slice(-2));
				$(PomodoroTimer.timerDisplay.seconds).html(("0"+PomodoroTimer.currentTimer.timeLeft['seconds']).slice(-2));
			},
		});
		this.playTimer = Object.beget(this.workTimer);
		this.playTimer.init({
			totalTime : 5,
			callBackTrigger : function(){
				that.pomodoroNotifier.notify({'title':'Time\'s Up!','message':'Let\'s get back to work'});
				that.currentTimer = that.workTimer;
				that.reset();
			}
		});
		this.playTimer.displayColor = 'green';
	},
	pomodoroFlow:function(){
		this.workTimer.reset();

	}
}

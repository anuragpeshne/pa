PomodoroTimer = {
	notificationLog: [],					//this keeps record of all the notifications sent. This will help and tracking during notification event callbacks
	sessionId : 0,

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
		this.sessionId++;
	},

	initTimers:function(){
		var that = this;
		this.pomodoroNotifier = Object.beget(Notifier);
		this.pomodoroNotifier.NotificationType = 'basic';
		this.pomodoroNotifier.iconUrl = 'pomodoroIcon.png';
		this.pomodoroNotifier.setAlertSound('alert.mp3'); 			//this automatically picks up from resources folder
		this.pomodoroNotifier.buttons = [{'title':'Yes'},{'title':'No'}];
		this.pomodoroNotifier.notificationLog = this.notificationLog;
		
		this.workTimer = Object.beget(Timer);
		this.workTimer.displayColor = 'red';
		this.currentTimer = this.workTimer;
		this.workTimer.init({
			totalTime:1,// 25,
			callBackTrigger : function(){
				that.pomodoroNotifier.notify({'title':'Pomodoro Done', 'message':'Would you like to take a break now?','enableButtons':true});
				that.currentTimer = that.playTimer;
				that.reset();
			},
			update:function(){
				$(PomodoroTimer.timerDisplay.minutes).html(("0"+PomodoroTimer.currentTimer.timeLeft['minutes']).slice(-2));
				$(PomodoroTimer.timerDisplay.seconds).html(("0"+PomodoroTimer.currentTimer.timeLeft['seconds']).slice(-2));
			},
			
			windupCallBack: function() {
				console.log("windup");
				that.pomodoroNotifier.update('progress-note-'+that.sessionId, {'type':'progress','title':'Revise/Speed Up/Wind up!','message':'Less Than a Minute Left'}, that.workTimer.progress); 
			},
		});
		this.playTimer = Object.beget(this.workTimer);
		this.playTimer.init({
			totalTime : 5,
			callBackTrigger : function(){
				that.pomodoroNotifier.notify({'title':'Play Time\'s Up!','message':'Would you to have another Pomodoro Session?','enableButtons':true});
				that.currentTimer = that.workTimer;
				that.reset();
			}
		});
		this.playTimer.displayColor = 'green';
	},
}

pomodoroTimer = {
   	totalTime : 25,
	notifier : notifier,


	tick:function(){
		if(this.timeLeft['seconds'] === 0){ 				//if seconds are 00
			if(this.timeLeft['minutes'] === 0){
				clearInterval(this.clock);
				this.notifier.notify({'title':'Pomodoro Done', 'message':'Pomodoro Session complete. Time for a break'});
			}
			else{
				this.timeLeft['minutes'] -= 1;
				this.timeLeft['seconds'] += 60; 			//add 60 seconds
			}
		}
		this.timeLeft['seconds']--; 						//not sure if doing this after 00:00 is ok
	},

	updateTimer:function(){
		$(this.timerDisplay.minutes).html(("0"+this.timeLeft['minutes']).slice(-2));
		$(this.timerDisplay.seconds).html(("0"+this.timeLeft['seconds']).slice(-2));
	},

	start:function(){
		var that = this;
		(function startTimer(){
			that.updateTimer();
			that.tick();
			that.clock = setTimeout(function(){startTimer()}, 1000);
		})();
	},
	pause:function(){
		if(this.clock)
			clearInterval(this.clock);
	},
	reset:function(){
		this.timeLeft = {'minutes':this.totalTime,'seconds':00};
		this.updateTimer();
	},

	initialize:function(timerButtons, timerDisplay){
		this.timeLeft = {'minutes':this.totalTime,'seconds':00};
		this.timerDisplay = timerDisplay;
		this.updateTimer();
		$(timerButtons.startButt).click(function(){
			pomodoroTimer.start();
			$(timerButtons.startButt).hide();
			$(timerButtons.pauseButt).show();
		});
		$(timerButtons.pauseButt).click(function(){
			pomodoroTimer.pause();
			$(timerButtons.startButt).show();
			$(timerButtons.pauseButt).hide();
		});
		$(timerButtons.resetButt).click(function(){pomodoroTimer.reset()});
	}
}

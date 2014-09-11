pomodoroTimer = {
   	totalTime : 25,
	timerDisplay: {'minutes' :'#pomodoroTimer span#minutes', 'seconds' :'#pomodoroTimer span#seconds'},
	notifier : null,


	test:function(){console.log(this);},
	tick:function(){
		if(this.timeLeft['seconds'] === 0){ 				//if seconds are 00
			if(this.timeLeft['minutes'] === 0)
				this.notifier.notifyTimeUp();
			else{
				this.timeLeft['minutes'] -= 1;
				this.timeLeft['seconds'] += 60; 			//add 60 seconds
			}
		}
		this.timeLeft['seconds']--; 						//not sure if doing this after 00:00 is ok
	},

	updateTimer:function(){
		$(this.timerDisplay.minutes).html(this.timeLeft['minutes']);
		$(this.timerDisplay.seconds).html(this.timeLeft['seconds']);
	},

	start:function(){
		this.timeLeft = {'minutes':this.totalTime,'seconds':00};
		var that = this;
		setInterval(function(){that.tick(); that.updateTimer()}, 1000);
	},
}

$(document).ready(function(){
	$('#startButt').click(function(){
	//	pomodoroTimer.timerDisplay.minutes.html("sd");
		pomodoroTimer.start();
	})
});

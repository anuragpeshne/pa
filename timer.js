Timer = {
	
	tick:function(){
		if(this.timeLeft['seconds'] === 0){ 				//if seconds are 00
			if(this.timeLeft['minutes'] === 0){
				this.callBackTrigger();
				return false;
			}
			else{
				this.timeLeft['minutes'] -= 1;
				this.timeLeft['seconds'] += 60; 			//add 60 seconds
			}
		}
		this.timeLeft['seconds']--; 						//not sure if doing this after 00:00 is ok
		return true;
	},

	start:function(){
		var that = this;
		(function startTimer(){
			that.update();
			if(that.tick())
				that.clock = setTimeout(function(){startTimer()}, 1000);
			else
				that.clock = 0;
		})();
	},

	pause:function(){
		if(this.clock){
			clearInterval(this.clock);
			this.clock = 0;
		}
	},

	reset:function(){
		this.timeLeft = {'minutes':this.totalTime,'seconds':00};
		this.update();
	},

	init:function(timerConfig){
		this.totalTime = timerConfig.totalTime || 25;
		this.update = timerConfig.update; 						//what to update on each tick
		this.callBackTrigger = timerConfig.callBackTrigger; 	
		this.reset();
	},
}

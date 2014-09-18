Notifier = {
	notificationID : '', 				//leave blank for auto generation
	NotificationType : 'basic',
	iconUrl : 'icon.png',
	title : 'PA',
	message: '',
	//notificationLog will be setup by those objects who need to handle notification action callbacks
	//similarly button object for setting new timer or action

	setAlertSound:function(clip){
		this.sound = new Audio('resources/'+clip);
	},

	notify:function(notification){
		var NotificationType = notification.NotificationType || this.NotificationType;
		var iconUrl = notification.iconUrl || this.iconUrl;
		var title = notification.title || this.title;
		var message = notification.message || this.message;
		var that = this;
		
		chrome.notifications.create('',
			{'type':NotificationType,'iconUrl':iconUrl,'title':title, 'message':message, 'buttons':that.buttons, 'isClickable':true,'contextMessage':'this is testing'},
			function(notificationID){
				console.log('Notified:'+notificationID)
				if(that.notificationLog)
					that.notificationLog.push(notificationID);
			});

		if(typeof(this.sound) !== 'undefined' ){
			this.sound.play();
			console.log("alert sound played");
		}
	}
}

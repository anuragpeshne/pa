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
		notificationOptions = {
			'type' : notification.NotificationType || this.NotificationType,
			'iconUrl' : notification.iconUrl || this.iconUrl,
			'title' : notification.title || this.title,
			'message' : notification.message || this.message,
			'isClickable' : true,
			'contextMessage':'this is this'
		}
		if(typeof(notification.enableButtons) !== 'undefined' && notification.enableButtons)
			notificationOptions.buttons = this.buttons;
		if(typeof(notification.progress) !== 'undefined')
			notificationOptions.progress = notification.progress;
		var that = this;
		
		chrome.notifications.create('',
			notificationOptions,
			function(notificationID){
				console.log('Notified:'+notificationID)
				if(that.notificationLog)
					that.notificationLog.push(notificationID);
			});

		if(typeof(this.sound) !== 'undefined' ){
			this.sound.play();
			console.log("alert sound played");
		}
	},

	update:function(notificationId, notification,progress){
		notificationOptions = {
			'type' : notification.NotificationType || this.NotificationType,
			'iconUrl' : notification.iconUrl || this.iconUrl,
			'title' : notification.title || this.title,
			'message' : notification.message || this.message,
			'isClickable' : true,
			'contextMessage':'this is this'
		}
		notificationOptions.progress = progress;
		chrome.notifications.update(notificationId, notificationOptions, function(wasDone){
			if(wasDone)
				console.log("updated");
			else{
				chrome.notifications.create(notificationId,notificationOptions,function(notId){
					console.log("created progress notif"+notId);
				});
			}
		});	
	}
}

Notifier = {
	notificationID : '', 				//leave blank for auto generation
	NotificationType : 'basic',
	iconUrl : 'icon.png',
	title : 'PA',
	message: '',

	setAlertSound:function(clip){
		this.sound = new Audio('resources/'+clip);
	},

	notify:function(notification){
		var NotificationType = notification.NotificationType || this.NotificationType;
		var iconUrl = notification.iconUrl || this.iconUrl;
		var title = notification.title || this.title;
		var message = notification.message || this.message;
		chrome.notifications.create('', {'type':NotificationType,'iconUrl':iconUrl,'title':title, 'message':message}, function(notificationID){console.log('Notified:'+notificationID)});

		if(typeof(this.sound) !== 'undefined' ){
			this.sound.play();
			console.log("alert sound played");
		}
	}
}

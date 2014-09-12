notifier = {
	notificationID : '', 				//leave blank for auto generation
	NotificationType : 'basic',
	iconUrl : 'icon.png',
	title : 'PA',
	message: '',

	notify:function(notification){
		var NotificationType = notification.NotificationType || this.NotificationType;
		var iconUrl = notification.iconUrl || this.iconUrl;
		var title = notification.title || this.title;
		var message = notification.message || this.message;
		chrome.notifications.create('', {'type':NotificationType,'iconUrl':iconUrl,'title':title, 'message':message}, function(notificationID){console.log('Notified:'+notificationID)});
	}
}

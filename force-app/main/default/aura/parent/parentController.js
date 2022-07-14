({
	handleComponentEvent : function(component, event, helper) {
		var nmessage = event.getParam("newmessage");

        component.set('v.parentmessage',nmessage);

	}
})
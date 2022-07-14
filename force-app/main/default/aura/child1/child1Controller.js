({
	handleClick : function(component, event, helper) {
        var cmpEvent = component.getEvent("cmpEvent");
         cmpEvent.setParams({
            "newmessage" : "A component event fired me. " +
            "It all happened so fast. Now, I'm here!" });
        
        cmpEvent.fire();
	}
})
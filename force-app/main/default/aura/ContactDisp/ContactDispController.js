({
	handleClick : function(component, event, helper) {
		var cmpEvent = component.getEvent("cmpEvent");
        cmpEvent.setParams({
            "contactId" : component.get("v.contactId")
        });
        cmpEvent.fire();
       
	}
})
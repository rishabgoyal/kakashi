({
	openPopUp : function(component, event, helper) {
		var Modal=component.find("modal");
        Modal.openModal();
	},
    handleResponse: function(component, event, helper) {
        console.log('Event fired')
        var response = event.getParam("response");
        var identifier = event.getParam("identifierId");
        console.log(response)
        if(identifier=="fromApp"){
        component.set("v.response",response)
        }

    }
})
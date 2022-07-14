({
	handleClick : function(component, event, helper) {
		var datecomp=component.find("mycomp");
        datecomp.validateDate();
	}
})
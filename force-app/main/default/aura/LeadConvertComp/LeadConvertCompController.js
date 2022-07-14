({
	doInit : function(component, event, helper) {
       
        var action = component.get("c.getDuplicateContactList");
      action.setParams({ LeadId : '00Q6F00001R86uwUAB'/* component.get("v.recordId") */});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.duplicateContactList",response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        $A.enqueueAction(action);
	},
    toggleForms : function(component, event, helper) {
		component.set("v.CreateNewContact",!component.get("v.CreateNewContact"));
	},
    handleContactSelected: function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
        $A.get("e.force:closeQuickAction").fire();
    }
})
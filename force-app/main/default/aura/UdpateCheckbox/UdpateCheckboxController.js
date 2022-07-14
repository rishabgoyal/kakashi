({
	doInit : function(component, event, helper) {
	    var action = component.get("c.updatecheck");
        action.setParams({ recid : component.get("v.recordId") });

        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               $A.get("e.force:closeQuickAction").fire();
                    $A.get("e.force:refreshView").fire();

            }
            else if (state === "INCOMPLETE") {
                $A.get("e.force:closeQuickAction").fire();
                // do something
            }
            else if (state === "ERROR") {
                $A.get("e.force:closeQuickAction").fire();
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
	}
})
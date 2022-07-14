({
	   doInit : function(component, event, helper) {
         var action = component.get("c.getAccounts");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
              
              component.set("v.UserId",response.getReturnValue()) ; 
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
    logout : function(component, event, helper) {
        window.location.replace("https://kakashilightningzone-developer-edition.ap4.force.com/OMS/secur/logout.jsp");
    }
})
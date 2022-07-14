({
    doInit: function(component, event, helper) {
       
    },
	handleClick : function(component, event, helper) {
		
        component.set("v.buttonLabel",'Button Label Changed');
        
        var action = component.get("c.FirstMethod");
        action.setParams({ nm : 'GenePoint' });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log( response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
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
        
        var action2 = component.get("c.FirstMethod2");
      /* action2.setParams({ nm2 : component.get("v.buttonLabel2") }); */
        action2.setParams({ nm2 : 'Edge Communications' });
       
        action2.setCallback(this, function(response2) {
            var state = response2.getState();
            if (state === "SUCCESS") {
             console.log( response2.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response2.getError();
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
        
        
        $A.enqueueAction(action2);
	}
    
    
    
    
    
    
    
    
})
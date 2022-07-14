({
	apexCall : function(component, methodName,paramStringifed) {
        console.log(methodName);
        console.log(paramStringifed);
        
        var action = component.get(methodName);
        action.setParams({ p :  paramStringifed});
        
        action.setCallback(this, function(response) {
           
            var state = response.getState();
            if (state === "SUCCESS") {
                 
                var returnvalue = response.getReturnValue();
               console.log(returnvalue)
            }
            else if (state === "INCOMPLETE") {
                // do something
                return 'INCOMPLETE';
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
                    return 'ERROR';
                }
        });
        
        $A.enqueueAction(action);
        
        
	}
})
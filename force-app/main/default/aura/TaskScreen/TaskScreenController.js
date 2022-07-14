({
    doInit : function(component, event, helper) {
        console.log('I am loading');
        var action = component.get("c.getTasks");//creating instance of method call
        action.setCallback(this, function(response) //defining method call
                           {
                               var state = response.getState();
                               if (state === "SUCCESS") {
                                   //	console.log(response.getReturnValue());
                                   component.set("v.allTasks",response.getReturnValue());//fetching return value and setting it a attribute
                                   //alert("From server: " + response.getReturnValue());
                                   console.log(component.get("v.allTasks"));
                                   component.set("v.showMyComponent",true);//sets our main portion visible
                                   
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
        $A.enqueueAction(action);//calling method
        
        
        
    }
})
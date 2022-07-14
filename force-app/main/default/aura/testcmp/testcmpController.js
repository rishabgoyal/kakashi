({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAccount");
        
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var returnvalue = response.getReturnValue();
                console.log(returnvalue)
                component.set("v.AccountList",returnvalue);
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
    },
    
    getInput : function(component, event, helper) {
        
        
        var rec  = event.getSource().get("v.value");
        var recchecked  = event.getSource().get("v.checked");
        var selectedreclist = component.get("v.selectedrec");
       
        if(recchecked)
        {
            selectedreclist.push(rec);
        }
        else{
            for(var i=0;i<selectedreclist.length;i++)
            {
                if(selectedreclist[i].id==rec.id)
                {
                    break;
                }
            }
            selectedreclist = selectedreclist.splice(i,1);
        }
        
       
        component.set("v.selectedrec",selectedreclist);
        
    },
    submitrec : function(component, event, helper) {
        
        console.log(component.get("v.selectedrec"));
        
    },
    getInput2 : function(component, event, helper) 
    {
        var recchecked  = event.getSource().get("v.checked");
        var accList = component.get("v.AccountList");
        
        if(recchecked)
        {
            component.set("v.selectedrec",accList);    
            var listcomp = component.find("selectCheckBox");
            for(var i=0;i<listcomp.length;i++)
            {
				listcomp[i].set("v.checked",true);
            }
        }else
        {
            component.set("v.selectedrec",null);    
            var listcomp = component.find("selectCheckBox");
            for(var i=0;i<listcomp.length;i++)
            {
				listcomp[i].set("v.checked",false);
            }
        }
        
        
    }
})
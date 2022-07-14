({
    handleLikeButtonClick : function (component) {
        component.set('v.liked', !component.get('v.liked'));
        component.set('v.disliked', !component.get('v.liked'));
        component.set("v.sobjDetail.Response__c",'Like');
        
    },
    handledislikeButtonClick: function (component) {
        component.set('v.disliked', !component.get('v.disliked'));
        component.set('v.liked', !component.get('v.disliked'));
        component.set("v.sobjDetail.Response__c",'Dislike');
    },
    handleSubmit: function (component) {
        var result= component.get("v.sobjDetail")
        
        if(!result.Picklist_1__c||result.Picklist_1__c=='--- None ---'||
           !result.Picklist_2__c||result.Picklist_2__c=='--- None ---'||
           !result.Picklist_3__c||result.Picklist_3__c=='--- None ---'||
           !result.Response__c || !result.Comment__c)
        {

        	alert('Please enter all values to proceed');
        }
        else{
            var action = component.get("c.insertFbRecord");
            action.setParams({ 
                fb : component.get("v.sobjDetail") 
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set('v.recordSumbitted',true);
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
        }
        console.log(result);
    }
});
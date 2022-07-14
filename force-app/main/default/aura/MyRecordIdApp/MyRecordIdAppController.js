({
    doInit : function(component, event, helper) {
        console.log(component.get("v.recordId"))
        var createAcountContactEvent = $A.get("e.force:createRecord");
        createAcountContactEvent.setParams({
            "entityApiName": "Contact",
            "defaultFieldValues": {
               
                'AccountId' : '0016F00002SPY9WQAX'
            }
        });
        createAcountContactEvent.fire();
    }
})
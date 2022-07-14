({
    doInit : function(component, event, helper) {
        var action = component.get("c.getOppRecs");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.OppList",response.getReturnValue());	
            }
            else if (state === "INCOMPLETE") {
            }
        });
        $A.enqueueAction(action);
    },
    selectedCheckbox : function(component, event, helper) {
        var source = event.getSource();
        var item = source.get("v.value");
        var checked=source.get("v.checked");
        var selectedOppRecordList = component.get("v.selectedOppRecords");
        console.log(item.Name);
        console.log(checked);
                
        if(checked == true){
            selectedOppRecordList.push(item);
        }
        else{
            for(var i=0; i<selectedOppRecordList.length;i++){
                if(item.Id == selectedOppRecordList[i].Id){
                   selectedOppRecordList.splice(i,1);
                    break;
                }
            }
        }
        component.set("v.selectedOppRecords",selectedOppRecordList);
    },
    handleShowTableClick : function(component, event, helper) {
        
        component.set("v.showTable",!component.get("v.showTable"));
        
        
    }
})
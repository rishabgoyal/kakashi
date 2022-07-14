({
	init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Id', fieldName: 'Id', type: 'text' , editable: true},
            {label: 'Last Name', fieldName: 'LastName', type: 'text' ,editable: true},
            {label: 'First Name', fieldName: 'LastName', type: 'text' ,editable: true},
           // {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' ,editable: true},
            // {label: 'Description', fieldName: 'Description', type: 'text' ,editable: true},
            //{label: 'Number Of Employees', fieldName: 'NumberOfEmployees', type: 'number' ,editable: true},
            //{label: 'Industry', fieldName: 'Industry', type: 'text' ,editable: true},
            //{label: 'Rating', fieldName: 'Rating', type: 'text' ,editable: true},
            {label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable: true }, 
            {label: 'Fax', fieldName: 'Fax', type: 'phone' ,editable: true } ,
            {label: 'Phone', fieldName: 'Master_Picklist__c', type: 'picklist' ,editable: true }, 
            {label: 'Fax', fieldName: 'Sub_Picklist__c', type: 'picklist' ,editable: true } ,
            {label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone' ,editable: true } 
          
        ]);
        helper.fetchData(cmp,event, helper);
    },
    handleSaveEdition: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        console.log(draftValues);
        var action = cmp.get("c.updateAccount");
        action.setParams({"conList" : draftValues});
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);
        
    },
})
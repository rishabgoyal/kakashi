({
    closeModal:function(component,event,helper){    
        var whichOne = event.getSource().getLocalId();
        console.log(whichOne);
        if(whichOne=='No')
        {
            component.set("v.response", false);
            
            var appEvent = $A.get("e.c:ModalResponse");
            appEvent.setParams({
                response : false,
              identifierId: component.get("v.identifierId")});
            appEvent.fire();
        }
        else{
            component.set("v.response",true);
            
            var appEvent = $A.get("e.c:ModalResponse");
            appEvent.setParams({
                response : true,
                identifierId: component.get("v.identifierId")	});
            appEvent.fire();
        }
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openmodal:function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    }
})
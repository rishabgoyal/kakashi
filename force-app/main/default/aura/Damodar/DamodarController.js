({
	handleClick : function(component, event, helper) {
        var cmpTarget = component.find('highs');
        $A.util.addClass(cmpTarget, 'addColor');
	}
})
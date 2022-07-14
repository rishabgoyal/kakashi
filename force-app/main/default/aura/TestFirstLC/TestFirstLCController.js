({
	handleClick : function(component, event, helper) {
		
        alert('Hello I am in Handle Click');
        
        component.set("v.SurName","Goyal");
        
        component.set("v.IsButtonClicked",true);
	}
})
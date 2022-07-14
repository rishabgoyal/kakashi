({
	changeName : function(component, event, helper) {
	
        
        var myName = component.get("v.MyAtt");
  			alert('This button Works, My name is '+myName);  
        myName="Saurabh";
        component.set("v.MyAtt",myName);
        
        
      
	}
})
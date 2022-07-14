({
	afterRender  : function(component, event, helper) {
        var compName= component.get("v.compName");
        if(compName!='')
        {
            $A.createComponent(
                compName,{},
                function(newcomponent){
                    if (component.isValid()) {
                        var body = component.get("v.body");
                        console.log(newcomponent);
                        body.push(newcomponent);
                        component.set("v.body", body);             
                    }
                }            
            );
        }
    }
})
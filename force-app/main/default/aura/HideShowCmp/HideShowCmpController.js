({
    handleClick : function(component, event, helper) {
        console.log('hi');
        var hideTextVar = component.get("v.hideText");
        console.log('hi1'+hideTextVar);
        if(hideTextVar == "Hi"){
            console.log('hi2'+hideTextVar);
            component.set("v.hideText","Hi This is Diksha");
        }
        else if(hideTextVar == "Its LNU"){
            component.set("v.hideText","Its LNU");
        }
            else{
           console.log('rgf');
        }
    }
})
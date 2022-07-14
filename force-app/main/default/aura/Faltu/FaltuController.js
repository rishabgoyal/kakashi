({
    init : function(component, event, helper) {
        
var params = {};
    var search = location.search.substring(1);

    if (search) {
      params = JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
    }

        var inputVariables = [
            { name : "Id", type : "String", value:params.Id }]; 
        
        
        
        var flow = component.find("flowData");
        
        // In that component, start your flow. Reference the flow's Unique Name.
        flow.startFlow("asd",inputVariables);
        // component.set("v.showFlow",true);
    }
})
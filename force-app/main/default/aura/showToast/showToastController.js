({
    invoke : function(component, event, helper) {

        var type = component.get("v.type").toLowerCase(); 
        var title = component.get("v.title");
        var message = component.get("v.message");
        var duration = component.get("v.duration")+"000"; 
        var mode = component.get("v.mode").toLowerCase(); 
        var key = component.get("v.key").toLowerCase();   

        var isURL = message.toLowerCase().includes('{url}');  

        if(!isURL){
            helper.showToast(type, title, message, duration, mode, key);
        }

        if(isURL){
          var messageUrl = message.replace('{url}', '{1}');
          var urlLink = component.get("v.urlLink")
          var urlLabel = component.get("v.urlLabel");
          //Add 'http://' to the URL if it is not already included
          if(urlLink.toLowerCase().indexOf('http') == -1){
              urlLink = 'http://' + urlLink;  
          }
          helper.showToastUrl(type, title, messageUrl, urlLink, urlLabel, duration, mode, key);
        }
        
    }
})
public class GetListViewRecord {
    
    public static List<Contact> getFilteredContacts(String filterId){
        HttpRequest req = new HttpRequest();
        String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
        String endPoinURL = baseUrl+'/services/data/v32.0/sobjects/Contact/listviews/'+filterId+'/describe';
        req.setEndpoint(endPoinURL);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        Http http = new Http();
        HTTPResponse response = http.send(req);
        System.debug(response.getBody());
        Map<String, Object> tokenResponse = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        String query = (String) tokenResponse.get('query');
        List<Contact> ContactList = new List<Contact>();
        for(Contact accountObj : database.query(query)){
            ContactList.add(accountObj);
        }
        return ContactList;
    }
    
    
     public static List<Lead> getFilteredLeads(String filterId){
        HttpRequest req = new HttpRequest();
        String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
        String endPoinURL = baseUrl+'/services/data/v32.0/sobjects/Lead/listviews/'+filterId+'/describe';
        req.setEndpoint(endPoinURL);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        Http http = new Http();
        HTTPResponse response = http.send(req);
              System.debug(response.getBody());
         Map<String, Object> tokenResponse = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        String query = (String) tokenResponse.get('query');
        List<Lead> LeadList = new List<Lead>();
        for(Lead accountObj : database.query(query)){
            LeadList.add(accountObj);
        }
        return LeadList;
    }
}
@RestResource(urlMapping='/LeadandContactService')
global with sharing class LeadandContactAPIService {
    
    @HttpGet
    global static String getLeadandContact() 
    {
        
        RestRequest request = RestContext.request;
        
        String reqBody = request.requestBody.toString();
        
        if(String.isBlank(reqBody))
        {
            ResponseWrap rw = new ResponseWrap();
            rw.Status ='400';
            rw.ErrorMessage = 'Bad Request Please send body'; 
            
           
            return JSON.serialize(rw).replaceAll('\\"','"') ;
        }
        
        else{
            String body = reqBody;
            System.debug(reqBody);
            List<Lead> leadList = [Select id  from Lead where Email = :reqBody limit 1]; // or AuthUUId =:reqBody
            List<Contact> contactList = [Select id,AccountId from Contact where Email = :reqBody limit 1]; // or AuthUUId =:reqBody
            LeadContact leadContact = new LeadContact();
            if(leadList.size()>0)
            {
                leadContact.lead = leadList[0];
            }
            if(contactList.size()>0)
            {
                leadContact.contact = contactList[0];
            }
            ResponseWrap rw = new ResponseWrap();
            rw.Status ='200'; 
            rw.leadContact =leadContact;
            return JSON.serialize(rw).replaceAll('\\"','"');
        }
    }
    
    public class ResponseWrap
    {
        
        public string Status;
        public LeadContact leadContact;
        public string ErrorMessage;
        public string SuccessMessage;
        public string AdditionalInfo;        
    }
    
    public class LeadContact{
        public Lead lead;
        public Contact contact;
    }
}
public class TestNestleController {
    
    @AuraEnabled
    public static wrapp FirstMethods(String accountId)
    {
        Account acc = [Select id,Name from Account where id = :accountId];
        List<Contact> contactList = [Select id,name from Contact where AccountId = : accountId];
        wrapp wrp = new wrapp();
        wrp.acnt = acc;
        wrp.cList = contactList;
        return wrp;
        
    }
    
   @AuraEnabled
    public static void  secondmethod(String jsonforwrap)
    {
        wrapp n = (wrapp)JSON.deserialize(jsonforwrap, wrapp.class);
      
    }
    
    public class wrapp{
        
        @AuraEnabled Account acnt{get;set;}
        @AuraEnabled List<Contact> cList{get;set;}
        @AuraEnabled Opportunity  oppor{get;set;}
        
    }
    
      
   
    
}
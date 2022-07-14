global class IdentifyDuplicates implements Database.Batchable<sObject>,Database.Stateful{
    
    Map<String,List<contact>> ContactMap = new Map<String,List<Contact>>();
    
    global IdentifyDuplicates(){
        
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        String Empty='';
        String query = 'Select id,ECW_Account_Number__c from Contact where RecordType.Id = \'0124T000000Pab8QAC\'';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC, List<Contact> scope){
        for(Contact c: scope)
        {
           
        }
    }
    
    global void finish(Database.BatchableContext BC){
        list<Contact> toUpdateContactDuplicate = new List<Contact>();
        Set<Id> AlLContactSet = new Set<Id>();
        for(String key: ContactMap.keySet())
        {
            for(Contact c: contactMap.get(key))
                {
                    //c.Has_Duplicates__c=true;
                    //toUpdateContactDuplicate.add(c);
                    AlLContactSet.add(c.Id);
                }
            if(contactMap.get(key).size()>0)
            {
                for(Contact c: contactMap.get(key))
                {
                    c.Has_Duplicates__c=true;
                    toUpdateContactDuplicate.add(c);
                    AlLContactSet.add(c.Id);
                }
            }
        }
        
        List<Opportunity> oppList = [Select id, ContactId from Opportunity  where ContactId in :AlLContactSet];
     	List<Contact> contactList = [Select id, FirstName, LastName, Phone, Birthdate from Contact where Id in : AlLContactSet];
        Map<Id, String> contactMap2  = new Map<Id, String>();
        for(Contact con : contactList){
            	contactMap2.put(con.Id, con.FirstName+':'+con.Lastname+':'+con.Phone+':'+con.Birthdate);
        }
        for(Opportunity opp: oppList)
        {
			String Key   =contactMap2.get(opp.ContactId);
            Contact NewContact = new Contact();
            NewContact = contactMap.get(key)[0];
            opp.ContactId=NewContact.Id;
        }
//        update oppList;
  //  Database.update(toUpdateContactDuplicate,false);
        List<Contact> coList = new List<Contact>();
            
        for(Contact con: toUpdateContactDuplicate)
        {
            if(coList.size()<9000)
            {
                coList.add(con);
            }
            else{
                System.enqueueJob(new UpdateContact(coList));
                
                coList = new List<Contact>();
                coList.add(con);
            }
        }
        System.enqueueJob(new UpdateContact(coList));
                
        
    }
    
    
}
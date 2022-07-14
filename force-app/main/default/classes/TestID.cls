global class TestID implements Database.Batchable<sObject>,Database.Stateful{
   
    Map<String,List<contact>> ContactMap = new Map<String,List<Contact>>();
   
    global TestID(){
       
    }
   
    global Database.QueryLocator start(Database.BatchableContext BC){
        String Empty='';
        String query = 'Select id,Phone from Contact where RecordTypeId = \'0124T000000Pab8QAC\'';
        return Database.getQueryLocator(query);
    }
   
    global void execute(Database.BatchableContext BC, List<Contact> scope){
        for(Contact c: scope)
        {
            String key = c.Phone;
            if(ContactMap.containsKey(key))
            {
                List<Contact> conlist = ContactMap.get(key);  
                conlist.add(c);
                ContactMap.put(key,conlist);	
            }
            else{
                List<Contact> conlist =new List<Contact>();  
                conlist.add(c);
                ContactMap.put(key,conlist);
            }
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
            if(contactMap.get(key).size()>1)
            {
                for(Contact c: contactMap.get(key))
                {
//                    c.Has_Duplicate__c=true;
                    toUpdateContactDuplicate.add(c);
                   
                }
            }
        }
       
        update toUpdateContactDuplicate;
       
       
       
    }
   
   
}
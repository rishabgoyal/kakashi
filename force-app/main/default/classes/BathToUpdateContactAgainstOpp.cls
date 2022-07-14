global class BathToUpdateContactAgainstOpp implements Database.Batchable<sObject>,Database.Stateful{
    
    Map<String,Opportunity> ContactOppMap = new Map<String,Opportunity>();
    
    global BathToUpdateContactAgainstOpp(){
        
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        String Empty='';
        String query = 'Select id,ContactId from Opportunity where Contact.RecordType.Name = \'Patient\' order by CreatedDate';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC, List<Opportunity> scope){
        for(Opportunity opp: scope)
        {
            if(!ContactOppMap.containsKey(opp.ContactId))
            {
                ContactOppMap.put(opp.ContactId, Opp);
            }
        }
    }
    
    global void finish(Database.BatchableContext BC){
        List<contact> conList  = new List<Contact>();
        for(String conId: ContactOppMap.keySet())
        {
            Contact con = new Contact();
            con.Id = conId;
            Opportunity opp = ContactOppMap.get(conId);
            //con.FieldName = opp.FieldName;
            conList.add(con);
        }
        if(conList.size()>0)
        {
            //update conList;
            List<Contact> coList = new List<Contact>();
            
            for(Contact con: conList)
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
    
}
global class RemoveFlag implements Database.Batchable<sObject>,Database.Stateful{
   
    Map<String,List<contact>> ContactMap = new Map<String,List<Contact>>();
   List<Contact> conList = new List<contact>();
    global RemoveFlag(){
       
    }
   
    global Database.QueryLocator start(Database.BatchableContext BC){
        String Empty='';
        String query = 'Select id,Has_Duplicate__c from Contact where Has_Duplicate__c=true';
        return Database.getQueryLocator(query);
    }
   
    global void execute(Database.BatchableContext BC, List<Contact> scope){
        for(Contact c: scope)
        {
            c.Has_Duplicates__c=false;
            conList.add(c);
        }

    }
   
    global void finish(Database.BatchableContext BC){
        Database.update(conList, false);
       
       
    }
   
   
}
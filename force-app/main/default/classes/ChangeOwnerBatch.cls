global class ChangeOwnerBatch implements Database.Batchable<sObject>{

    global final Set<id> uIds;
    global final Set<id> aIds;
    
    global ChangeOwnerBatch(Set<id> userIds, Set<id> accounts){
        
        uIds = userIds;
        aIds = accounts;
        
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        String query  = 'Select id,OwnerId from Account where Id in :aIds';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC, List<Account> scope){
        Integer noOfUserIds = uIds.size();
        List<id> userIds = new List<Id>(uIds);
        Integer i = 0;
        for(Account s : scope){
            s.OwnerId=userIds[i];
            i=i+1;
            if(i>=noOfUserIds)
            {
                i=0;
            }
        }
        update scope;
    }

   global void finish(Database.BatchableContext BC){
   }
}
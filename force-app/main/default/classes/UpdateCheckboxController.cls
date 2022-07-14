public with sharing class UpdateCheckboxController {
    
    @AuraEnabled public static void updatecheck(String recid)
    {
        Test_2__c rec= [Select id,Boolean2__c from Test_2__c where id =:recid];
        
        System.debug(rec.Boolean2__c);
        if(rec.Boolean2__c==true)
            {
            rec.Boolean2__c=false;
             }
        else
        {
            rec.Boolean2__c=true;
        }
        update rec;
            
	}

}
trigger checkBillingAddress on Account (before update)
{
    if(trigger.isUpdate)
    {
        for(Account acc : trigger.new)
        {
            system.debug('Hello 2');
            system.debug(acc);
            Account accWithOldValues =trigger.oldMap.get(acc.Id);
            if(acc.BillingPostalCode != accWithOldValues.BillingPostalCode )
            {
                system.debug('Hello');
                List<Contact> conList = [select Id, AccountId from Contact where AccountId =: acc.Id and MailingPostalCode !=: acc.BillingPostalCode];
                if(!conList.isEmpty())
                {
                    acc.Out_of_Zip__c = true;
                    /*
                    for(Account ac: trigger.new)
                    {
                        ac.Out_of_Zip__c = true;
                        //update ac; 
                    }*/
                }
                else{
                    System.debug('Hello 3');
                      acc.Out_of_Zip__c = false;
                }
                
            }
        }
    }
}
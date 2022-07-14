public class ContactHandler {

    public static void onBeforeInsert(List<Contact> listContact)	
    {
     	Map<Id,List<Contact>> acctoNewContact = new Map<Id,List<Contact>>();
        for(Contact con:listContact)
        {
            if(acctoNewContact.containsKey(con.AccountId))
            {
                List<Contact> tempList = acctoNewContact.get(con.AccountId);
                tempList.add(con);
                acctoNewContact.put(con.AccountId,tempList);
			}
            else
            {
                List<Contact> tempList = new List<Contact>();
                tempList.add(con);
                acctoNewContact.put(con.AccountId,tempList);
            }
        }
        
        List<Contact> oldContactlist = [Select id, Child_Count__c, AccountId   from Contact where AccountId in :acctoNewContact.keySet()];
        Map<Id,List<Contact>> acctoOldContact = new Map<Id,List<Contact>>();
        
        for(Contact con: oldContactlist)
        {
            if(acctoOldContact.containsKey(con.AccountId))
            {
                List<Contact> tempList = acctoOldContact.get(con.AccountId);
                tempList.add(con);
                acctoOldContact.put(con.AccountId,tempList);
			}
            else
            {
                List<Contact> tempList = new List<Contact>();
                tempList.add(con);
                acctoOldContact.put(con.AccountId,tempList);
            }
        }
        
        List<Contact> contacttoUpdateList = new List<Contact>();
        for(Contact con:listContact)
        {
            Integer newSize = 0;
            Integer oldSize = 0;
            if(acctoNewContact.containsKey(con.AccountId))
            {
                newSize = acctoNewContact.get(con.AccountId).size();
            }
            if(acctoOldContact.containsKey(con.AccountId))
            {
                oldSize = acctoOldContact.get(con.AccountId).size();
                for(Contact con2: acctoOldContact.get(con.AccountId))
                {
                    con2.Child_Count__c = newSize+oldSize;
                    contacttoUpdateList.add(con2);
                }
            }
            con.Child_Count__c=newSize+oldSize;
        }
        update contacttoUpdateList;
    }
    
    public static void onBeforeDelete(List<Contact> listContact)	
    {
     	Map<Id,List<Contact>> acctoDeletedContact = new Map<Id,List<Contact>>();
        for(Contact con:listContact)
        {
            if(acctoDeletedContact.containsKey(con.AccountId))
            {
                List<Contact> tempList = acctoDeletedContact.get(con.AccountId);
                tempList.add(con);
                acctoDeletedContact.put(con.AccountId,tempList);
			}
            else
            {
                List<Contact> tempList = new List<Contact>();
                tempList.add(con);
                acctoDeletedContact.put(con.AccountId,tempList);
            }
        }
        
        List<Contact> oldContactlist = [Select id, Child_Count__c, AccountId   from Contact where AccountId in :acctoDeletedContact.keySet()];
        Map<Id,List<Contact>> acctoOldContact = new Map<Id,List<Contact>>();
        
        for(Contact con: oldContactlist)
        {
            if(acctoOldContact.containsKey(con.AccountId))
            {
                List<Contact> tempList = acctoOldContact.get(con.AccountId);
                tempList.add(con);
                acctoOldContact.put(con.AccountId,tempList);
			}
            else
            {
                List<Contact> tempList = new List<Contact>();
                tempList.add(con);
                acctoOldContact.put(con.AccountId,tempList);
            }
        }
        List<Contact> contacttoUpdateList = new List<Contact>();
        for(Contact con:listContact)
        {
            Integer newSize = 0;
            Integer oldSize = 0;
            if(acctoDeletedContact.containsKey(con.AccountId))
            {
                newSize = acctoDeletedContact.get(con.AccountId).size();
            }
            if(acctoOldContact.containsKey(con.AccountId))
            {
                oldSize = acctoOldContact.get(con.AccountId).size();
                for(Contact con2: acctoOldContact.get(con.AccountId))
                {
                    
                    System.debug(oldSize);
                    System.debug(newSize);
                    if(con2.Id!=con.Id)
                    {
                        con2.Child_Count__c = oldSize-newSize;
                        contacttoUpdateList.add(con2);
                    }
                }
            }
            //con.Child_Count__c=oldSize-newSize;
        }
        update contacttoUpdateList;
    }
    
}
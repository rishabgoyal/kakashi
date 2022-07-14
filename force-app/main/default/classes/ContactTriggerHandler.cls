public class ContactTriggerHandler {
    
    public static void onBeforeInsert(List<Contact> contList)
    {
        //APend Last Nad Frst Name
        
        
        for(Contact con: contList)
        {
        //    con.Full_Name__c = con.FirstName+' '+con.LastName;
        }
        
 
    }
    
    public static void onBeforeUpdate(List<Contact> contList, Map<Id, Contact> oldMap)
    {
        //Send an Email to Old Email Id if Changed
        
        for(Contact con: contList)
        {
            
            ContactTriggerHandler.myFutureMethod();
            String OldEmailId = oldMap.get(con.Id).Email;
            if(con.Email != oldEmailId)
            {
                sendEmail(con,oldEmailId);
            }
        }
    }
    
     @future
    public static void myFutureMethod()
    {   
         // Perform some operations
    }
    
    public static Boolean sendEmail(Contact con, String OldEmailId)
    {
        /*
         * 
         * 
         * 
         * 
         * */
        
        return true;
	}
}
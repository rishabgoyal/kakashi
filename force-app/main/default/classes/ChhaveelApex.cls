public class ChhaveelApex {
    
    @AuraEnabled public static List<Account> FirstMethod(String nm)
    {
        list<account> acc = new List<account>();
        acc= [Select name, Id from account  where name=:nm Limit 5];
        
      //  System.debug('Name is: '+Name);
        return acc;
    }
    
        @AuraEnabled public static List<Account> FirstMethod2(String nm2)
    {
        list<account> acc2 = new List<account>();
        acc2= [Select name, Id from account  where name=:nm2 Limit 5];
        
      //  System.debug('Name is: '+Name);
        return acc2;
    }

}
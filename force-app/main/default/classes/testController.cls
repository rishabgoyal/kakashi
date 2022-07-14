public class testController {
    
   
    
    @AuraEnabled
    public static List<Account> getAccount()
    {
        
        List<Account> acclist = [Select id,Name,Type,Phone from Account  limit 6];
        return acclist;
    }
}
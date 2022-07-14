@isTest
public class MultiSelectLookupControllerTest {
    static testMethod void testMultiSelect(){
        Account acc=new Account(Name='Cognizant');
        insert acc;
  
        String srchwrd='co';
        String objName='Account';
        List<Account> accList=new List<Account>();
        
        MultiSelectLookupController.fetchLookUpValues(srchwrd,objName,accList);
    }
}
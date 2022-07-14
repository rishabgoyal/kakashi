@isTest
private class ContactTriggerTest {
    @isTest static void beforeInsertSingleContact() {
        
        Contact con = TestUtility.createContact('Goyal','test@gmail.com',true);
        con.Email='TestNew@gmail.com';
        update con;
        
    }
    
    @isTest static void beforeInsertBulkContact() {
        
     /*   List<Contact> conList=	TestUtility.createListContact(500,false);
        insert conList;*/
    }
    
}
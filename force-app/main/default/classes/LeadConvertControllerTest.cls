@isTest
private class LeadConvertControllerTest {
    @isTest static void myTest() {
        Lead ld = new Lead();
        ld.FirstName='TestName';
        ld.LastName='LastName';
        ld.Company='Unknown';
        insert ld;
        Test.startTest();
        LeadConvertController.getDuplicateContactList(ld.id);
        Test.stopTest();
    }
}
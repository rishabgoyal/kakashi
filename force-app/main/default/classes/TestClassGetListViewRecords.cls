@isTest
public class TestClassGetListViewRecords {
    static testMethod void getFilterListViewTest() {
        
        Test.setMock(HttpCalloutMock.class, new FilterResultMock('Contact'));
        GetListViewRecord.getFilteredContacts('asd');
        Test.setMock(HttpCalloutMock.class, new FilterResultMock('Lead'));
        GetListViewRecord.getFilteredLeads('asd');
    }
}
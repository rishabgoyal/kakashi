@isTest
public class DataSearchController_Test {
    
    @isTest
    private static void ManageViewTest()
    {
      /*  String ViewJSON = '{"view":{"attributes":{"type":"View__c"},"Fields_To_Display_JSON__c":"[{\"value\":\"Name\",\"label\":\"Account Name\",\"Type\":\"STRING\"},{\"value\":\"BillingCity\",\"label\":\"Billing City\",\"Type\":\"STRING\"},{\"value\":\"AccountNumber\",\"label\":\"Account Number\",\"Type\":\"STRING\"},{\"value\":\"AnnualRevenue\",\"label\":\"Annual Revenue\",\"Type\":\"CURRENCY\"}]","Condition__c":"AND","CustomLogic__c":"","Limit__c":"10000","objectName__c":"account","Name":"Test View"},"filterList":[{"attributes":{"type":"Filter__c"},"relationshipFieldAPIName__c":"temp","valuetoFilter__c":"s%","operatorLabel__c":"Starts with","filterString__c":"Name like \'s%\'","operatorSymbol__c":"like","isrelated__c":false,"fieldLabel__c":"Account Name","fieldType__c":"STRING","fieldAPIName__c":"Name","displayText__c":"1. Account Name Starts with s%","serial__c":"1"}]}';
        DataSearchController.ViewWrapper vw = (DataSearchController.ViewWrapper) JSON.deserialize(ViewJSON, DataSearchController.ViewWrapper.Class);
        */
        DataSearchController.ViewWrapper vw = new DataSearchController.ViewWrapper();
        View__c vwrec = new View__c();
        vwrec.Name='Test View';        
        vwrec.objectName__c='account';        
        vwrec.Limit__c='100';        
        vwrec.objectName__c='account';        
        vwrec.Field_To_Display_JSON__c='[{\"value\":\"Name\",\"label\":\"Account Name\",\"Type\":\"STRING\"},{\"value\":\"BillingCity\",\"label\":\"Billing City\",\"Type\":\"STRING\"},{\"value\":\"BillingCountry\",\"label\":\"Billing Country\",\"Type\":\"STRING\"},{\"value\":\"ShippingStreet\",\"label\":\"Shipping Street\",\"Type\":\"TEXTAREA\"},{\"value\":\"ShippingLatitude\",\"label\":\"Shipping Latitude\",\"Type\":\"DOUBLE\"},{\"value\":\"Jigsaw\",\"label\":\"Data.com Key\",\"Type\":\"STRING\"},{\"value\":\"LastActivityDate\",\"label\":\"Last Activity\",\"Type\":\"DATE\"}]';
        List<Filter__c> filterList = new List<Filter__c>();
        Filter__c filter = new Filter__c();
        filter.isrelated__c=false;
        filter.fieldType__c='STRING';
        filter.fieldAPIName__c='Name';
        filter.fieldLabel__c='Account Name';
        filter.operatorSymbol__c='like';
        filter.operatorLabel__c='Starts with';
        filter.valuetoFilter__c='s%';
        filter.displayText__c='1. Account Name Starts with s%';
        filter.serial__c='1';
        
        filter.relationshipFieldAPIName__c='temp';
        filter.filterString__c='Name like \'s%\'';
        filterList.add(filter);
        vw.view = vwrec;
        vw.filterList = filterList;
        DataSearchController.saveView(vw);
        DataSearchController.getView(DataSearchController.getViewList()[0].Id);
    }
        @isTest
    private static void DataSearchInitTest()
    {
        DataSearchController.getAllObjectList();
    }
    
    @isTest
    private static void SearchLwcControllerTest(){
        SearchLwcController.fetchDataRecords('', 'account', 'Id,Name', '100');
        SearchLwcController.getPicklistValues('account', 'Industry');
    }
}
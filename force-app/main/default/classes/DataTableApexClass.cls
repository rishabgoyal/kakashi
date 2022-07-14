public class DataTableApexClass {
    @AuraEnabled
    public static List<Contact> getAllContacts (String recordId){
        return [Select Id, LastName, FirstName, Phone, Fax, MobilePhone, HomePhone,Sub_Picklist__c, Master_Picklist__c  from Contact Where AccountId = :recordId] ; 
        
    }
    @AuraEnabled
    public static void updateAccount(List<Contact> conList ){
        update conList;
    }
    
}
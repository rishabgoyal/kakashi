public with sharing class FirstLWCApex {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String searchKey) {
        searchKey = '%' + searchKey +'%';
        System.debug(searchKey);
        return [SELECT Id, Name, Phone FROM Account where name like :searchKey LIMIT 5];
    }
}
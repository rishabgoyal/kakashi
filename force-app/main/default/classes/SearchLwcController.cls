/**
* @description       :
* @author            : ChangeMeIn@UserSettingsUnder.SFDoc
* @group             :
* @last modified on  : 09-02-2021
* @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
* Modifications Log
* Ver   Date         Author                               Modification
* 1.0   06-23-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class SearchLwcController {
    
     
    
     @AuraEnabled
    public static DataTableWrapper fetchDataRecords(String WhereClause,String objectName,String fieldsToDisplay,String Querylimit)
    { 
        System.debug('IN');
        String prequery=''; 
        
         if(WhereClause!=null && WhereClause.trim()!=''){ 
            WhereClause=' WHERE '+WhereClause;
        }   
        
        prequery='SELECT '+fieldsToDisplay+' FROM '+objectName+WhereClause+' LIMIT '+Querylimit;
        System.debug('prequery:'+prequery);
        List<sObject> dataList= Database.query(prequery);
        System.debug('dataList:'+dataList);
         
        DataTableWrapper dtw = new DataTableWrapper();
        dtw.allData = dataList; 
        dtw.headerList = null;
        System.debug('OUT');
        return dtw; 
    }
    
    public class SelectOption{
        @AuraEnabled public string label {get;set;}
        @AuraEnabled public string value {get;set;}
    }
    @AuraEnabled
    public static List<SelectOption> getPicklistValues(String objectName,String fieldName )
    {
        
        Schema.SObjectType s = Schema.getGlobalDescribe().get(objectName) ;
        Schema.DescribeSObjectResult r = s.getDescribe() ;
        Map<String,Schema.SObjectField> fields = r.fields.getMap() ;
        Schema.DescribeFieldResult fieldResult = fields.get(fieldName).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        List<SelectOption> solist = new List<SelectOption>();
        for( Schema.PicklistEntry pickListVal : ple){
            SelectOption so = new SelectOption();
            so.label = pickListVal.getLabel();
            so.value = pickListVal.getValue();
            solist.add(so);
            System.debug(pickListVal.getLabel() +' '+pickListVal.getValue());
            
        }    
        return solist;
    }
     
    public class DataTableWrapper{
        @AuraEnabled public List<sObject> allData {get;set;}
        @AuraEnabled public String headerList {get;set;}
    }


    
}
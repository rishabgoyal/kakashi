public with sharing class DataSearchController {
    
    //public static String allowedFieldTypes = 'Boolean,Currency,Date,DateTime,Double,Email,ID,Integer,Long,MultiPicklist,Percent,Phone,Picklist,String,TextArea,Time,URL';
    
    public static String allowedObjectTypes=System.Label.AQB_AllowedObjects;
    public static String allowedFieldTypes = System.Label.AQB_AllowedFieldTypes;
    public static String notAllowedObjectType=System.Label.AQB_NA_ObjectTypes;
    @AuraEnabled
    public static List<ObjectWrapper>  getAllObjectList()
    {
        List<ObjectWrapper> owlist = new List<ObjectWrapper>();
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Set<String> objectKeySet = gd.keySet();
        for(String objKey : objectKeySet)
        {
            List<String> allowedObjectTypeSet = allowedObjectTypes.split(',');
            Schema.DescribeSObjectResult objDetail = gd.get(objKey).getDescribe();
            Boolean isValidObject = false;
            for(String allowed:  allowedObjectTypeSet)
            {
                if(objKey==allowed)
                {
                    isValidObject=true;
                }
            }
            if(isValidObject)
            {
                if((objDetail.isAccessible()&&objDetail.isQueryable())&&objDetail.isDeprecatedAndHidden()==false)
                {
                    ObjectWrapper ow = new ObjectWrapper();
                    
                    ow.ObjectLabel=objDetail.getLabel();
                    ow.ObjectAPIName=objKey;
                    
                    List<RelatedWrapper> relatedLists  = new List<RelatedWrapper>();
                    List<Schema.ChildRelationship> childRelationshiplist = objDetail.getChildRelationships();
                    for(Schema.ChildRelationship cr:childRelationshiplist)
                    {
                        if(!cr.isDeprecatedAndHidden()&&cr.getRelationshipName()!=null){
                            
                            RelatedWrapper rw = new RelatedWrapper();
                            rw.RelatedListSObjectName =  cr.getChildSObject().getDescribe().getName();
                            rw.RelationshipFieldAPIName = cr.getField().getDescribe().getName();
                            rw.RelationshipLabel =  cr.getRelationshipName();
                            Boolean isValidRObject = false;
                            for(String allowed:  allowedObjectTypeSet)
                            {
                                if(cr.getChildSObject().getDescribe().getName()==allowed)
                                {
                                    isValidRObject=true;
                                }
                            }
                            if(isValidRObject)
                            {
                                relatedLists.add(rw);
                            }
                        }
                    }
                    List<FieldWrapper> fieldList = new List<FieldWrapper>();
                    
                    Map <String, Schema.SObjectField> fieldMap = objDetail.fields.getMap();
                    for(String fieldKey : fieldMap.keySet())
                    {
                        Schema.DescribeFieldResult fd = fieldMap.get(fieldKey).getDescribe();
                        if(fd.isAccessible()&&fd.isFilterable()&&(fd.isDeprecatedAndHidden()==false) &&(allowedFieldTypes.containsIgnoreCase(fd.getType().name())))
                        {
                            FieldWrapper fw = new FieldWrapper();
                            fw.FieldAPIName =  fd.getName();
                            fw.FieldLabel =  fd.getLabel();
                            fw.FieldType =  fd.getType().name();
                            if(fw.fieldType == 'REFERENCE')
                            {
                                List<Schema.sObjectType> refrencetoList = fd.getReferenceTo();
                                if(refrencetoList.size()==1){
                                fw.ReferencedSObjectName  = (refrencetoList[0].getDescribe().getName()).toLowerCase();
                                }
							}
                            fieldList.add(fw);
                        }
                    }
                    ow.fieldList = fieldList;
                    ow.relatedLists = relatedLists;
                    owlist.add(ow);
                    
                }
            }
        }
        System.debug('MethodOut');
        return owlist;
    }
    
    @AuraEnabled
    public static ViewWrapper  getView(String viewId)
    {
        try{
            List<View__c> viw=[SELECT Id, Name, CustomLogic__c, Condition__c, Limit__c, objectName__c,Field_To_Display_JSON__c ,
                               (SELECT Id, isrelated__c, fieldType__c, fieldAPIName__c, fieldLabel__c, operatorSymbol__c,operatorLabel__c, valuetoFilter__c, 
                                displayText__c, serial__c, filterString__c, relationshipFieldAPIName__c, relObjName__c, View__c, objectName__c FROM Filters__r)FROM View__c 
                               WHERE Id=:viewId LIMIT 1];
            ViewWrapper vw=new ViewWrapper();
            if(!viw.isEmpty()){
                vw.view=viw[0];
                List<Filter__c> fltrs=viw[0].Filters__r;
                vw.filterList=fltrs;
                
                return vw;
            }else{
                return null;
            }
            
        }catch(Exception e){
            return null;
        }
    }
    
    @AuraEnabled
    public static List<View__c>  getViewList()
    {
        Id userId=UserInfo.getUserId();
        List<View__c> vwList=[select Id,Name,OwnerId from View__c where OwnerId=:userId];
        return vwList;
    }
    
    @AuraEnabled
    public static String  saveView(ViewWrapper viewData)
    {
        try{
          	System.debug(JSON.serialize(viewData));
            View__c vw=viewData.view;
            List<Filter__c> filters=viewData.filterList;
            System.debug('DATA:');
            System.debug(viewData); 
            
            System.debug('viewData.filterList len:'+viewData.filterList.size());
            System.debug('filters len:'+filters.size());
            
            upsert vw;
            Set<Id> filterIdSet=new Set<Id>();
            List<Filter__c> upsertList=new List<Filter__c>();
            for(Filter__c flts:filters){
                if(flts.Id==null){
                    flts.view__c=vw.Id;
                   
                }else{
                    filterIdSet.add(flts.Id);
                }
                upsertList.add(flts);
            }
            System.debug('size: '+upsertList.size());
            
            List<Filter__c> checkFilterList=[select id from Filter__c where View__c=:vw.Id and (NOT Id in :filterIdSet)];
            delete checkFilterList;
            
            upsert upsertList;
            
            return 'Success';
        }catch(Exception e){
            return e.getMessage();
        }
    }
    
    public class ViewWrapper{
        
        @AuraEnabled public View__c view   {get;set;} 
        @AuraEnabled public List<Filter__c> filterList {get;set;}
    }
    
    
    public class ObjectWrapper{
        
        @AuraEnabled public String ObjectAPIName   {get;set;}
        @AuraEnabled public String ObjectLabel   {get;set;}
        @AuraEnabled public List<FieldWrapper> fieldList {get;set;}
        @AuraEnabled public List<RelatedWrapper> relatedLists {get;set;}
    }
    public class FieldWrapper{
        @AuraEnabled public String FieldLabel  {get;set;}
        @AuraEnabled public String FieldAPIName  {get;set;}
        @AuraEnabled public String ReferencedSObjectName  {get;set;}
        @AuraEnabled public String FieldType  {get;set;}
    }
    public class RelatedWrapper{
        @AuraEnabled public String RelationshipLabel {get;set;}
        @AuraEnabled public String RelationshipFieldAPIName {get;set;}
        @AuraEnabled public String RelatedListSObjectName {get;set;}
    }
}
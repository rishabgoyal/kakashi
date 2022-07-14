public class SchemaHelper {
    public static String allowedFieldTypes = 'Boolean,Currency,Date,DateTime,Double,Email,ID,Integer,Long,MultiPicklist,Percent,Phone,Picklist,Reference,String,TextArea,Time,URL';
    public static List<ObjectWrapper>  getAllObjectList()
    {
        
        List<ObjectWrapper> owlist = new List<ObjectWrapper>();
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Set<String> objectKeySet = gd.keySet();
        for(String objKey : objectKeySet)
        {
            
            Schema.DescribeSObjectResult objDetail = gd.get(objKey).getDescribe();
            if(!(objkey.contains('__share')||objkey.contains('__changeevent')))
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
                            relatedLists.add(rw);
                        }
                    }
                    List<FieldWrapper> fieldList = new List<FieldWrapper>();
                    
                    Map <String, Schema.SObjectField> fieldMap = objDetail.fields.getMap();
                    for(String fieldKey : fieldMap.keySet())
                    {
                        Schema.DescribeFieldResult fd = fieldMap.get(fieldKey).getDescribe();
                        if(fd.isAccessible()&&fd.isFilterable()&&(fd.isDeprecatedAndHidden()==false) &&(allowedFieldTypes.contains(fd.getType().name())))
                        {
                            FieldWrapper fw = new FieldWrapper();
                            fw.FieldAPIName =  fd.getName();
                            fw.FieldLabel =  fd.getLabel();
                            fw.FieldType =  fd.getType().name();
                            fieldList.add(fw);
                        }
                    }
                    ow.fieldList = fieldList;
                    ow.relatedLists = relatedLists;
                    owlist.add(ow);
                    
                }
            }
        }
        System.debug(owlist);
        return owlist;
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
        @AuraEnabled public String FieldType  {get;set;}
    }
    public class RelatedWrapper{
        @AuraEnabled public String RelationshipLabel {get;set;}
        @AuraEnabled public String RelationshipFieldAPIName {get;set;}
        @AuraEnabled public String RelatedListSObjectName {get;set;}
    }
}
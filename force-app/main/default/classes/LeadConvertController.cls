public class LeadConvertController {
    
    @AuraEnabled
    public static List<Contact> getDuplicateContactList(Id LeadId)
    {
        Lead ld = [Select id,Name from Lead where Id=:LeadId];
		return [Select id from Contact where Name=:ld.Name];
    }

	/*@AuraEnabled 
    public static void converLeadNow(Id LeadId,Id contactId )
    {
       
        Lead ld = [Select id,IsConverted, ConvertedAccountId,ConvertedContactId  from Lead where id = :LeadId];
        if(ld!=null)
        {
            Database.LeadConvert lc = new database.LeadConvert();
            lc.setLeadId(ld.id);
            lc.setContactId(contactId);
            lc.setDoNotCreateOpportunity(True); 
            
            LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
            lc.setConvertedStatus(convertStatus.MasterLabel);
            
            Database.LeadConvertResult lcr = Database.convertLead(lc);}
	}*/
}
public class SelectCompController {

    @AuraEnabled 
    public static List<Opportunity> getOppRecs()
    {
		return [Select id,Name from Opportunity limit 5];	
    }
    
}
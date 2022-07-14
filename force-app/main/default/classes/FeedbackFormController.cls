public class FeedbackFormController {

    @AuraEnabled
    public static void insertFbRecord(Feedback__c fb)
    {
		insert fb;
    }
    
}
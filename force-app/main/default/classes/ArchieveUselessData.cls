public class ArchieveUselessData implements Database.Batchable<sObject>,schedulable
{
    //
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        System.debug('Hello');
        return Database.getQueryLocator([SELECT Id, name ,createdDate,Active__c FROM Account]);// WHERE CreatedDate=THIS_MONTH 
    }
    public void execute(Database.BatchableContext bc, List<Account> uselessData){
        Messaging.SingleEmailMessage email =new Messaging.SingleEmailMessage();
        List<Account> dataToBeArchhive = new List<Account>();
        String generatedCSVFile ='';
        for(Account acc:uselessData)
        {
            if(acc.Active__c == 'No')
            {
                generatedCSVFile = generatedCSVFile+acc+'\n';
               // delete acc;
                dataToBeArchhive.add(acc);
                Messaging.EmailFileAttachment csvAttc = new Messaging.EmailFileAttachment();
                blob csvBlob = Blob.valueOf(generatedCSVFile);
                String csvName = 'Account.csv';
                csvAttc.setFileName(csvName);
                csvAttc.setBody(csvBlob);
                String[] toAddresses = new list<string> {'rs3889905@gmail.com'};
                    String subject ='Account CSV';
                email.setSubject(subject);
                email.setToAddresses( toAddresses );
                email.setPlainTextBody('Account CSV ');
                email.setFileAttachments(new Messaging.EmailFileAttachment[]{csvAttc});
            }
        }
        System.debug('Hello2');
//		delete dataToBeArchhive.add(acc);
	//	new Messaging.SingleEmailMessage[]{email}
        List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
        emailList.add(email);
        Messaging.SendEmailResult[] r = Messaging.sendEmail(emailList);
    }
    public void finish(Database.BatchableContext bc){
        
    }
    public void execute(SchedulableContext ctx) {
        ArchieveUselessData archData = new ArchieveUselessData();
        Database.executeBatch(archData);
    }
}
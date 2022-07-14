public class TaskScreenApexController {

   
    @AuraEnabled public static List<Task> getTasks()
    {
		List<Task> allTaskList = new List<Task>();//Initialized a list
        allTaskList=[SELECT Id, WhoId, ActivityDate, Status, Priority, Description, Owner.Name, Subject FROM Task];
        System.debug('Your list is: '+allTaskList);
        return allTaskList;
    }
    
}
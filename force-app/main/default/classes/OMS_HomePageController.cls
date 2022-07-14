public class OMS_HomePageController {

    @AuraEnabled
    public static User getAccounts(){
		return [Select Id, name from User where id=:UserInfo.getUserId()];
    }
}
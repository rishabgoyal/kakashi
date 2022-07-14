public class MyBellNotification
{   
    public static void notifyCurrentUser(String message)
    {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()
            + '/services/data/v46.0/actions/standard/customNotificationAction');
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setHeader('Content-Type', 'application/json');
        CustomNotificationActionInput input = new CustomNotificationActionInput();
        input.customNotifTypeId = '0ML6F00000000BTWAY';
        input.recipientIds = new List<String>{UserInfo.getUserId()};
        input.title = 'Test Data Operation Completed';
        input.body = message;
        input.targetId = '0ML6F00000000BTWAY';
        CustomNotificationAction action = new CustomNotificationAction();
        action.inputs = new List<CustomNotificationActionInput>{input};
        req.setBody(JSON.serialize(action));
        HttpResponse res = h.send(req);
        System.debug(res.getBody());
    }

    public class CustomNotificationAction
    {
        public List<CustomNotificationActionInput> inputs { get; set; }
    }

    public class CustomNotificationActionInput
    {
        public String customNotifTypeId { get; set; }
        public List<String> recipientIds { get; set; }
        public String title { get; set; }
        public String body { get; set; }
        public String targetId { get; set; }
    }
}
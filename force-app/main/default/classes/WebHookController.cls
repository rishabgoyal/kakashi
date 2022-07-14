public class WebHookController {

    	public WebhookController()
        {
            System.debug('Nahi Bt chal to ye raha haui');
            System.debug(ApexPages.currentPage().getParameters().get('SecretKey') );
        }
}
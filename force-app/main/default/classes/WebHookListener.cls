@RestResource(urlMapping='/WebhookTest/*')
global with sharing class WebHookListener {

    @HttpPost
    global static String listenWebhook() {
        RestRequest request = RestContext.request;
        
        String reqBody = request.requestBody.toString();
        System.debug('Hello Ye chal ra');
        System.debug(reqBody);
        return 'true';
    }
}
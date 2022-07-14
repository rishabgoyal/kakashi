public class WhatsappIntegration {

    public static void sendRequestforWhatsApp(){
        
        String Body = '{"message":{"channel":"WABA","content":{"preview_url":false,"shorten_url":false,"type":"MEDIA_TEMPLATE","mediaTemplate":{"templateId":"collection_receipt_media","media":{"type":"document","url":"https://cube.capriglobal.in/test.pdf","fileName":"test.pdf"},"bodyParameterValues":{"0":"123579.00","1":"HLR21005417 (Closed)","2":"Gautam Jadeja","3":"24","4":"CIBIL Related"}}},"recipient":{"to":"919420303231","recipient_type":"individual"},"sender":{"from":"918451021021"},"preferences":{"webHookDNId":"1001"}},"metaData":{"version":"v1.0.9"}}';
        String EndPoint  = 'https://rcmapi.instaalerts.zone/services/rcm/sendMessage';
        String Authorization = 'Bearer '+ 'lVYywYplXuHLOlDNLyuiMQ==';
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(EndPoint);
        req.setMethod('POST');
        
        req.setHeader('content-type', 'application/json');
        req.setHeader('content-type', 'application/json');
        req.setHeader('Authentication', Authorization);
        req.setBody(Body);
        HttpResponse res = h.send(req); 
        
    }
    
}
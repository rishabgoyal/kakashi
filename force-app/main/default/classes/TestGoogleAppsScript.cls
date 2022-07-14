public class TestGoogleAppsScript {

    
    public static void hitGoogle()
    { 
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Google_Web_API'+'/macros/s/AKfycbw8yqE9O--Awi5dP_uS0W0P_hjNMR8MEd9bFSvBWKGwyeCGWc0/exec');
        req.setMethod('GET');
        req.setTimeout(6000);
        HttpResponse res = http.send(req);
        if(res.getStatusCode() == 302)
        {
            req.setEndpoint(res.getHeader('Location'));
            res = http.send(req);
            System.debug('GoogleScript response : ' + res.getBody());
        }
    }
    
}
public class Cutly {

// Cutly.getShortUrl('ce09dd19ee011fafa1fc8d97b7740bd9e30dd','https://legacymachinery.lightning.force.com/lightning/r/Order/8014T000000USNDQA4/view?id=adasdasda');
    public static void getShortUrl(String APIKEY, String urlToShorten)
        {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://cutt.ly/api/api.php?key='+APIkey+'&short='+urlToShorten+'.json');
            request.setMethod('GET');
            request.setHeader('Accept', 'application/json');
            request.setHeader('Content-Type', 'application/json');
            // Set the body as a JSON object
            HttpResponse response = http.send(request);
            // Parse the JSON response
                System.debug(response.getBody());
            
            String ResponseString = response.getBody();
            ResponseString = ResponseString.remove('\\');
            System.debug(ResponseString);
            
           CutlyResponse values = (CutlyResponse) JSON.deserialize(ResponseString , CutlyResponse.class);
            
            System.debug(values.url.shortLink);

         
          
        }
    
    
    public class CutlyResponse{
        public url url{get;set;}
        
    }
    public class url{
        public String shortLink{get;set;}
        public String sdate{get;set;}
        public String title{get;set;}
        public String fullLink{get;set;}
        public Integer status{get;set;}
    }
}
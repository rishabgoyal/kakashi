@RestResource(urlMapping='/InventoryManagementService')
global with sharing class InventoryManagement {
    
    @HttpPost
    global static void addProductToCart() 
    {
        
        RestRequest request = RestContext.request;
        System.debug(request);

        RestResponse res = RestContext.response;
        String reqBody = request.requestBody.toString();
        
        System.debug(reqBody);
        if(String.isBlank(reqBody))
        {
            ResponseWrap rw = new ResponseWrap();
            rw.Status ='Error';
            rw.ErrorMessage = 'Bad Request Please send body'; 
            
            res.responseBody = Blob.valueOf(JSON.serialize(rw));
            res.statusCode = 200;
            
        }
        else{
            ReqWrap reqw = (ReqWrap) JSON.deserialize(reqBody, ReqWrap.Class);
            
            Set<String> availableProduct =new Set<String>{'Charger','Cable','Screen','Display','Headphones','Back Case','Smart Hub Cloud Backup','Office Hub Modem'};
                try{
                     ResponseWrap rw = new ResponseWrap();
                    Boolean IsProductAvailable = false;
                    if(availableProduct.contains(reqw.ProductName))
                    {
                        IsProductAvailable = true;
                        rw.AvailableQuantity = Math.floor( Math.random() * 10 );
                    }
                   
                    rw.Status ='Success';
                    rw.IsProductAvailable = IsProductAvailable;
                  
                    
                    res.responseBody = Blob.valueOf(JSON.serialize(rw));
                    res.statusCode = 200;
                }
            Catch(Exception ex){
                ResponseWrap rw = new ResponseWrap();
                rw.Status ='Error';
                rw.ErrorMessage = ex.getMessage();
                
                res.responseBody = Blob.valueOf(JSON.serialize(rw));
                res.statusCode = 200;
            }
        }
    }
    
    public class ResponseWrap
    {
        public string Status;
        
        public string ErrorMessage;
        public string SuccessMessage;
        public Boolean IsProductAvailable;              
        public Decimal AvailableQuantity;
    }
    
    public class ReqWrap
    {
        public String ProductName;
        public Decimal Quantity;
    }
    
}
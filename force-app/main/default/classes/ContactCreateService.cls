@RestResource(urlMapping='/ContactService')
global with sharing class ContactCreateService {
    
    @HttpPost
    global static String UploadDocument() 
    {
        
        RestRequest request = RestContext.request;
        System.debug(request);

        String reqBody = request.requestBody.toString();
        
        if(String.isBlank(reqBody))
        {
            ResponseWrap rw = new ResponseWrap();
            rw.Status ='Error';
            rw.ErrorMessage = 'Bad Request Please send body'; 
            
            return JSON.serialize(rw);
        }
        else{
            Contact con = (Contact) JSON.deserialize(reqBody, Contact.Class);
            
            System.debug(con);
            try{
                insert con;
                ResponseWrap rw = new ResponseWrap();
                rw.Status ='Success';
                rw.SuccessMessage = 'Done'; 
                rw.AdditionalInfo = con.Id;
                return JSON.serialize(rw);
            }
            Catch(Exception ex){
                ResponseWrap rw = new ResponseWrap();
                rw.Status ='Error';
                rw.ErrorMessage = ex.getMessage();
                return JSON.serialize(rw);
            }
        }
    }
    public class ResponseWrap
    {
        
        public string Status;
        
        public string ErrorMessage;
        public string SuccessMessage;
        public string AdditionalInfo;        
    }
}
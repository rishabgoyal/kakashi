public class GoogleDriveIntegration {
    
    
    public static void createFolder() {
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint('callout:GoogleDrivePU');  // API Name Of Named Credential
        //https://www.googleapis.com/drive/v2/files/folderId/children
        req.setHeader('content-type', 'application/json');
        ParentRequestClass pp = new ParentRequestClass();
        List<ParentRequestClass> ppList = new List<ParentRequestClass>();
        pp.id = '1goIPaT0CBFcTFFNgEBeE4t-UA9S6j1WF'; // Parent Folder id
        ppList.add(pp);
        FolderRequestClass fc = new FolderRequestClass();
        fc.title = 'Account 1';
        fc.mimeType = 'application/vnd.google-apps.folder';
        fc.parents = ppList;
        String messageBody = Json.serialize(fc );
        req.setHeader('Content-length', String.valueOf(messageBody.length()));
        req.setTimeout(60*1000);
        req.setBody(messageBody);
        Http h = new Http();
        String resp;
        System.debug('the req '+ req  +', '+messageBody);
        HttpResponse res = h.send(req);
        resp = res.getBody();
        System.debug('the resp 1'+ resp  );
    }
    public class ParentRequestClass {
        public String id;
    }
    public class FolderRequestClass {
        public String title;
        public String mimeType;
        public List<ParentRequestClass> parents;
    }
    
}
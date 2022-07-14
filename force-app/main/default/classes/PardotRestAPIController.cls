@RestResource(urlMapping='/PRAPI')
global with sharing class PardotRestAPIController {
   
    @HttpPost
    global static String UploadDocument() 
    {
        
        RestRequest request = RestContext.request;
     
        String reqBody = request.requestBody.toString();
        
        
        System.debug(reqBody);
        FileParser pr =  FileParser.parse(reqBody);
        
        
        ContentVersion cVersion = new ContentVersion();
        cVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
        cVersion.PathOnClient = pr.Name;//File name with extention
        cVersion.Origin = 'C';//C-Content Origin. H-Chatter Origin.
//        cVersion.
		
        cVersion.Title = pr.Name;//Name of the file
        cVersion.VersionData =  EncodingUtil.base64Decode(pr.fileContent);   //File content
        Insert cVersion;
        
        //After saved the Content Verison, get the ContentDocumentId
        Id conDocument = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cVersion.Id].ContentDocumentId;
        
        //Insert ContentDocumentLink
        ContentDocumentLink cDocLink = new ContentDocumentLink();
        cDocLink.ContentDocumentId = conDocument;//Add ContentDocumentId
        cDocLink.LinkedEntityId = '0016F00002SPY9VQAX';//Add attachment parentId
        cDocLink.ShareType ='V';//V - Viewer permission. C - Collaborator permission. I - Inferred permission.
        cDocLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
       
        Insert cDocLink;
        
       /* Attachment a = new Attachment (Body = Blob.valueOf(pr.fileContent),
                                       ParentId = '0016F00002SPY9VQAX',
                                       ContentType = 'document/pdf',
                                       Name = pr.Name);
        insert a;*/
        return conDocument;
        
    }
}
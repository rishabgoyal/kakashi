public class ShowContactsController {
    
    public List<Contact> ContactList {get;set;}
     public Boolean showContactList {get;set;}
    public ShowContactsController(){
        this.ContactList = new List<Contact>();
        this.ContactList = [Select id,FirstName,LastName from Contact ];    
        this.showContactList = true;
    }
}
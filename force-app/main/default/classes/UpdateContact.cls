public class UpdateContact implements Queueable {
    List<Contact> contactList = new List<contact>();
    public UpdateContact(List<Contact> conList)
    {
        contactList = conList;
	}
    public void execute(QueueableContext context) {
        	Database.update(contactList,false);
    }
}
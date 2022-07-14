public class TestUtility {
		
    	public static Contact createContact(String LastName, String EmailId, Boolean isInsert)
        {
			Contact con = new Contact();
            con.FirstName='Test';
            con.LastName=LastName;
            con.Email = EmailId;
            
            if(isInsert)
            {
				insert con;
            }
            
            return con;
        }
    
    	public static List<Contact> createListContact(Integer noOfContact, Boolean isInsert)
        {
            
            List<Contact> conList = new List<Contact>();
            
            for(Integer i=0;i<noOfContact; i++)
            {
                Contact con = createContact('TestLastName'+i,'test'+i+'@gmail.com',false);
                
                conList.add(con);
            }
            if(isInsert)
            {
                insert conList;
            }
            return conList;
        }
}
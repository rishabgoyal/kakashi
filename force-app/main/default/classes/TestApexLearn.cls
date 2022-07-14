public class TestApexLearn {


    public static List<WrapperClass> fun()
    {
        List<Account> accList = [Select id, name from Account limit 1];
        
        
        if(!accList.isEmpty())
        {
            System.debug(accList[0]);
        }
        
        
        List<Opportunity> oppList = [Select id, name from Opportunity limit 1];
        
        
        if(!oppList.isEmpty())
        {
            System.debug(oppList[0]);
        }
        
        
        String serializedData = JSON.serialize(accList[0]);
        
        System.debug(serializedData);
        WrapperClass wr1 = new WrapperClass();
        wr1.sOBjectType = 'Account';
        wr1.serData = serializedData;
        
        
        String serializedDataOpp = JSON.serialize(oppList[0]);
        
        System.debug(serializedDataOpp);
        WrapperClass wr2 = new WrapperClass();
        wr2.sOBjectType = 'Opportunity';
        wr2.serData = serializedDataOPp;
        
        List<WrapperClass> wrList = new List<WrapperClass>();
        
        wrList.add(wr1);
        wrList.add(wr2);
        
        
        
        return wrList;
    }
    
    
        
    public class   WrapperClass{
        public String sOBjectType ;
        public String serData;
    }
}
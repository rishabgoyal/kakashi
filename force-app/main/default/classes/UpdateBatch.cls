global class UpdateBatch implements Database.Batchable<sObject>{


   global Database.QueryLocator start(Database.BatchableContext BC){

      String query = 'Select id,fieldName,Email from Lead where isConverted =  false';
       return Database.getQueryLocator(query);
   }

   global void execute(Database.BatchableContext BC, List<Lead> scope){
    List<Lead> UpdateList = new List<Lead>();   
       for(Lead con : scope){
  		
        // con.fieldName = 'false';
        updateList.add(con);
     }
       
     	 update UpdateList;
    }

   global void finish(Database.BatchableContext BC){
   }
    
}
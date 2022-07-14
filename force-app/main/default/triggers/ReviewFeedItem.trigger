trigger ReviewFeedItem on FeedItem (before insert) {
    for (Integer i = 0; i<trigger.new.size(); i++) {

        // We don't want to leak "test phrase" information.

  /*      if (trigger.new[i].body!='') {
             String tObjName = '';
            System.debug(trigger.new[i].body);
           String body = trigger.new[i].body;
            List<String> ATString = body.split('@',3);
            for(String s:ATString)
            {
                System.debug(s);
            }
            if(ATString.size()>2)
            {
                tObjName = ATString[2].split(' ',2)[0];
                System.debug(tObjName);
            }
            if(tObjName!='')
            {
                testObj__c tobj = [Select id, name from testObj__c where name =:tObjName limit 1];
                tobj.Message__c = 'User: '+ATString[1].split(' ')[0] +   'Message: '+ATString[2].split(' ',2)[1];
                update tobj;
                
            }
        }*/
    }
}
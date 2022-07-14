trigger ContactTriggerNew on Contact(before insert, before update) {
    if ( trigger.isBefore ) {
        if ( trigger.isInsert ) {
            ContactTriggerHandler.onBeforeInsert(trigger.new);
        } else if ( trigger.isUpdate ) {
            //ContactTriggerHandler.onBeforeUpdate(trigger.new, trigger.oldMap);
        }
        /*else if ( trigger.isDelete ) {
OpportunityHandlerController.onBeforeDelete(trigger.old, trigger.oldMap);
}*/
    } 
    
    /*
else if ( trigger.isAfter ) {
if ( trigger.isInsert ) {
OpportunityHandlerController.onAfterInsert(trigger.new); Id= '18digitId'
} else if ( trigger.isUpdate ) {
OpportunityHandlerController.onAfterUpdate(trigger.new, trigger.oldMap);
}
else if ( trigger.isDelete ) {
OpportunityHandlerController.onAfterDelete(trigger.old, trigger.oldMap);
}
}*/
    
    
}
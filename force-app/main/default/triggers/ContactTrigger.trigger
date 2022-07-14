trigger ContactTrigger on Contact(before insert,before delete) {
    if ( trigger.isBefore ) {
        if ( trigger.isInsert ) {
            ContactHandler.onBeforeInsert(trigger.new);
        } else if ( trigger.isDelete ) {
           ContactHandler.onBeforeDelete(trigger.old);
        }
    } 
}
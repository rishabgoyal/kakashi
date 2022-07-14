/**
 * @description       : 
 * @author            : RISHAB GOYAL
 * @group             : 
 * @last modified on  : 09-23-2020
 * @last modified by  : RISHAB GOYAL
 * Modifications Log 
 * Ver   Date         Author         Modification
 * 1.0   09-23-2020   RISHAB GOYAL   Initial Version
**/
global class SendBirthdayEmailBatch implements Database.Batchable < sObject > , Schedulable {

  global SendBirthdayEmailBatch() {

  }

  global Database.QueryLocator start(Database.BatchableContext BC) {
    String Empty = '';
    String query = 'Select id,Birthdate,Email from Contact where Birthdate !=  null and Email !=:Empty';
    return Database.getQueryLocator(query);
  }

  global void execute(Database.BatchableContext BC, List < Contact > scope) {
    List < Id > toSendBirthdayEmail = new List < Id > ();

    for (Contact con: scope) {

      if (con.Birthdate.day() == System.today().day() && con.Birthdate.month() == System.today().month()) {
        System.debug('Rishab Happy Birthday');
        toSendBirthdayEmail.add(con.Id);
      }
    }
    Messaging.MassEmailMessage mail = new Messaging.MassEmailMessage();
    mail.setTargetObjectIds(toSendBirthdayEmail);
    mail.setTemplateId('00X6F000001z0ztUAA');
    Messaging.sendEmail(new Messaging.MassEmailMessage[] {
      mail
    });

    //doOperation(toSendBirthdayEmail,'00X6F000001z0ztUAA');

    // update scope;
  }

  global void finish(Database.BatchableContext BC) {}
  global void execute(SchedulableContext sc) {
    SendBirthdayEmailBatch b = new SendBirthdayEmailBatch();
    database.executebatch(b);
  }
  global void doOperation() {

  }
}
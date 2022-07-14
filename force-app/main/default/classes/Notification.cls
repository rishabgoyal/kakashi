public without sharing class Notification implements Queueable, Database.AllowsCallouts { String message;

public Notification(String message)
{
    this.message = message;
}

public void execute(QueueableContext context)
{
    MyBellNotification.notifyCurrentUser(message);
}
}
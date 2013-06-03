function sendText() {
  var label = GmailApp.getUserLabelByName('Send text');
  var count = label.getUnreadCount();
  if (count > 0) {
    var threads = label.getThreads();
    var title = '';
    for(var i = 0; i < threads.length; i++) {
      var message = threads[i].getMessages()[0];
      title += message.getFrom();
      if(i < (threads.length - 1)) {
        title += '; ';
      }
    }
    var today = new Date();
    var yesterday = new Date(new Date().setDate(today.getDate() - 2));
    var events = CalendarApp.getDefaultCalendar().getEvents(yesterday, today)
    for (var i = 0; i < events.length; i++) {
      events[i].deleteEvent();
    }
    CalendarApp.getDefaultCalendar().setName('emails'+(new Date).getMilliseconds());
    CalendarApp.createEvent(title, 
                          new Date(today.getTime()+10*60000),
                          new Date(today.getTime()+11*60000));
  
    label.removeFromThreads(label.getThreads());
    
  }
}
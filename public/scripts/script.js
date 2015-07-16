$(function() {

  // compile underscore template
  var logTemplate = _.template($('#log-template').html());

  $.get('/api/logs', function(allLogs) {
    console.log(allLogs);
    
    _.each(allLogs, function(log, index) {
      console.log(log);
      
      var $logHtml = $(logTemplate(log));
      console.log($logHtml);
      $('#log-list').append($logHtml);
    });
  });

  $('#new-workout').on('submit', function(event) {
    event.preventDefault();
    console.log('submitting form!');
    
    var logType = $('#type').val();
    var logCalories = $('#calories').val();
    var logData = {type: logType, calories: logCalories};
    console.log(logData);
    
    $.post('/api/logs', logData, function(newLog) {
      console.log(newLog);
      var $logHtml = $(logTemplate(newLog));
      console.log($logHtml);
      $('#log-list').append($logHtml);
    });

    $(this)[0].reset();
    $('#type').focus();
  });

});
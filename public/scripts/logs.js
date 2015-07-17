$(function() {

  // `logsController` holds log functionality
  var logsController = {
    
    // compile underscore template
    template: _.template($('#log-template').html()),

    // get all logs
    all: function() {
      // AJAX call to server to GET /api/logs
      $.get('/api/logs', function(allLogs) {
        console.log(allLogs);
        
        // iterate through all logs
        _.each(allLogs, function(log, index) {
          console.log(log);
          
          // pass log through underscore template
          var $logHtml = $(logsController.template(log));
          console.log($logHtml);
          
          // append log HTML to page
          $('#log-list').append($logHtml);
        });
      });
    },

    // create new log
    create: function(typeData, caloriesData) {
      // define object with our log data
      var logData = {type: typeData, calories: caloriesData};
      
      // AJAX call to server to POST /api/logs
      $.post('/api/logs', logData, function(newLog) {
        console.log(newLog);
        
        // pass log through underscore template
        var $logHtml = $(logsController.template(newLog));
        console.log($logHtml);

        // append log HTML to page
        $('#log-list').append($logHtml);
      });
    },

    setupView: function() {
      // get all existing logs and render to page
      logsController.all();

      // add submit event on new log form
      $('#new-log').on('submit', function(event) {
        event.preventDefault();
        
        // grab log type and calories from form
        var logType = $('#type').val();
        var logCalories = $('#calories').val();

        // create new log
        logsController.create(logType, logCalories);

        // reset the form
        $(this)[0].reset();
      });
    }
  };

  logsController.setupView();

});
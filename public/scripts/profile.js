$(function() {

  // `usersController` holds users functionality
  var usersController = {

    // compile underscore templates
    template: _.template($('#user-template').html()),
    logTemplate: _.template($('#user-log-template').html()),

    // get current (logged-in) user
    show: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass user through profile template
        $userHtml = $(usersController.template({currentUser: user}));

        // append user HTML to page
        $('#show-user').append($userHtml);

        // iterate through user's logs
        _.each(user.logs, function(log, index) {
          console.log(log);

          // pass log through underscore template
          $logHtml = $(usersController.logTemplate(log));

          // append log HTML to page
          $('#user-log-list').append($logHtml);
        });
      });
    },

    // create new log for current user
    createLog: function(typeData, caloriesData) {
      // define object with our log data
      var logData = {type: typeData, calories: caloriesData};
      
      // AJAX call to server to POST /api/users/current/logs
      $.post('/api/users/current/logs', logData, function(newLog) {
        console.log(newLog);
        
        // pass log through underscore template
        var $logHtml = $(usersController.logTemplate(newLog));
        console.log($logHtml);

        // append log HTML to page
        $('#user-log-list').append($logHtml);
      });
    },

    setupView: function() {
      // get current user
      usersController.show();

      // add submit event on new log form
      $('#new-log').on('submit', function(event) {
        event.preventDefault();
        
        // grab log type and calories from form
        var logType = $('#type').val();
        var logCalories = $('#calories').val();

        // create new log
        usersController.createLog(logType, logCalories);

        // reset the form
        $(this)[0].reset();
      });
    }
  };

  usersController.setupView();

});
$(function() {

  // `usersController` holds users functionality
  var usersController = {

    // compile underscore template
    template: _.template($('#user-template').html()),

    // get current (logged-in) user
    show: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass user through underscore template
        $userHtml = $(usersController.template({currentUser: user}));

        // append user HTML to page
        $('#show-user').append($userHtml);
      });
    }
  };

  usersController.show();

});
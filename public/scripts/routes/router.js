var Router = Backbone.Router.extend({
  routes: {
    '': 'showList',
    'add': 'addLog'
  },

  showList: function() {
    App.AppView.showLogs();
  },

  addLog: function() {
    if (App.User && App.User.get('logged') === true) {
      App.AppView.showForm();
    } else {
      App.AppView.showLoginMessage();
    }
  }
});

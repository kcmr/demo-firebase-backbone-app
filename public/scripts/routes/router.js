var Router = Backbone.Router.extend({
  routes: {
    '': 'showList',
    'add': 'addLog'
  },

  showList: function() {
    App.AppView.showLogs();
  },

  addLog: function() {
    App.AppView.showForm();
  }
});

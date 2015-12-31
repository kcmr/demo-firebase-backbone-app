var Router = Backbone.Router.extend({
  routes: {
    '': 'showList',
    'add': 'addLog'
  },

  showList: function() {
    App.AppView.hideForm();
  },

  addLog: function() {
    App.AppView.showForm();
  }
});

var UserView = Backbone.View.extend({
  template: _.template($('#login').html()),
  
  container: $('#header'),
  
  events: {
    'click #google-login': 'login',
    'click #logout': 'logout',
    'click #add-log': 'add'
  },
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.attributes)).appendTo(this.container);
    return this;
  },
  
  login: function() {
    // ToDo: login
    console.log('login');
    this.model.set('logged', true);
    this.model.set('name', 'Kus');
  },
  
  logout: function(e) {
    // ToDo: logout
    e.preventDefault();
    this.model.set('logged', false);
  },
  
  setUser: function(data) {
    this.model.set('logged', true);
    this.model.set('name', data.name);
  },
  
  add: function(e) {
    e.preventDefault();
    App.Router.navigate('add', {trigger: true});
  }
});
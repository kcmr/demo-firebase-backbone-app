var UserView = Backbone.View.extend({
  template: _.template($('#login').html()),

  container: $('#header'),

  events: {
    'click #google-login': 'login',
    'click #logout': 'logout'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.fbRef = this.collection.firebase;
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes)).appendTo(this.container);
    return this;
  },

  login: function() {
    this.fbRef.authWithOAuthPopup('google', this.onAuthCallback.bind(this));
  },

  onAuthCallback: function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    this.model.set('logged', true);
    this.model.set('name', data.google.cachedUserProfile.given_name);
    this.model.set('picture', data.google.profileImageURL);
    this.model.set('uid', data.auth.uid);
  },

  logout: function(e) {
    e.preventDefault();
    this.fbRef.unauth();
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
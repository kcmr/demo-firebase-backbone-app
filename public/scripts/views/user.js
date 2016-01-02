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
    this.checkUserInSession();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes)).appendTo(this.container);
    return this;
  },

  checkUserInSession: function() {
    if (localStorage.getItem('firebase:session::trasteos')) {
      this.setUser(JSON.parse(localStorage.getItem('firebase:session::trasteos')));
    }
  },

  login: function() {
    this.fbRef.authWithOAuthPopup('google', this.onAuthCallback.bind(this));
  },

  logout: function(e) {
    e.preventDefault();
    this.fbRef.unauth();
    this.model.set('logged', false);
    this.model.destroy();
    App.User = null;
  },

  onAuthCallback: function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    if (data && data.google) {
      this.setUser(data);
    }
  },

  setUser: function(data) {
    this.model.set('logged', true);
    this.model.set('name', data.google.cachedUserProfile.given_name);
    this.model.set('picture', data.google.profileImageURL);
    this.model.set('uid', data.auth.uid);
  }
});
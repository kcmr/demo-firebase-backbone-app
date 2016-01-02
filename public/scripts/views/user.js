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
    if (!App.User) App.User = this.model;

    console.log(this.collection);

    this.fbRef.orderByChild('uid')
      .equalTo(data.auth.uid)
      .once('value', function(snapshot) {
        this.addUser(data, snapshot);
      }.bind(this));
  },

  addUser: function(data, snapshot) {
    if (!!snapshot.val()) return; // user exits

    this.fbRef.child(data.auth.uid).set({
      name: data.google.cachedUserProfile.given_name,
      uid: data.auth.uid,
      googleData: data.google
    });
  }
});

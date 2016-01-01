var User = Backbone.Model.extend({
  defaults: {
    logged: false,
    name: '',
    picture: '',
    uid: ''
  },

  initialize: function() {
    this.on('change:logged', function() {
      Backbone.trigger('user:logged-change');
    });
  }
});

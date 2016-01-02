var AppView = Backbone.View.extend({
  events: {
    'submit #log-form': 'addLog',
    'click #add-log': 'add'
  },

  initialize: function() {
    this.$form = $('#log-form');
    this.$logList = $('#log-list');
    this.$author = $('#author');
    this.$message = $('#message');

    Backbone.on('user:logged-in', this.onUserLogin);
    Backbone.on('user:logged-out', this.onUserLogout);
  },

  addLog: function(e) {
    e.preventDefault();

    var newLog = new Log({
      message: this.$message.val(),
      author: App.User.get('name'),
      uid: App.User.get('uid')
    });

    if (newLog.isValid()) {
      this.collection.add(newLog.toJSON());
      App.Router.navigate('', {trigger: true});
    } else {
      alert(newLog.validationError);
    }
  },

  add: function() {
    App.Router.navigate('add', {trigger: true});
  },

  showForm: function() {
    this.$form.show();
    this.$('#add-log').addClass('hidden');
    this.$message.focus();
    this.$logList.hide();
  },

  showLogs: function() {
    this.$form.hide();
    this.$('.login-msg').addClass('hidden');
    this.$('#add-log').toggleClass('hidden', !App.User.get('logged'));
    this.clearForm();
    this.$logList.show();
  },

  showLoginMessage: function() {
    App.Router.navigate('', {trigger: true});
    this.$('.login-msg').removeClass('hidden');
  },

  clearForm: function() {
    this.$message.val('');
    this.$author.val('').focus();
  },

  onUserLogin: function() {
    this.$('#add-log').removeClass('hidden');
    this.$('.login-msg').addClass('hidden');
  },

  onUserLogout: function() {
    App.Router.navigate('', {trigger: true});
    this.$('#add-log').addClass('hidden');
  }
});

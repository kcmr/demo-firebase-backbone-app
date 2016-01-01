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
    Backbone.on('user:logged-change', this.toggleAddLogButton);
  },

  addLog: function(e) {
    e.preventDefault();

    var newLog = new Log({
      message: this.$message.val(),
      author: this.$author.val() || 'Anónimo'
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
    this.toggleAddLogButton();
    this.clearForm();
    this.$logList.show();
  },

  clearForm: function() {
    this.$message.val('');
    this.$author.val('').focus();
  },

  toggleAddLogButton: function() {
    if (App.User.get('logged') === true) {
      this.$('#add-log').removeClass('hidden');
    } else {
      this.$('#add-log').addClass('hidden');
    }
  }
});

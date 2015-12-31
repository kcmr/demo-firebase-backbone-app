var AppView = Backbone.View.extend({
  events: {
    'submit #log-form': 'addLog',
    'click #add-log': 'add'
  },

  initialize: function() {
    console.log('AppView inicializada');
    this.$form = $('#log-form');
    this.$logList = $('#log-list');
    this.$author = $('#author');
    this.$message = $('#message');
  },

  addLog: function(e) {
    e.preventDefault();

    this.collection.add({
      message: this.$message.val(),
      author: this.$author.val()
    });

    App.Router.navigate('', {trigger: true});
  },

  // go to add page
  add: function() {
    App.Router.navigate('add', {trigger: true});
  },

  showForm: function() {
    this.$form.show();
    this.$author.focus();
    this.$logList.hide();
  },

  hideForm: function() {
    this.$form.hide();
    this.clearForm();
    this.$logList.show();
  },

  clearForm: function() {
    this.$message.val('');
    this.$author.val('').focus();
  }
});

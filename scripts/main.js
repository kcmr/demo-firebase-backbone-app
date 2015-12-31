// para poder usar estilo mustache en los templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

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

// Modelo Log
var Log = Backbone.Model.extend({});

// Collection Logs
var LogList = Backbone.Firebase.Collection.extend({
  model: Log,
  url: 'https://trasteos.firebaseio.com/logs'
});

// Vista item
var LogView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<q>{{message}}</q> <em>por <b>{{author}}</b></em> <button class="delete">Borrar</button>'),

  events: {
    'click .delete': 'deleteLog'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  deleteLog: function() {
    this.model.destroy();
  }
});

// Vista lista items
var ListView = Backbone.View.extend({
  el: $('#log-list'),

  initialize: function() {
    this.listenTo(App.LogListCollection, 'add', this.addLog);
    this.listenTo(App.LogListCollection, 'remove', this.render);
  },

  render: function() {
    this.$el.empty();

    this.collection.each(function(model) {
      this.addLog(model);
    }.bind(this));

    return this;
  },

  addLog: function(log) {
    this.$el.append(new LogView({
      model: log
    }).render().el);
  }
});

// Form View
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
  },

  addLog: function(e) {
    e.preventDefault();
    var data = {
      message: this.$message.val(),
      author: this.$author.val()
    };
    App.LogListCollection.add(data);
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
    $('#message').val('');
    $('#author').val('').focus();
  }
});


var App = {};
App.LogListCollection = new LogList();

// anade evento submit al form
App.AppView = new AppView({ el: $('body') });

// vista lista
App.ListView = new ListView({
  collection: App.LogListCollection
}).render();

App.Router = new Router;
Backbone.history.start({ pushState: true });


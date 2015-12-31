var ListView = Backbone.View.extend({
  el: $('#log-list'),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addLog);
    this.listenTo(this.collection, 'remove', this.render);
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

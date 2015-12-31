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
var Log = Backbone.Model.extend({
  defaults: {
    message: '',
    author: ''
  },

  validate: function(attrs) {
    if (!attrs.message) {
      return 'El mensaje de log es obligatorio';
    }
  }
});

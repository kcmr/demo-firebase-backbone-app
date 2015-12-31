// use {{}} instead of <% %> in templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var App = {
  AppView: null,
  ListView: null,
  Router: null
};

$(function() {
  App.AppView = new AppView({
    el: $('body'),
    collection: new LogList()
  });

  App.ListView = new ListView({
    collection: new LogList()
  });

  App.Router = new Router;
  Backbone.history.start({ pushState: true });
});

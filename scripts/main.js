// use {{}} instead of <% %> in templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var App = {
  LogListCollection: null,
  AppView: null,
  Router: null,
  ListView: null
};

$(function() {
  App.LogListCollection = new LogList();

  App.AppView = new AppView({
    el: $('body'),
    collection: App.LogListCollection
  });


  App.ListView = new ListView({
    collection: App.LogListCollection
  });

  App.Router = new Router;
  Backbone.history.start({ pushState: true });
});

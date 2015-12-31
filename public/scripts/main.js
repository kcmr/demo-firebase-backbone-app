// use {{}} instead of <% %> in templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var ENV = window.location.hostname.indexOf('trasteos.firebaseapp.com') !== -1 ? 'pro' : 'dev';

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

  if (ENV === 'pro') {
    Backbone.history.start({ pushState: true });
  } else {
    Backbone.history.start();
  }
});

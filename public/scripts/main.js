var ENV = window.location.hostname.indexOf('trasteos.firebaseapp.com') !== -1 ? 'pro' : 'dev';

var App = {};

$(function() {
  App.User = new User();
  App.AppView = new AppView({
    el: $('body'),
    collection: new LogList()
  });

  App.ListView = new ListView({
    collection: new LogList()
  });

  App.UserView = new UserView({
    collection: new Users(),
    model: App.User
  }).render();

  App.Router = new Router;

  if (ENV === 'pro') {
    Backbone.history.start({ pushState: true });
  } else {
    Backbone.history.start();
  }
});

var LogList = Backbone.Firebase.Collection.extend({
  model: Log,
  url: 'https://trasteos.firebaseio.com/logs'
});

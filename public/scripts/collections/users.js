var Users = Backbone.Firebase.Collection.extend({
  model: User,
  url: 'https://trasteos.firebaseio.com/users'
});
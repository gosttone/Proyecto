Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  //  waitOn: function() { return Meteor.subscribe('posts'); }
});


Router.route('/', {
  name: 'postsList',
  waitOn: function() {
    return Meteor.subscribe('posts')
  }
});

Router.route('/submit', {name: 'postSubmit'});

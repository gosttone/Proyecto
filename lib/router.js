Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  //  waitOn: function() { return Meteor.subscribe('posts'); }
});

//******************************

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub =  Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    //var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});


NewPostsController = PostsListController.extend({
  sort: {"date": -1, "_id": -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {likes: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});
//******************************

Router.route('/', {
  name:'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});

// Router.route('/', {
//   name: 'postsList',
//   waitOn: function() {
//     return Meteor.subscribe('posts')
//   }
// });

Router.route('/submit', {name: 'postSubmit'});

// Router.route('/Recent-Events', {
//   name: 'recentEvents',
//   waitOn: function() {
//     return Meteor.subscribe('posts')
//   }
// })

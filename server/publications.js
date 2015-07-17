Meteor.publish('posts',function(options) {
   check(options, {
     limit: Number
   });
  return Posts.find();
});

Meteor.publish('allPosts',function() {
  return Posts.find();
});

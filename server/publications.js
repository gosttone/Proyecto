Meteor.publish('posts',function(options) {
  check(options, {
    limit: Number
  });
  return Posts.find({},options);
});

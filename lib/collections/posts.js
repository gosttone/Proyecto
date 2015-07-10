Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});

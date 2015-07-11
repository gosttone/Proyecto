Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      likes: 0,
      likesPeople: [],
      goingPeople: [],
      going: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },
  likes: function(postId) {
    var post = Posts.findOne(postId);
    if (!post)
    throw new Meteor.Error ('invalid', 'Event not found');
    if (_.include(post.likesPeople, this.userId))
    throw new Meteor.Error ('Invalid', 'Already liked this event');

    Posts.update(post._id, {
      $addToSet: {likesPeople: this.userId},
      $inc: {likes: 1}
    })
  },
  going: function(postId) {
    var post = Posts.findOne(postId);
    if (!post)
    throw new Meteor.Error ('invalid', 'Event not found');
    if (_.include(post.goingPeople, this.userId))
    throw new Meteor.Error ('Invalid', 'Already going to this event');

    Posts.update(post._id, {
      $addToSet: {goingPeople: this.userId},
      $inc: {going: 1}
    })
  }
});

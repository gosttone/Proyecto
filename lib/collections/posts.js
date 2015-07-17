Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.profile.name,
      likes: 0,
      likesPeople: [],
      goingPeople: [],
      goingPeopleNames: [],
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
      $addToSet: {goingPeople: this.userId, goingPeopleNames: Meteor.user().profile.name},
      //$addToSet: {goingPeopleNames: Meteor.user().profile.name},
      $inc: {going: 1}
    })
  },
  aList: function(postId) {

  }
});

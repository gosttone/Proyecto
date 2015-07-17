var lastId;

Template.eventItem.helpers({
  likesEnable: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.likesPeople, userId)) {
      return '';
    } else {
      return 'disabled';
    }
  },
  goingEnable: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.goingPeople, userId)) {
      return '';
    } else {
      return 'disabled';
    }
  },
  extractPeople: function(Names, id) {

  },
});

Template.eventItem.events({
  'click .likes': function(e) {
    e.preventDefault();
    Meteor.call('likes', this._id);
  },
  'click .going': function(e) {
    e.preventDefault();
    Meteor.call('going', this._id);
  },
  'click .aList': function(e) {
    e.preventDefault();
    var Names = this.goingPeopleNames
    var postId = this._id

    if (postId === lastId) {
      $("#"+postId).slideToggle();
    }
    if (postId !== lastId) {
      $("#"+lastId).empty();
      for (var name in Names) {
        $("#"+postId).append("<p>"+ Names[name] +"</p>");
      }
      if ($("#"+lastId).html() !== "") {
        $("#"+lastId).slideToggle();
      }
      $("#"+postId).slideToggle();
    }
      lastId = postId;
  }
});

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
  extractPeople: function(Names) {
    Session.set('PeopleNames', Names);
  },
  insertPeople: function() {
    return Session.get('PeopleNames')
  }
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
    e.prevenDefault();
    Meteor.call('aList', this._id);
  }



});

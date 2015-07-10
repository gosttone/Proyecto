if (Posts.find().count() === 0) {
  Posts.insert({
    name: 'Meteor MeetUp',
    description: 'Learn to use Meteor',
    address: 'DevSchool',
    date: new Date (15/07/2015),
    price: 'Free'
    //domain: 'meteor.com'
  });
}

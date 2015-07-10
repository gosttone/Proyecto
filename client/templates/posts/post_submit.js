Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      name: $(e.target).find('[name=eventName]').val(),
      description: $(e.target).find('[name=eventDesc]').val(),
      address: $(e.target).find('[name=eventAddress]').val(),
      date: $(e.target).find('[name=eventDate]').val(),
      price: $(e.target).find('[name=eventPrice]').val()
    };
  Meteor.call('postInsert',post)
}
});

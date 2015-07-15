Template.registerHelper('convertToDate', function(fecha) {
    return moment(new Date(fecha+21600000)).format("MMM DD YY");
});

Template.registerHelper('convertToFree', function(precio) {
  if (precio > 0) {
      return "$ " + precio;
  }
  else {
    return "Free";
  }
});

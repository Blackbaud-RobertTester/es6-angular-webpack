function describeEach(description, cases, callback) {
  var index = 0;
  cases.forEach(function (value) {

    var descriptionEdit = description.replace(/\{value\}/gi, String(value));
    descriptionEdit = descriptionEdit.replace(/\{index\}/gi, index);
    describe(descriptionEdit, function () {
      callback(value, index);
    });
    index++;
  });
}
window.describeEach = describeEach;

var angular = require('angular');

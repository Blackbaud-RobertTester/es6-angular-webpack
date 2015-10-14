/**
 * Capitilization filter.
 * @module app.filters
 * @class capitalizeFilter
 * @constructor
 */

let capitalizeFilter = function () {

  /**
   * Filter text to capitalize the first letter of each word
   * @method capitalizeFirstLetters
   * @param text {String} The text to be formatted.
   */
  return function (text) {
    return text.toLowerCase().replace(/\b./g, a => {
      return a.toUpperCase();
    });
  };
};

export default capitalizeFilter;

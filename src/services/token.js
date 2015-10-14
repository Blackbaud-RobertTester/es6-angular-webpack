/**
 * Token check service. This will check the token stored in the cookie, and notify a user if the token is set to expire
 * @module app.services
 * @class token
 */

/**
 * @method tokenService
 * @param {Object} $cookies Angular Cookies service
 * @param {Object} $interval Angular version of setInterval
 * @param {Object} jwtHelper jwt Token helper for Angular. Provides helper methods for things like getting expiration of token
 * @return {Object} Returns a token object (isExpiring)
 *
 */
var tokenService = function ($cookies, $interval, jwtHelper, API_URL, $http) {
  /**
   * Token object which returns isExpiring flag
   * @type {Object}
   */
  let token = {
    isExpiring: false,
    renewing: false,
    renew: function () {
      token.renewing = true;
      $http.post(API_URL + '/token', '', {
        authorization: 'bearer ' + $cookies.get('token')
      }).success(function (newToken) {
        $cookies.put('token', newToken);
        token.renewing = false;
        token.isExpiring = false;
      }).error(function () {
        token.renewing = false;
      });
    }
  };

  /**
   * Minutes to Expiration check
   * @const MINUTES_TO_EXPIRATION
   * @type {Number}
   */
  const MINUTES_TO_EXPIRATION = 15;

  /**
   * @method  minutesToExpiration
   * @param  {String} tokenExpirationDate Date that token expires
   * @return {Number} minutesLeft Returns the minutes left before expiration
   * @private
   */
  function minutesToExpiration(tokenExpirationDate) {
    const MINUTE_IN_MS = 60 * 1000;
    const DAY_IN_MS = 60 * 60 * 24 * 1000;
    let tokenDate = new Date(tokenExpirationDate);
    let currentDate = Date.now();
    let minutesLeft = Math.floor(((tokenDate - currentDate) % DAY_IN_MS) / MINUTE_IN_MS);

    return minutesLeft;
  }

  /**
   * Method to initialize token check. This is self invoked
   * @method  init
   */
  (function init() {
    $interval(() => {
      let jwtToken = $cookies.get('token');
      let tokenExpiration = jwtHelper.getTokenExpirationDate(jwtToken);
      let minutes = minutesToExpiration(tokenExpiration);

      if (minutes > MINUTES_TO_EXPIRATION) {
        token.isExpiring = false;
      } else {
        token.isExpiring = true;
      }
    }, 60000);
  })();

  return token;
};



tokenService.$inject = ['$cookies', '$interval', 'jwtHelper', 'API_URL', '$http'];

export default tokenService;

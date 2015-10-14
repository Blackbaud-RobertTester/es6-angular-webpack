import './index';

describe('Service: token', function () {
  var token, $cookies, $httpBackend, $interval, requestHandler, cookiesMock;
  var jwtHelperMock = {
    getTokenExpirationDate: sinon.stub()
  };

  beforeEach(function () {
    cookiesMock = {
      get: sinon.stub(),
      put: sinon.stub()
    };
    angular.mock.module('hcsutil.services');
    angular.mock.module(function ($provide) {
      $provide.value('$cookies', cookiesMock);
      $provide.value('jwtHelper', jwtHelperMock);
      $provide.value('API_URL', 'http://localhost:3000');
    });

    inject(function ($injector, _$interval_, _$cookies_) {
      $cookies = _$cookies_;
      $httpBackend = $injector.get('$httpBackend');
      requestHandler = $httpBackend.when('POST', 'http://localhost:3000/token')
        .respond('reallyfakenewtoken');
      token = $injector.get('token');
      $interval = _$interval_;
    });

    cookiesMock.get.returns('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8');
  });

  describe('Defaults', function () {
    it('will return false before token is updated', function () {
      expect(token.isExpiring).toBe(false);
    });
  });

  describe('Not Expired', function () {
    beforeEach(function () {
      var tokenExpirationDate = new Date();
      tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 20);

      jwtHelperMock.getTokenExpirationDate.returns(tokenExpirationDate);
    });

    it('will return false if token time is above 15 minutes from expiration', function () {
      $interval.flush(60000);

      expect(token.isExpiring).toBe(false);
    });
  });

  describe('Expiring Token', function () {
    beforeEach(function () {
      var tokenExpirationDate = new Date();
      tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 11);

      jwtHelperMock.getTokenExpirationDate.returns(tokenExpirationDate);
    });

    it('will return truthy isExpiring flag if token is within 15 minutes from expiration', function () {
      $interval.flush(60000);

      expect(token.isExpiring).toBe(true);
    });
  });

  describe('Renew Token', function () {

    it('will set a new cookie with the refreshed token', () => {
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();
      $httpBackend.flush();

      expect(cookiesMock.put.getCall(0).args[0]).toBe('token');
      expect(cookiesMock.put.getCall(0).args[1]).toBe('reallyfakenewtoken');
    });

    it('will set the expiring flag to false after renewing', () => {
      token.isExpiring = true;
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();
      $httpBackend.flush();

      expect(token.isExpiring).toBe(false);
    });

    it('will post to /token to renew', () => {
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();

      $httpBackend.flush();
    });

    it('will set "renewing" to false initially', () => {
      expect(token.renewing).toBe(false);
    });

    it('will set "renewing" to true during a renew', () => {
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();

      expect(token.renewing).toBe(true);

      $httpBackend.flush();
    });

    it('will set "renewing" to false after a renew', () => {
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();
      $httpBackend.flush();

      expect(token.renewing).toBe(false);
    });

    it('will set "renewing" to false after a renew even after encountering an error', () => {
      requestHandler.respond(500, 'Server Error');
      $httpBackend.expectPOST('http://localhost:3000/token');

      token.renew();
      $httpBackend.flush();

      expect(token.renewing).toBe(false);
    });


  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});

import token from './token';
import 'angular-jwt';

let servicesModule = angular.module('hcsutil.services', ['angular-jwt']);

servicesModule.service('token', token);

export default servicesModule;

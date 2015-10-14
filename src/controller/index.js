import blahController from './blahController';

let controllerModule = angular.module('app.controller', []);

controllerModule
    .controller('blahController', blahController);

export default controllerModule;
import capitalizeFilter from './capitalizeFilter';

let filtersModule = angular.module('app.filters', []);

filtersModule
  .filter('capitalize', capitalizeFilter);

export default filtersModule;

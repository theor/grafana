/*

  ## MenuLinks

*/
define([
  'angular',
  'app',
  'underscore',
],
function (angular, app, _) {
  'use strict';

  var module = angular.module('kibana.panels.menulinks', []);
  app.useModule(module);

  module.controller('MenuLinksCtrl', function($scope) {
    $scope.panelMeta = {
      status  : "Stable",
      description : "Panel for menu dropdown links"
    };

    // Set and populate defaults
    var _d = {
      items: []
    };

    _.defaults($scope.panel,_d);

    $scope.init = function() {

    };

  });
});

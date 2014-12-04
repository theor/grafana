define([
  'angular',
  'app',
  'lodash',
  'require',
  'components/panelmeta',

],
function (angular, app, _, require, PanelMeta) {
  'use strict';

  var module = angular.module('grafana.panels.custom', []);
  app.useModule(module);

  module.controller('CustomPanelCtrl', function($scope, panelSrv) {

    $scope.panelMeta = new PanelMeta({
      description : "Example plugin panel",
    });

    // set and populate defaults
    var _d = {
    };

    _.defaults($scope.panel, _d);

    $scope.init = function() {
      panelSrv.init($scope);
    };

    $scope.init();
  });
});

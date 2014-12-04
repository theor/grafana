define([
  'angular',
  'lodash',
  'kbn',
  'moment'
],
function (angular, _, kbn) {
  'use strict';

  var module = angular.module('grafana.services');

  module.factory('CustomDatasource', function($q, $http) {

    // the datasource object passed to constructor
    // is the same defined in config.js
    function CustomDatasource(datasource) {
      this.name = datasource.name;
      this.supportMetrics = true;
      this.url = datasource.url;
      this.editorSrc = 'plugins/telemetry_editor.html';
    }

    CustomDatasource.prototype._request = function( /* method, */ url, data) {
      var options = {
        url: this.url + "/" + url,
        method: 'GET',// method,
        data: data
      };

      if (this.basicAuth) {
        options.withCredentials = true;
        options.headers = {
          "Authorization": "Basic " + this.basicAuth
        };
      }

      return $http(options);
    };

    CustomDatasource.prototype.query = function(options) {
      // get from & to in seconds
      console.log(options);
      var from = kbn.parseDate(options.range.from).getTime() / 1000;
      var to = kbn.parseDate(options.range.to).getTime() / 1000;


      return this._request('/', null).then(function(results){
        var data = _.map(results.data, function(x) {return [x["available Memory"], moment.utc(x["start Time"])]});
        console.log(results.data[0]);
        console.log(data[0]);
        // console.log(data);
        return {data:[{target:"asd", datapoints:data}]};
      });
      // var series = [];
      // var stepInSeconds = (to - from) / options.maxDataPoints;

      // for (var i = 0; i < 3; i++) {
      //   var walker = Math.random() * 100;
      //   var time = from;
      //   var timeSeries = {
      //     target: "Series " + i,
      //     datapoints: []
      //   };

      //   for (var j = 0; j < options.maxDataPoints; j++) {
      //     timeSeries.datapoints[j] = [walker, moment.unix(time)];
      //     walker += Math.random() - 0.5;
      //     time += stepInSeconds;
      //   }

      //   series.push(timeSeries);
      // }

      // return $q.when({data: series });

    };

    return CustomDatasource;

  });

});

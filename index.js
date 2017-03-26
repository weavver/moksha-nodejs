
var async = require('async');
var sql = require('mssql');

var express = require('express');
var app = express();
var needle = require('needle');
var jsdom = require("jsdom");

exports.init = function(global) {

     if (!global.unitsets)
          global.unitsets = [];

     async.each(global.files, function (filePath, callback) {

          var unitset = require(filePath);
          unitset.init(global);

          callback();
     });


     express.static.mime.define({'text/css': ['css']});
     express.static.mime.define({'text/json': ['json']});

     app.use(express.static(__dirname + '/public'));
     app.use('/bower_components', express.static(__dirname + '/bower_components'));

     //app.get('/', function (req, res) {
     //     res.send('Hello World!');
     //});


     var server = app.listen(global.port, function () {
          var host = server.address().address;
          var port = server.address().port;

          console.log('Example app listening at http://%s:%s', host, port);
     });

     app.get('/data', function (req, res) {
          res.send(global.unitsets);
     });

     function extend(target) {
          var sources = [].slice.call(arguments, 1);
          sources.forEach(function (source) {
               for (var prop in source) {
                    target[prop] = source[prop];
               }
          });
          return target;
     }

     function callBackWithATimeout(callback, timeout) {
          var run, timer;
          run = function () {
               console.log('run called');
               if (timer) {
                    clearTimeout(timer);
                    timer = null;
                    callback.apply(this, arguments);
               }
          };
          timer = setTimeout(run, timeout, "timeout");
          return run;
     }



     var CronJob = require('cron').CronJob;

//     function runUnits() {
          global.unitsets.forEach(function (unitset, index, array) {
               unitset.items.forEach(function (unit, index2, array2) {
                    unit.fails = 0;
                    unit.passes = 0;
                    var CronJob = require('cron').CronJob;
                    var cronSettings = {
                         cronTime: unit.interval,
                         onTick: function() {
                              unit.y = callBackWithATimeout(function (error) {
                                   console.log('Test_end callback triggered for ' + unit.name);
                                   unit.isRunning = false;
                                   var now = new Date();
                                   var diff = now - unit.startTime;
                                   //unit.avgRuntime = diff;
                                   unit.lastRunDuration = diff;

                                   if (error == 'timeout') {
                                        console.log('timed out');
                                        unit.status = 'Fail';
                                        unit.log = 'timed out';
                                        unit.fails += 1;
                                        unit.lastFail = now;
                                   }
                                   else if (error) {
                                        console.log('processing error');
                                        console.log(error);
                                        unit.status = 'Fail';
                                        unit.log = error + ' ' + JSON.stringify(error);
                                        unit.fails += 1;
                                        unit.lastFail = now;
                                   }
                                   else {
                                        unit.status = 'Pass';
                                        unit.passes += 1;
                                   }

                              }, 30000);


                              var now = new Date();
                              unit.lastRun = now;
                              unit.isRunning = true;
                              unit.startTime = now.getTime();
                              console.log('Running code for ' + unit.name);
                              try {
                                   unit.log = '';
                                   unit.code(unit, unit.y);
                              }
                              catch (err) {
                                   console.log('caught error');
                                   unit.y(err);
                              }
                         },
                         start: true,
                         timeZone: 'America/Los_Angeles',
                         context: null
                    };
                    var job = new CronJob(cronSettings);
                    // we do this to get the first test run going right away!
                    cronSettings.onTick();
               });
          });
         //console.log('done with all sets');
         //setTimeout(runUnits, 5000);
     //}
     //
     //setTimeout(runUnits, 1000);
};
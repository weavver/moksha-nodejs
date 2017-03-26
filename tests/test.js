
var moksha = require('../index.js');

var global = {
     port: 3080,
     files: ['./tests/example1.js',
          './tests/example2.js']
};


//
//function callBackWithATimeout(callback, timeout) {
//     var run, timer;
//     run = function () {
//          if (timer) {
//               clearTimeout(timer);
//               timer = null;
//               callback.apply(this, arguments);
//          }
//     };
//     timer = setTimeout(run, timeout, "timeout2");
//     return run;
//}
//
//
//function test(arguments, callback) {
//     console.log('in test');
//     //callback(arguments);
//}
//
//test({"test": "asdf"}, callBackWithATimeout(function (arguments) {
//
//     console.log('done');
//     console.log(arguments);
//
//}, 5000));

moksha.init(global);

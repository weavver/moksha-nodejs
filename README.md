

Weavver Moksha for NodeJS is a unit testing harness that runs tests constantly on the server while providing a nice
web front end to view the test status via express and angularjs

Check out the demo here: https://demo.weavver.com/moksha/

To load the harness into your project do:
```
npm install weavver-moksha
```

then in your app.js:

```
var moksha = require('weavver-moksha');
var global = {
     port: 3080,
     files: ['./tests/example1.js',
          './tests/example2.js']
};
moksha.init(global);
```


your test files are very flexible, moksha passes in a "global" object that gives you access to its internals.

use the global object to insert tests into the queue:

```
// example1.js:
exports.init = function (global) {

     console.log('initializing test 1');

     global.unitsets.push({
          name: 'testset1',
          items: [{
               name: 'dividebyzero',
               description: 'trying to divide by zero',
               interval: '* * * * *', // use cron syntax
               tags: '', // not used for now
               code: function (item, callback) {
                    console.log('test');
                    callback(); // when you're done and the test passes successfully
                    // otherwise throw a javascript error for a failure
               }
          }]
     });

};
```
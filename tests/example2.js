

exports.init = function (global) {

     console.log('initializing test 2');

     global.unitsets.push({
          name: 'testset2',
          items: [{
               name: 'f: should_timeout',
               description: 'not calling the callback to test timing out',
               interval: '* * * * *',
               tags: '',
               code: function (item, callback) {
                    //console.log('test');

                    //callback();
               }
          },
          {
               name: 's: should_error',
               description: 'throwing a js error',
               interval: '* * * * *',
               tags: '',
               code: function (item, callback) {
                    throw new Error("Something bad happened.");
               }
          },
          {
               name: 'a: should_pass',
               description: 'used for testing sorting',
               interval: '* * * * *',
               tags: '',
               code: function (item, callback) {
                    callback();
               }
          },
          {
               name: 'c: should_pass',
               description: 'used for testing sorting',
               interval: '* * * * *',
               tags: '',
               code: function (item, callback) {
                    callback();
               }
          },
          {
               name: 'g: should_callback_with_error',
               description: 'calling back with an error',
               interval: '* * * * *',
               tags: '',
               code: function (item, callback) {
                    callback('this is my error');
               }
          }]
     });
};
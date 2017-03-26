

exports.init = function (global) {

     console.log('initializing test 1');


     global.unitsets.push({
          name: 'z ordering test',
          items: [{
               name: 'should_pass',
               description: 'actually calling the callback',
               interval: '*/2 * * * *',
               tags: '',
               code: function (item, callback) {
                    //console.log('test');


                    setTimeout(function () {
                         item.log  = 'this is a very very very very long log message - it is so long it wraps the browser screen around and around, it just keeps going and going and going and going and it never really stops or does it, i guess it will at some point, but not yet! okay maybe now..';
                         callback();
                    }, 400);
                    //callback();
               }
          }]
     });


     global.unitsets.push({
          name: 'testset1',
          items: [{
               name: 'should_pass',
               description: 'actually calling the callback',
               interval: '*/2 * * * *',
               tags: '',
               code: function (item, callback) {
                    //console.log('test');


                    setTimeout(function () {
                         item.log  = 'this is a very very very very long log message - it is so long it wraps the browser screen around and around, it just keeps going and going and going and going and it never really stops or does it, i guess it will at some point, but not yet! okay maybe now..';
                         callback();
                    }, 400);
                    //callback();
               }
          }]
     });

};
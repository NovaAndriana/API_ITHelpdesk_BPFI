'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  // if (values.length < 1){
  //   res.json('Error');
  //   res.end();
  // }else{
  //   res.json(data);
  // res.end();
  // }
};
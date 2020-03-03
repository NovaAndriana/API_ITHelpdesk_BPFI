 'use strict';
 var response = require('./res');
 var connection = require('./conn');
 var request2 = require('request');
 var uniqid = require('uniqid');
 var keypass ='d9e3402e2918b78916e473f2f38c539bc2a3e5cd2c3101ba860a69cd2c84f7f4'; //SHA256
 var today = new Date();
 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 var dateTime = date+' '+time;


     exports.index = function(req, res) {
     response.ok("Hello from the Node JS RESTful side BPFI IT Helpdesk!", res)
 };

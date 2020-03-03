'use strict';
module.exports = function(app) {
    var todoList = require('./controller');
    const internalIp = require('internal-ip');
    var response = require('./res');
    var connection = require('./conn');
    // const jwt = require('jsonwebtoken');
    // var keypass ='696064218106A1AC8E727A2E0BDDB15BC814E18D651FEEFB946B210850E4F1C9';
    // var crypto = require('crypto');
    // var hash = require('hash.js');
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
		    
		
        app.route('/')
        .get(todoList.index); 
        //GET API
        app.get("/api/test", function(req , res){
          var cars = ["Saab", "Volvo", "BMW"];
          console.log(cars);
          res.status(200).json({
                         response_code: 200,
                         response_desc: 'Success',
                         data: cars
           })
        });


        //POST API
        app.post("/api/login", function(req , res){
        //var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
        var request = new connection.Request();
        var sql = "exec [BPFKredit_GetLogin] @userid = '" + req.body.p_Username +"'";
        request.query(sql, function (error, rows, fields){
          if(error){
                  res.status(400).json({
                  response_code: 400,
                  response_desc: 'Error while load data.'//,
                  //data: rows.recordset[]
                  })
          } else {
              //console.log(date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds)
              console.log(rows.recordset);
              //console.log(test);
              res.status(200).json({
              response_code: 200,
              response_desc: 'Success',
              data: rows.recordset
          });
                      }
          });
});

  };
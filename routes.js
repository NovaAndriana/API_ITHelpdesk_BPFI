'use strict';
module.exports = function(app) {
  var todoList = require('./controller');
  const internalIp = require('internal-ip');
  var response = require('./res');
  var connection = require('./conn');
  const jwt = require('jsonwebtoken');
  var keypass ='3DAAD6A46582BAFB0E00FFB45C4259A3EE0C61AB3C6758D7BC8E8A690FEC7685'; //SHA256 ( BPFKredit2019 )
  const fetch = require('node-fetch')
  var crypto = require('crypto');
  var hash = require('hash.js');
		    
    
    app.route('/api/ithelpdesk/login/:p_UserId/:p_Password/:p_keypass')
    .get(todoList.bpfkredit_sso);

        
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
          var userId = req.body.p_UserId;
          var Password = req.body.p_Password;
          var testlog = req.params.p_UserId + "," + req.params.p_Password + "'";
          // console.log("KEYPAS: ", req.body.p_keypass);
          // if (keypass===req.body.p_keypass && typeof userId=== 'string')
          // {    
              let status='false';
              fetch('http://localhost:8959/api/MsUser/'+req.body.p_UserId+'/'+req.body.p_Password)
              .then(response => response.json())
              .then(data => {
                // console.log(data); // Prints result from `response.json()` in getRequest
                status = data.status;
                console.log(testlog)
                console.log("test:", status)
                // res.status(200).json({
                //    data: data
                // }) 
                
      
                if (status == true){
                    console.log("test2:", status)
                    var request = new connection.Request();
                    var sql = "exec [BPFKredit_GetLogin] @userid='" + req.body.p_UserId + "'";
                    request.query(sql, function (error, rows, fields){
                    if(error){
                      res.status(400).json({
                        response_code: 400,
                        response_desc: 'Error while load data.',
                        data: rows.recordset
                      })
                    }else{
                        //console.log(date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds)
                        console.log(rows.recordset);
                        // console.log(dateTime);
                        res.status(200).json({
                          response_code: 200,
                          response_desc: 'Success',            
                          data: rows.recordset              
                        });
                      }
                    });
              }else{
                res.status(400).json({
                    response_code: 400,
                    response_desc: 'Error while load data.',
                    Status: 'False'
                    //data: rows.recordset
                })
              }
            })       
            .catch(error => 
              console.error(error)
            )
               
            // }else{
            //     console.log("Keypass invalid...")
            //       res.status(401).json({
            //         response_code: 401,
            //         response_desc: 'Invalid Passkey',
            //         // data: rows.recordsets
            //       })
            //   }
          });

  };
 'use strict';
 var response = require('./res');
 var connection = require('./conn');
 var request2 = require('request');
 var uniqid = require('uniqid');
 var keypass ='3DAAD6A46582BAFB0E00FFB45C4259A3EE0C61AB3C6758D7BC8E8A690FEC7685'; //SHA256 ( BPFKredit2019 )
 var dateFormat = require('dateformat');
 var normalizedDate = new Date(Date.now()).toISOString();
 const internalIp = require('internal-ip');
 const fetch = require('node-fetch')
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;


 exports.bpfkredit_sso = function(req, res) {
    var userId = req.params.p_UserId;
    var Password = req.params.p_Password;
    console.log("KEYPAS: ", req.params.p_keypass);
    if (keypass===req.params.p_keypass && typeof userId=== 'string')
    {   var testlog = req.params.p_UserId + "," + req.params.p_Password + "'";
        let status='false';
        fetch('http://localhost:8959/api/MsUser/'+userId+'/'+Password)
        .then(response => response.json())
        .then(data => {
          // console.log(data); // Prints result from `response.json()` in getRequest
          status = data.status;
          console.log("test:", status)
          //console.log(testlog)
          // res.status(200).json({
          //    data: data
          // }) 
          

          if (status == true){
              console.log("test2:", status)
              var request = new connection.Request();
              var sql = "exec [BPFKredit_GetLogin] @userid='" + userId + "'";
              request.query(sql, function (error, rows, fields){
              if(error){
                  
                //console.log(testlog)
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
            
          //console.log(userId,Password)
          res.status(400).json({
              response_code: 400,
              response_desc: 'Error while load data.',
              Status: 'False'
              //data: rows.recordset
          })
        }
      })       
      .catch(error => console.error(error))
         
      }else{
          console.log("Keypass invalid...")
            res.status(401).json({
              response_code: 401,
              response_desc: 'Invalid Passkey',
              // data: rows.recordsets
            })
        }
      };

     exports.index = function(req, res) {
     response.ok("Hello from the Node JS RESTful side BPFI IT Helpdesk!", res)
 };

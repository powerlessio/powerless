/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


AWS.config.update({ region: process.env.REGION })

/**********************
 * Example get method *
 **********************/

app.get('/notes', function(req, res) {
  // Add your code here
  // Return the API Gateway event and query string parameters for example
  res.json(req.apiGateway.event);
});

app.get('/notes/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', req: JSON.stringify(req)});
});

/****************************
* Example post method *
****************************/

app.post('/notes', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', req: JSON.stringify(req)})
});

app.post('/notes/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', req: JSON.stringify(req)})
});

/****************************
* Example post method *
****************************/

app.put('/notes', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', req: JSON.stringify(req))
});

app.put('/notes/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', req: JSON.stringify(req)})
});

/****************************
* Example delete method *
****************************/

app.delete('/notes', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', req: JSON.stringify(req)});
});

app.delete('/notes/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', req: JSON.stringify(req)});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

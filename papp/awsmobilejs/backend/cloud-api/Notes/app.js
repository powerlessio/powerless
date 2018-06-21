/*
* Powerless middleware running in AWS service
* Basically through cloud API Gateway to use all other services
*/

var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const uuid = require('node-uuid');

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

// define USERID if not authorized use this const to replace
const UNAUTH = 'UNAUTH';

// MOBILE_HUB_DYNAMIC_PREFIX is defined by API
// currently it is set as "powerlessaws-mobilehub-1242987544"
const notesTable = `${process.env.MOBILE_HUB_DYNAMIC_PREFIX}-notes`;

// initialize a DB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: process.env.REGION })

/**********************
 * A get method to return all notes
 **********************/
app.get('/items', function(req, res) {
  // performs a DynamoDB Query operation to extract all records
  // for the cognitoIdentityId in the table
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  console.log('Query all items for current user ID: ' + userId);
  dynamoDb.query({
    TableName: notesTable,
    KeyConditions: {
      userId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [userId],
      },
    },
  },
  (err, data) => {
    if (err) {
      console.log('Error in querying DB: ' + err);

      // return a status code as 500 to indicate failure
      res.status(500).json({
        message: 'Could not load notes...',
      }).end();
    } else {
      // set data items to response
      res.json(data.Items).end();
    }
  });
});

app.get('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* A post method to add a new note into DB
****************************/

app.post('/items', function(req, res) {
  // apply mandatory check to make sure required fields are set
  if (!req.body.noteTitle) {
    const errMsg = 'You must specify a note title: ' + JSON.stringify(req.body);
    res.status(400).json({
      message: errMsg
    }).end();
    return;
  }

  const note = Object.assign({}, req.body);

  // remove empty field before store
  Object.keys(note).forEach(key => (note[key] === '' && delete note[key]));

  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  console.log('Query all items for current user ID: ' + userId);

  // assign user ID to the note object
  note.userId = userId;

  // generate a time based unique ID
  note.noteId = uuid.v1();

  dynamoDb.put({
    TableName: notesTable,
    Item: note,
  },
  (err, data) => {
    if (err) {
      console.log('Error while adding a note: ' + err);
      const errMsg = 'Could not insert note: ' + JSON.stringify(note);
      res.status(500).json({
        message: errMsg
      }).end();
    } else {
      // cool - we saved it and return the object to client
      res.json(note).end();
    }
  });
});

app.post('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example post method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

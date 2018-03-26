import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)
var bodyParser = require('body-parser');
// app.use("/upload" , express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var expressValidator = require('express-validator');
app.use(expressValidator());
// app.use("/upload" ,express.static("upload"));
var userController=require('./api/user/router/routes.js');
app.use(userController);

// var config = require("./api/config");
// mongoose.connect('mongodb://localhost/register');
mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise
const fileUpload = require('express-fileupload');
// const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload());
setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})
// app.listen(3000,function()
// {
// console.log("we are listening at port 3000");
// })
export default app

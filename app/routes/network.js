const express = require('express');
const router = express.Router();
const responseUtils = require('../utils/response.utils');
const {name} = require("../package.json");
const {port} = require('../config.json');

router.get('/', function(req,res){ 
    responseUtils.success(req,res,`Module ${name} is up at ${port}`,200);
});

router.get('/ping', function(req,res){ 
    responseUtils.success(req,res,'Pong', 200);
});

router.post('/test/body', function(req,res){ 
    if(req.body.error) {
        responseUtils.errors(req,res, {statusCode:500, errorCode: "Internal Error", errorData: "Contact administrator"})
    } else {
        responseUtils.success(req,res,req.body);
    }
});

router.get('/test/query', function(req,res){ 
    responseUtils.success(req,res,req.query);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const responseUtils = require('../utils/response.utils');
const {name} = require("../package.json");
const {port} = require('../config.json');
const expeditionService = require("../services/expedition.service");
const robotsService = require("../services/robot.service");

router.get('/', function(req,res){ 
    responseUtils.success(req,res,`Module ${name} is up at ${port}`,200);
});

router.get('/ping', function(req,res){ 
    responseUtils.success(req,res,'Pong', 200);
});

router.post('/test/body', function(req,res){ 
    if(req.body.error) {
        responseUtils.errors(res, {errorCode: "Internal Error", errorData: "Contact administrator"})
    } else {
        responseUtils.success(req,res,req.body);
    }
});

router.post('/expeditions', function(req,res){ 
    let { terrain, robots } = req.body;
    try {
        expeditionService.verifyTerrain(terrain);
        robotsService.verifyRobotsAndDirections(robots, terrain);
        terrain = new expeditionService.Terrain(terrain.x,terrain.y);
        let robotsStatus = []
        robots.forEach(robot => {
            let directions = robot.directions
            robot = new robotsService.Robot(robot.startingPoint.x, robot.startingPoint.y, robot.startingPoint.orientation)
            robotsStatus.push(robotsService.executeDirections(robot, directions, terrain));
        });
        return responseUtils.success(req,res, robotsStatus);
    } catch (error) {
        //Basic error handling trough console
        console.log(error);
        return responseUtils.errors(res, error, error.statusCode)
    }
});

router.get('/test/query', function(req,res){ 
    responseUtils.success(req,res,req.query);
});

module.exports = router;

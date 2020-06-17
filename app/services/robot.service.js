const cardinals = ["N", "E", "S", "W"]

exports.verifyRobotsAndDirections = (robots, terrain) => {
    if(!robots || robots.length == 0) {
        throw {statusCode:400, errorCode: "Verify Params Error", errorData: "Please add at least a robot to start an expedition"}
    }
    let invalidRobots = []
    for(let i = 0; i < robots.length; i++){
        let robot = robots[i]
        let startingPointIsSet = !!robot.startingPoint && (!!robot.startingPoint.x || Number(robot.startingPoint.x) == 0)  
            && (!!robot.startingPoint.y || Number(robot.startingPoint.y) == 0)  && !!robot.startingPoint.orientation;
        let startingPointIsValid = !isNaN(robot.startingPoint.x) && !isNaN(robot.startingPoint.y);
        let robotIsInsideTerrain = robot.startingPoint.x <= terrain.x && robot.startingPoint.y <= terrain.y;
        let orientationIsValid = cardinals.includes(robot.startingPoint.orientation);
        let directionsAreValid = !!robot.directions && robot.directions.length <= 100 && checkDirectionsParameters(robot.directions);
        if(!startingPointIsSet || !startingPointIsValid || !robotIsInsideTerrain || !orientationIsValid || !directionsAreValid) {
            invalidRobots.push({statusCode:400, errorCode: "Verify Params Error", errorData: `Robot number ${i +1} is invalid`})
        }
    }
    if(invalidRobots.length > 0) {
        throw invalidRobots;
    }
    return true;
}

function checkDirectionsParameters(directions) {
    const validDirections = ["F", "L", "R"]
    return directions.every(direction => validDirections.includes(direction))
}

exports.Robot = class Robot {
    constructor(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation
        this.isLost = false
    }
}

exports.executeDirections = (robot, directions, terrain) => {
    for(let i = 0; i < directions.length; i++) {
        if(robot.isLost){
            break;
        }
        let direction = directions[i]
        if(direction == "F") {
            robot = moveRobot(robot, terrain)
        }else {
            robot = turnRobot(robot, direction)
        }
    }
    return robot;
}

function turnRobot(robot, instruction) {
    let newOrientation = cardinals.findIndex(cardinal => cardinal == robot.orientation)
    if (instruction === 'L') { 
        newOrientation = (newOrientation + 4 - 1) % 4;
    } else { 
        newOrientation = (newOrientation + 1) % 4;
    }
    robot.orientation = cardinals[newOrientation];
    return robot;
}

function checkRobotScent(robot, terrain){
    let scent = false;
    for(let i=0; i < terrain.robotScents.length; i++) {
        if(terrain.robotScents[i][0] == robot.x && terrain.robotScents[i][1] == robot.y) {
            scent = true;
            break;
        }
    }
    return scent;
}

function moveRobot(robot, terrain) {
    robotScents = terrain.robotScents 
    switch(robot.orientation) {
        case "N":
            if(robot.y == terrain.y) {
                if(checkRobotScent(robot, terrain)){
                    return robot;
                }else {
                    robot.isLost = true;
                    terrain.robotScents.push([robot.x,robot.y]);
                }
            } else {
                robot.y ++;
            }
            return robot;
        case "S":
            if(robot.y == 0) {
                robot.isLost = true
            } else {
                robot.y --;
            }
            return robot;
        case "E":
            if(robot.x == terrain.x) {
                if(checkRobotScent(robot, terrain)){
                    return robot;
                }else {
                    robot.isLost = true;
                    terrain.robotScents.push([robot.x,robot.y]);
                }
            } else {
                robot.x ++;
            }
            return robot;
        case "W":
            if(robot.x == 0) {
                robot.isLost = true
            } else {
                robot.x --;
            }
            return robot;
    }
}
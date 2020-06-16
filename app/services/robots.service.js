const cardinals = ["N", "E", "S", "W"]

exports.verifyRobotsAndDirections = (robots, terrain) => {
    if(!robots || robots.length == 0) {
        throw {statusCode:400, errorCode: "Verify Params Error", errorData: "Please add at least a robot to start an expedition"}
    }
    let invalidRobots = []
    for(let i = 0; i < robots.length; i++){
        let robot = robots[i]
        let startingPointIsSet = !!robot.startingPoint && robot.startingPoint.x && !!robot.startingPoint.y && !!robot.startingPoint.orientation
        let startingPointIsValid = !isNaN(robot.startingPoint.x) && !isNaN(robot.startingPoint.y);
        let robotIsInsideTerrain = robot.startingPoint.x <= terrain.x && robot.startingPoint.y <= terrain.y;
        let orientationIsValid = cardinals.includes(robot.startingPoint.orientation);
        let directionsAreValid = !!robot.directions && robot.directions.length <= 100;
        if(!startingPointIsSet || !startingPointIsValid || !robotIsInsideTerrain || !orientationIsValid || !directionsAreValid) {
            invalidRobots.push({statusCode:400, errorCode: "Verify Params Error", errorData: `Robot number ${i +1} is invalid`})
        }
    }
    if(invalidRobots.length > 0) {
        throw invalidRobots;
    }
    return true;
}

exports.createRobot = class Robot {
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

function moveRobot(robot, terrain) {
    switch(robot.orientation) {
        case "N":
            if(robot.y == terrain.y) {
                robot.isLost = true;
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
                robot.isLost = true
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
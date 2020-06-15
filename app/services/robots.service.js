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
        console.log(direction)
        if(direction == "F") {
            robot = moveRobot(robot, terrain)
        }else {
            robot = turnRobot(robot, direction)
        }
    }
    return robot;
}

function turnRobot(robot, instruction) {
    let cardinals = ["N", "E", "S", "W"]
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
const robotsService = require('../../services/robot.service');

const validRobot = {
    "startingPoint": {
        "x": 1,
        "y": 1,
        "orientation": "E"
    },
    "directions": ["R","F","R","F","R","F","R","F"]
}

const invalidRobot = {
    "startingPoint": {
        "x": "NaN",
        "y": 1,
        "orientation": "E"
    },
    "directions": ["R","F","R","F","R","F","R","F"]
}

const invalidRobot3 = {
    "startingPoint": {
        "x": "NaN",
        "y": 1,
        "orientation": "E"
    },
    "directions": ["R","F","K","F","R","T","R","F"]
}

const invalidRobot2 = {
    "startingPoint": {
        "x": 2,
        "y": 1,
        "orientation": "P"
    },
    "directions": ["R","F","R","F","R","F","R","F"]
}

const terrain = {
    x: 5,
    y: 3
}

const insideDirections = ["R","F","R","F","R","F","R","F"];
const lostDirections = ["R","F","R","F","R","F","R","F", "F", "F", "F", "F", "F"];
const robot = new robotsService.createRobot(1, 1, "E");
console.log(robot)

describe('Verify Robots: Verify robots and directions are valid', () => {
    test('The service recieves an undefined array of robots and the terrain to check them', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections(undefined, terrain);
        }).toThrow();
    });

    test('Empty array of robots', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections([], terrain);
        }).toThrow();
    });

    test('Invalid robot: coordinate is not a number', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections([invalidRobot], terrain);
        }).toThrow();
    });

    test('Invalid robot: orientation is not a cardinal value', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections([invalidRobot], terrain);
        }).toThrow();
    });

    test('Mixed invalid and valid robots', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections([invalidRobot, validRobot, invalidRobot2], terrain);
        }).toThrow();
    });

    test('Robot with invalid directions', () => {
        return expect(() => {
            return robotsService.verifyRobotsAndDirections([invalidRobot3], terrain);
        }).toThrow();
    });

    test('Valid robots', () => {
        return expect(robotsService.verifyRobotsAndDirections([validRobot,validRobot], terrain)).toEqual(true);
    });
});

describe('Execute directions:', () => {
    test('Robot is not lost', () => {
        return expect(robotsService.executeDirections(robot, insideDirections, terrain)).toEqual({"isLost": false, "orientation": "E", "x": 1, "y": 1});
    });
    test('Robot is lost', () => {
        return expect(robotsService.executeDirections(robot, lostDirections, terrain)).toEqual({"isLost": true, "orientation": "E", "x": 5, "y": 1});
    });
});
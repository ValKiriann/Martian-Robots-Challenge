const robotsService = require('../../services/robot.service');
const expeditionService = require('../../services/expedition.service');

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

const terrain = new expeditionService.Terrain(5,3);

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
        const robot = new robotsService.Robot(1, 1, "E");
        const directions = ["R","F","R","F","R","F","R","F"];
        return expect(robotsService.executeDirections(robot, directions, terrain)).toEqual({"isLost": false, "orientation": "E", "x": 1, "y": 1});
    });
    test('Robot is lost', () => {
        const robot = new robotsService.Robot(3, 2, "N");
        directions= ["F","R","R","F","L","L","F","F","R","R","F","L","L"];
        return expect(robotsService.executeDirections(robot, directions, terrain)).toEqual({"isLost": true, "orientation": "N", "x": 3, "y": 3});
    });
    test('Lost robot help next robots with its scent to stay in the grid', () => {
        const robot = new robotsService.Robot(0, 3, "W");
        directions = ["L","L","F","F","F","L","F","L","F","L"];
        return expect(robotsService.executeDirections(robot, directions, terrain)).toEqual({"isLost": false, "orientation": "S", "x": 2, "y": 3});
    });
});
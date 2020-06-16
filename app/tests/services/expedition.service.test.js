const expeditionService = require('../../services/expedition.service');

describe('Verify Params: Verify Terrain is valid', () => {
    test('The service recieves the terrain object and checks if if all the coordinates are set', () => {
        return expect(() => {
            return expeditionService.verifyTerrain(undefined);
        }).toThrow();
    });

    test('Missing Coordinates', () => {
        return expect(() => {
            return expeditionService.verifyTerrain({x:3});
        }).toThrow();
    });

    test('Nan Coordinates', () => {
        return expect(() => {
            return expeditionService.verifyTerrain({x:"xy", y:"yx"});
        }).toThrow();
    });

    test('Maximum coordinate value of 50', () => {
        return expect(() => {
            return expeditionService.verifyTerrain({x:70, y:85});
        }).toThrow();
    });

    test('Valid terrain', () => {
        return expect(expeditionService.verifyTerrain({x:3, y:5})).toBeTruthy();
    });
});
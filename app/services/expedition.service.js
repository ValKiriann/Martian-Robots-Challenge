exports.verifyTerrain = (terrain) => {
    if(!terrain || !terrain.x || !terrain.y || isNaN(terrain.x) || isNaN(terrain.y) || terrain.x > 50 || terrain.y > 50) {
        throw {statusCode:400, errorCode: "Verify Params Error", errorData: "Please enter a valid terrain"}
    }
    return true;
}
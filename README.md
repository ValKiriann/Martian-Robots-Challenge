<img height=100px src ="https://cdn-icons-png.flaticon.com/512/2432/2432846.png" alt="robot-logo"/>

# Martian-Robots-Challenge
Just a quick API with Express and NodeJs to solve the Martian Robots Kata

You can check the problem at the end of the [file](#description)

## Installation

The app was built into a docker image for convenience. With docker installed, launch the container with:

```
docker run -p 3000:3000 -d anneav/martian-robots-challenge  
```


Alternatively, the app can also be launched locally by downloading the repository, installing the dependencies and then running the server. From the app folder:

```
npm i
node server.js
```

Send the requests to http://localhost:3000/expeditions

The input must be JSON, example format with 3 robots:
```JSON
{
	"terrain": {
		"x": 5,
		"y": 3
	},
	"robots": [{
		"startingPoint": {
			"x": 1,
			"y": 1,
			"orientation": "E"
		},
		"directions": ["R","F","R","F","R","F","R","F"]
	},{
		"startingPoint": {
			"x": 3,
			"y": 2,
			"orientation": "N"
		},
		"directions": ["F","R","R","F","L","L","F","F","R","R","F","L","L"]
	},{
		"startingPoint": {
			"x": 0,
			"y": 3,
			"orientation": "W"
		},
		"directions": ["L","L","F","F","F","L","F","L","F","L"]
	}]
}
```

If all the parameters are correct the API should response with a 200:
```JSON
{
  "statusCode": 200,
  "errors": [],
  "data": [
    {
      "x": 1,
      "y": 1,
      "orientation": "E",
      "isLost": false
    },
    {
      "x": 3,
      "y": 3,
      "orientation": "N",
      "isLost": true
    },
    {
      "x": 2,
      "y": 3,
      "orientation": "S",
      "isLost": false
    }
  ]
}
```

### Launching the tests

Locally, you can launch the tests and check the coverage files with:  
```
npm run test
```

## The Problem
<a name="description"></a>
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). A robot instruction is a string of the letters "L", "R", and "F" which represent, respectively, the instructions:

*   Left: the robot turns left 90 degrees and remains on the current grid point.
*   Right: the robot turns right 90 degrees and remains on the current grid point.
*   Forward: the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future andprovision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves "off" an edge of the grid is lost forever. However, lost robots leave a robot "scent" that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move "off" the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

## The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters "L", "R", and "F" on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

## The Output

For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word "LOST" should be printed after the position and orientation.

### Sample Input

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

### Sample Output

```
1 1 E
3 3 N LOST
2 3 S
```


<small>Icon designed by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></small>

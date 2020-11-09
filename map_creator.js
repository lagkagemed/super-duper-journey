//database setup
import fs from 'fs';

const path = './package.json'

try {
  if (fs.existsSync(path)) {
      console.log('File exists!')
    //file exists
  }
} catch(err) {
  console.error(err)
}

/*
// read JSON object from file
fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const user = JSON.parse(data.toString());

    // print JSON object
    console.log(user);
});
*/

let HALF_PI = 1.57079632679489661923;
let PI = 3.14159265358979323846;

let verden = [];
verden.push({
    "type": 1,
    "x": 0,
    "y": 0,
    "z": 13,
    "width": 5000,
    "depth": 2000,
    "height": 5,
    "color": "GREEN",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 6000,
    "y": 0,
    "z": 13,
    "width": 5000,
    "depth": 2000,
    "height": 5,
    "color": "GREEN",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 1300,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREEN",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 1700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREEN",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 2100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREEN",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 300,
    "z": -100,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "ORANGE",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": -100,
    "z": 0,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "LightGreen",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": -100,
    "z": -400,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "LightGreen",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 0,
    "z": 0,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "Yellow",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 0,
    "z": -400,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "Yellow",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 100,
    "z": 0,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "Blue",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 100,
    "z": -400,
    "width": 500,
    "depth": 100,
    "height": 20,
    "color": "Blue",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": 160,
    "z": -200,
    "width": 500,
    "depth": 20,
    "height": 420,
    "color": "Purple",
    "func": -1
})
verden.push({
    "type": 1,
    "x": 0,
    "y": -160,
    "z": -200,
    "width": 500,
    "depth": 20,
    "height": 420,
    "color": "Purple",
    "func": -1
})
verden.push({
    "type": 2,
    "x": -2800,
    "y": -200,
    "z": 0,
    "scale": 23,
    "rotateX": -HALF_PI,
    "rotateY": -HALF_PI,
    "rotateZ": 0,
    "model": 'humanModel',
    "fill": "RED"
})
verden.push({
    "type": 2,
    "x": -3100,
    "y": -200,
    "z": 0,
    "scale": 230,
    "rotateX": -HALF_PI,
    "rotateY": 0,
    "rotateZ": 0,
    "model": 'penguinModel',
    "fill": "RED"
})
verden.push({
    "type": 2,
    "x": -3400,
    "y": -200,
    "z": 0,
    "scale": 4,
    "rotateX": PI,
    "rotateY": 0,
    "rotateZ": 0,
    "model": 'duckModel',
    "fill": "RED"
})
verden.push({
    "type": 1,
    "x": -4000,
    "y": -900,
    "z": 13,
    "width": 3000,
    "depth": 200,
    "height": 5,
    "color": "GREY",
    "func": -1
})
verden.push({
    "type": 1,
    "x": -2800,
    "y": -1100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREEN",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3100,
    "y": -1100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "RED",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3400,
    "y": -1100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "BLUE",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3700,
    "y": -1100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "ORANGE",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -4000,
    "y": -1100,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "PURPLE",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -2800,
    "y": -700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "Aquamarine",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3100,
    "y": -700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "Chartreuse",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3400,
    "y": -700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "DarkSlateGray",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3700,
    "y": -700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "HotPink",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -4000,
    "y": -700,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "SandyBrown",
    "func": 0
})
verden.push({
    "type": 1,
    "x": -3250,
    "y": 0,
    "z": 13,
    "width": 1500,
    "depth": 200,
    "height": 5,
    "color": "GREY",
    "func": -1
})
verden.push({
    "type": 1,
    "x": -2800,
    "y": -200,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREY",
    "func": 1
})
verden.push({
    "type": 1,
    "x": -3100,
    "y": -200,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREY",
    "func": 2
})
verden.push({
    "type": 1,
    "x": -3400,
    "y": -200,
    "z": 13,
    "width": 200,
    "depth": 200,
    "height": 5,
    "color": "GREY",
    "func": 3
})


// convert JSON object to string
let verdendata = JSON.stringify(verden, null, 4);

// write JSON string to a file
fs.writeFile('user.json', verdendata, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
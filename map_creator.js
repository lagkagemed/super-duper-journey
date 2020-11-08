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

// convert JSON object to string
let verdendata = JSON.stringify(verden, null, 4);

// write JSON string to a file
fs.writeFile('user.json', verdendata, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
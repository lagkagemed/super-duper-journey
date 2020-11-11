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
    "width": 10000,
    "depth": 10000,
    "height": 5,
    "color": "Gold",
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
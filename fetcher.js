// Command line input should look like this:
// > node fetcher.js http://www.example.edu/ './abc.html'

// Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

// Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
const request = require('request');
const fs = require('fs');
const isValid = require('is-valid-path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const [url, path] = process.argv.slice(2);


const fetcher = function(url, path) {
  let data; 
  let bytes;

  // check is path provided is valid.
  if (!isValid(path)) {
    rl.close();
    return console.log('Invalid path');
  }
  request(url, (error, response, body) => {
    if (error) {
      return error;
    } else if (response.statusCode !== 200) {
      return console.log(`Status code: ${response.statusCode}`);
    } else {
      bytes = response.headers['content-length'];
      data = body;
      fs.stat(path, (err, stats)=> {
        // This is called if the file does not exist already
        if (err) {
          rl.close();
          fs.writeFile(path, data, (err) => {
            if(err) {
                return err;
            } else {
              console.log(`Downloaded and saved ${bytes} bytes to ${path}`);
            }
          });
          // This happens if the file does exist already
        } else {
          rl.question('File already exists. Type -Y to overwrite', answer => {
            if (answer === '-Y' || answer === '-y') {
              fs.writeFile(path, data, (err) => {
                if(err) {
                    return err;
                } else {
                  console.log(`Downloaded and saved ${bytes} bytes to ${path}`);
                  rl.close();
                  return;
                }
              });
            } else {
              rl.close();
              return console.log('Fetch failed.')
            }
          })
          console.log('file already exists');
        }
      })
    };
  });
};

fetcher(url, path);
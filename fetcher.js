// Command line input should look like this:
// > node fetcher.js http://www.example.edu/ ./index.html

// Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

// Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
const request = require('request');
const fs = require('fs');
const [url, path] = process.argv.slice(2);

const fetcher = function(url, path) {
  let data; 
  request(url, (error, response, body) => {
    if (error) return error;

    data = body;
    fs.writeFile(path, data, (err) => {
      if(err) {
          return err;
      }
      console.log(`Downloaded and saved ${'dunno'} bytes to ${path}`);
    });
  });
};

fetcher(url, path);
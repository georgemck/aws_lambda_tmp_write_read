//AWS Lambda Function that creates a file in the /tmp directory and adds a message. Later, reading the message
const path = require('path');
const fs = require('fs');

exports.handler = async(event) => {

    const write = file => {
        return new Promise((res, rej) => {
            fs.writeFile(file, JSON.stringify({ message: 'hello world' }), (err) => {
                if (err) {
                    return rej(err);
                }
                let content = "";
                //joining path of directory 
                const directoryPath = path.join('/tmp/', '');
                // const directoryPath = path.join(__dirname, 'Documents');

                //passsing directoryPath and callback function
                fs.readdir(directoryPath, function(err, files) {
                    if (err) { //handling error
                        return console.log('Unable to scan directory: ' + err);
                    }
                    files.forEach(function(file) { //listing all files using forEach
                        console.log(file); //print filename
                        content = fs.readFileSync(directoryPath + file, { encoding: 'utf8', flag: 'r' }); //open file for reading
                        console.log("content", content); // Display the file content 
                    });
                    return res({
                        statusCode: 200,
                        body: JSON.stringify({ message: 'File ' + file + ' written to and read from successfully with content: ' + content })
                    });
                });
            });
        });
    };

    const filepath = '/tmp/world.json'; //file to be written
    return write(filepath);
};

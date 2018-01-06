const fs = require('fs');

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(filePath);
        let fileContent = "";
        readStream.on('open', () => {
            fileContent = "";
        });
        readStream.on('data', (chunk) => {
            fileContent = fileContent.concat(String(chunk, "utf-8"));
        });
        readStream.on('end', () => {
            resolve(fileContent);
        })
        readStream.on('error', (error) => {
            reject(error);
        });
    });
}

const printContent = (content) => console.log(content);

readFile("/home/agnibha/NewDesiJokeBot:philjokes").then(printContent).catch(printContent);
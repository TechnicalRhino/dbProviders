const path = require('path');
const fs = require('fs');
const { Utils, Constants } = require('../common');
const { promisify } = require('util');
const DBProviderException = require('../exception');

const mkdirPromised = promisify(fs.mkdir);
const pathToMetaFolder = path.resolve(process.cwd(), Constants.DB_FOLDER_NAME);
const pathToMetaFile = path.resolve(pathToMetaFolder, Constants.META_FILE_NAME)

class MetaService {
    static getMeta() {
        return new Promise((resolve, reject) => {
            fs.access(pathToMetaFolder, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                if (error) {
                    if (error.code === "ENOENT") return resolve({});
                    else return reject(error);
                }
                return readFromMetaFile;
            });
        });
    }

    static createMeta(providerName, metadata) {
        return mkdirPromised(pathToMetaFolder).then(() => {
            return writeIntoMetaFile({ providerName: metadata });
        });
    }

    static updateMeta(providerName, providerMeta, metadata) {
        metadata[providerName] = providerMeta;
        return writeIntoMetaFile(metadata);
    }
}

const writeIntoMetaFile = (content) => {
    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream(pathToMetaFile);
        writeStream.write(JSON.stringify(content));
        writeStream.on('error', (error) => {
            reject(error);
        });
        writeStream.on('close', () => {
            resolve(metadata);
        });
    });
}

const readFromMetaFile = () => {
    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(pathToMetaFile);
        let contentOfMetaFile = "";
        readStream.on('data', (chunk) => {
            contentOfMetaFile = contentOfMetaFile.concat(String(chunk, 'utf-8'));
        });
        readStream.on('end', () => resolve(contentOfMetaFile));
        readStream.on('error', error => reject(error));
    });
}


module.exports = MetaService;
import * as  path from 'path';
import * as  fs from 'fs';
import { Utils, Constants } from "../common";
import { promisify } from 'util';
import { write, WriteStream } from 'fs';

const mkdirPromised = promisify(fs.mkdir);

class MetaService {

    static getMeta() {
        return new Promise((resolve, reject) => {
            let pathToDBMeta = path.resolve(process.cwd(), Constants.DB_FOLDER_NAME);
            fs.access(path.pathToDBMeta, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                if (error) {
                    if (error.code === "ENOENT") return resolve({});
                    else return reject(error);
                }
                let pathToMetaFile = path.resolve(pathToDBMeta, Constants.META_FILE_NAME);
                fs.readFile(pathToMetaFile, { encoding: "utf-8", flag: "r" }, (error, data) => {
                    let metadata = Utils.tryParseJSON(data) || {};
                    resolve(metadata);
                });
            });
        });
    }

    static createMeta(providerName, metadata) {
        let pathToMetaFolder = path.resolve(process.cwd(), Constants.DB_FOLDER_NAME);
        return mkdirPromised(pathToMetaFolder).then(() => {
            return new Promise((resolve, reject) => {
                let pathToMetaFile = path.resolve(pathToMetaFolder, Constants.META_FILE_NAME);
                let writeStream = fs.createWriteStream(pathToMetaFile);
                writeStream.write(JSON.stringify({ providerName: metadata }));
                writeStream.on('error', (error) => {
                    reject(error);
                });
                writeStream.on('close', () => {
                    resolve(metadata);
                });
            });
        });
    }

    static updateMetadata() {

    }
}


module.exports = MetaService;
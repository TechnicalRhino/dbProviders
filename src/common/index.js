class Utils {
    static tryParseJSON(jsonStr) {
        try {
            let obj = JSON.parse(jsonStr);
            if (obj && typeof obj === "object") {
                return obj;
            }
        } catch (e) {
        }
        return false;
    }

    static isEmpty(argument) {
        if (argument) {
            if (argument instanceof String) {
                return argument.length === 0;
            } else if (argument instanceof Object) {
                return Object.keys(argument).length === 0;
            }
        }
        return true;
    }
}

class Constants {
    static META_FILE_NAME = "meta.json";
    static DB_FOLDER_NAME = ".dbmeta";
    static LOCAL_PROVIDER = "Local";
}

module.exports.Utils = Utils;
module.exports.Constants = Constants;
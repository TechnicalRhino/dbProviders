const DBProviderException = require('../exception');
const Options = require('../options');

class ProviderService {
    static initateAndFetchProvider(options) {
        return validateProvider(options)
            .then(getProvider)
            .then(initiateProvider)
            .catch((error) => {
                throw new DBProviderException(error, options);
            })
            .catch(exceptionHandler);
    }
}

/**
 * 
 * @param {*} options 
 */
const validateProvider = (options) => {
    return Options.va(options);
}

/**
 * 
 * @param {*} providerMeta 
 */
const getProvider = (providerMeta) => {
    return Providers.fetch(providerMeta);
}

/**
 * @param {DBProviderException} - Get the ExceptionWrapper
 */
const exceptionHandler = (error) => {
    return error.logException();
}


module.exports = ProviderService;
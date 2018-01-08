const { Utils } = require('./src/common');
const ProviderService = require('./src/provider');

module.exports = (options = {}) => {
    if (Utils.isEmpty(options)) {
        return Promise.reject("Empty Options Provided");
    }
    return ProviderService.initiateAndFetchProvider(options);
};
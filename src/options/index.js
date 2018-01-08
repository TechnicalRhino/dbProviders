const { Utils, Constants } = require('../common');
const MetaService = require('../metaservice');
const has = Object.prototype.hasOwnProperty;

class Options {
    static validateAndFetchMeta(options) {
        return MetaService.getMeta(options).then(metadata => {
            let isMetaEmpty = Utils.isEmpty(metadata);
            let providerName = options.provider;
            if (!isMetaEmpty && has.call(metadata, providerName)) {
                return metadata[providerName];
            }
            return fetchMetaDetails(options).then(providerMeta => {
                if (isMetaEmpty) {
                    return MetaService.createMeta(providerName, providerMeta);
                } else {
                    return MetaService.updateMeta(providerName, providerMeta, metadata);
                }
            });
        });
    }
}

const fetchMetaDetails = (options) => {
    if (options.provider !== Constants.LOCAL_PROVIDER) {
        return PackageControl.fetchProviderDetails(options.provider).then(providerMetaDetails => {
            if (Utils.isEmpty(providerMetaDetails)) {
                throw new Error(`Provider => ${options.provider} not found in our system. Please verify.`);
            }
            return providerMetaDetails;
        });
    }
    return Constants.LOCAL_PROVIDER_METADATA;
};

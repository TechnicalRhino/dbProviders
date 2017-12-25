import { Constants } from './src/common/index';
import * as ProviderService from './src/Provider/index';

module.exports = ({
    provider = Constants.LOCAL_PROVIDER,
    ...rest
} = {}) => {
    return ProviderService.initiateAndFetchProvider({ provider, rest });
};
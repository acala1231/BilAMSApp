import axios from "axios";

import * as constants from '../constants'


export const callCmsApi = (param) => {
    const method = param.method && param.method == 'post' ? 'post' : 'get';
    const url = constants.HOST_CMS_API + param.url;
    const params = param.params
    const config = { headers: { 'Content-Type': 'application/json' } };

    if (method == 'post') {
        return axios.post(url, params, config);
    } else {
        return axios.get(url, params, config);
    }
};
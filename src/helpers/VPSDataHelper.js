require('dotenv').config()
const fetch = require('node-fetch')

class VPSDataHelper {
    constructor() {}

    async getJson() {
        const res = await fetch(process.env.VPS_DATA_URI);
        const json = await res.json();
        return json;
    }
}

module.exports.VPSDataHelper = VPSDataHelper
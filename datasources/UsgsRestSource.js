const { RESTDataSource } = require('apollo-datasource-rest');

const reduceWaterservicesModel = require('../utils/waterServiceModelReducer');

module.exports = class UsgsRestSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://waterservices.usgs.gov/nwis/iv/';
    }

    async getSiteBySiteCode(siteCode) {
        if(siteCode.includes("USGS"))
        {
            var code = siteCode.split(':')[1];
            const results =  await this.get(`?format=json&site=${code}`);
            const sitesToReturn = results.value.timeSeries.filter(site => {
                return site.name === siteCode;
            });

            return sitesToReturn.map(reduceWaterservicesModel);
        }
        else
        {
            var code = siteCode.split(':')[0];
            return await this.get(`?format=json&site=${code}`);
        }
    }

    async getSitesByStateCode(stateCode, status = 'ALL') {
        return await this.get(`?format=json&stateCd=${stateCode}&siteStatus=${status}`);
    }

    async getSitesBySiteType(siteType, status = 'ALL') {
        return await this.get(`?format=json&siteType=${siteType}&siteStatus=${status}`);
    }

    async getSitesByStateCodeAndType(stateCode, siteType, status = 'ALL') {
        return await this.get(`?format=json&stateCd=${stateCode}&siteType=${siteType}&siteStatus=${status}`);
    }
};
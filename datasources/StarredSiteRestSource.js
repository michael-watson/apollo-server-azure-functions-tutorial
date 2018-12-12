const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class StarredSiteRestSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://apollo-server-azure-functions-rest-api.azurewebsites.net/api/';
    }

    async postStarredSiteState(email, siteCode, isFavorite) {
        let body = {
            "siteCode": siteCode,
            "isFavorite": isFavorite
        };
        return await this.post(`starred/${email}?code=sxkF8hugACYGb5j67y7ygcKQrGOhc8saOSWp8FO5nNWV4LGyjs/JwA==`, body);
    }

    async getStarredSitesByEmail(email) {
        return await this.get(`starred/${email}?code=sxkF8hugACYGb5j67y7ygcKQrGOhc8saOSWp8FO5nNWV4LGyjs/JwA==`);
    }
};
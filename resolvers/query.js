const { ApolloError } = require('apollo-server');

const reduceWaterservicesModel = require('../utils/waterServiceModelReducer');

module.exports = {
	Query: {
        myStarredSites : async (root, { email }, { dataSources }) => {
            const starredSites = await dataSources.starredSiteRestSource.getStarredSitesByEmail(email);
            var sitesToReturn = new Array();

            for (let index = 0; index < starredSites.length; index++) {
                var siteDetails = await dataSources.usgsRestSource.getSiteBySiteCode(starredSites[index].siteCode);
                var sensorsAtSite = siteDetails.value.timeSeries.find(function(element){
                    return element.name == starredSites[index].siteCode;
                });

                const siteToAdd = {
                    "isFavorite":true,
                    ...sensorsAtSite
                };

                siteDetails.isFavorite = true;

                sitesToReturn.push(siteToAdd);
            }

            return sitesToReturn.map(reduceWaterservicesModel);
        },
		sites: async (root, {stateCode, siteCode, siteType, status}, context) => {
            let results;
            
            if(siteCode)
                return await context.dataSources.usgsRestSource.getSiteBySiteCode(siteCode);
            else if (typeof stateCode == 'undefined' && typeof siteType == 'undefined')
                return new ApolloError('You must provide a state code or type of site to search for');
            else if(typeof stateCode == 'undefined')
                results = await context.dataSources.usgsRestSource.getSitesBySiteType(siteType, status);
            else if(typeof siteType == 'undefined')
                results = await context.dataSources.usgsRestSource.getSitesByStateCode(stateCode, status);
            else 
                results = await context.dataSources.usgsRestSource.getSitesByStateCodeAndType(stateCode, siteType, status);
            
            return results.value.timeSeries.map(reduceWaterservicesModel);
		},
	}
};
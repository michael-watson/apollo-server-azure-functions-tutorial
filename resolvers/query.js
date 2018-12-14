const { ApolloError } = require('apollo-server');

const reduceWaterservicesModel = require('../utils/waterServiceModelReducer');

module.exports = {
	Query: {
        myStarredSites : async (root, { email }, { dataSources }) => {
            const starredSites = await dataSources.starredSiteRestSource.getStarredSitesByEmail(email);
            var starredSites = new Array();

            await Promise.all(starredSites.map(site => dataSources.usgsRestSource.getSiteBySiteCode(site.siteCode))).then(allSiteDetails => {
                allSiteDetails.map(siteDetails => {
                    var sensorsAtSite = siteDetails[0];

                    const siteToAdd = {
                        "isFavorite":true,
                        ...siteDetails[0]
                    };

                    starredSites.push(siteToAdd);
                })
            });

            return starredSites;
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
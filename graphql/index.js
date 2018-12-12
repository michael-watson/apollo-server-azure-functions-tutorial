const typeDefs = require('../shared/schema');
const resolvers = require('../resolvers');
const UsgsRestSource = require('../datasources/UsgsRestSource');
const StarredSiteRestSource = require('../datasources/StarredSiteRestSource');

const { ApolloServer } = require('apollo-server-azure-functions');

const mocks = {
	Int: () => 6,
	Float: () => 22.1,
	String: () => 'Truckee River'
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	mocks,
	mockEntireSchema: false,
	dataSources: () => ({
		usgsRestSource: new UsgsRestSource(),
		starredSiteRestSource : new StarredSiteRestSource()
	}),
	engine: {
		privateVariables: [ '' ],
		privateHeaders: [ '' ]
	}
});

module.exports = server.createHandler();
const resolvers = require('../resolvers');
const UsgsRestSource = require('../datasources/UsgsRestSource');
const StarredSiteRestSource = require('../datasources/StarredSiteRestSource');

const { ApolloServer } = require('apollo-server-azure-functions');

const fs = require('fs');
const path =require('path');
const typeDefs = [fs.readFileSync(path.join(__dirname, "../shared/schema.graphql"), "utf8")];

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
		privateHeaders: [ '' ],
		schemaTag: process.env['ENGINE_SCHEMA_TAG']
	}
});

module.exports = server.createHandler();
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    myStarredSites(email: String!): [Site]
    sites(stateCode: String siteType: String status:SiteStatus siteCode: String) : [Site]
  }

  type Mutation {
    favoriteSite(email: String! siteCode: String! isFavorite: Boolean): Site
  }

  type Site {
    """
    Name of site where the sensor is located
    """
    name: String
    """
    Unique code identifier for the sensor
    """
    siteCode: String
    latitude: Float
    longitude: Float
    """
    Measurement readings from sensors
    """
    measuredData: MeasuredData
    isFavorite: Boolean
  }

  type MeasuredData {
    unit: String
    unitDescription: String
    measurements: [Measurement]
  }

  type Measurement {
    measuredValue: String
    dateMeasured: String
  }

  enum SiteStatus {
    ALL
    ACTIVE
    INACTIVE
  }
`;

module.exports = typeDefs;
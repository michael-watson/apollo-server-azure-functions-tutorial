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
    Unique identifier for the site/sensor
    """
    id: ID!
    siteCode: String @deprecated(reason: "Use 'id' instead")
    latitude: Float
    longitude: Float
    """
    Measurement readings from sensors
    """
    measuredData: MeasuredData
    isFavorite: Boolean
  }

  type MeasuredData {
    """
    The unit you would typically see right after the reading
    """
    unit: String
    """
    Describes the unit and what it means
    """
    unitDescription: String
    """
    These are the various sensor readings over the given timeframe
    """
    measurements: [Measurement]
  }

  type Measurement {
    """
    Measurement reading from the sensor
    """
    measuredValue: String
    """
    Date and time the measurement was taken on the sensor
    """
    dateMeasured: String
  }

  enum SiteStatus {
    ALL
    ACTIVE
    INACTIVE
  }
`;

module.exports = typeDefs;
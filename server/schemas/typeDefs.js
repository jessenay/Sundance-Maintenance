const { gql } = require('apollo-server');

const typeDefs = gql`
type Profile {
  _id: ID
  username: String
  email: String
}

type AuthPayload {
  token: String
  user: Profile
}

type Query {
  profiles: [Profile]
  profile: Profile
}

type Mutation {
  createAccount(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
}
`;

module.exports = typeDefs;

const { gql } = require('apollo-server');

const typeDefs = gql`
type Profile {
  _id: ID
  username: String
  email: String
}

type Lift {
  _id: ID!
  name: String!
  components: [Component]
}

type Component {
  _id: ID!
  name: String!
  services: [Service]
}

type Service {
  _id: ID!
  dateCompleted: String
  reason: String
  workDecription: String
  partsUsed: String
  completedBy: String
}

type AuthPayload {
  token: String
  user: Profile
}

type Query {
  profiles: [Profile]
  profile: Profile
  lifts: [Lift]
  lift(_id: ID!): Lift
  component(_id: ID!): Component
}

type Mutation {
  createAccount(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  addService(componentId: ID!, dateCompleted: String!, reason: String!, workDescription: String!, partsUsed: String!, completedBy: String!): Service
  addLift(name: String!): Lift
  addComponent(name: String!, liftId: ID!): Component
}
`;

module.exports = typeDefs;

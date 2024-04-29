const { gql } = require('apollo-server');

const typeDefs = gql`
type Profile {
  _id: ID
  username: String
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

type AnnualService {
  _id: ID!
  task: String
  dateCompleted: String
  completedBy: String
  testValues: String
  notes: String
  procedureLocations: String
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
  components: [Component]
  component(_id: ID!): Component
  annualServices(componentId: ID!): [AnnualService]
}

type Mutation {
  createAccount(username: String!, password: String!): AuthPayload
  login(username: String!, password: String!): AuthPayload
  addService(componentId: ID!, dateCompleted: String!, reason: String!, workDescription: String!, partsUsed: String!, completedBy: String!): Service
  addAnnualService(componentId: ID!, task: String!, dateCompleted: String!, completedBy: String!, testValues: String, notes: String, procedureLocations: String): AnnualService
  addLift(name: String!): Lift
  addComponent(name: String!, liftId: ID!): Component
  addComponentToLifts(name: String!, liftIds: [ID!]!): Component
}
`;

module.exports = typeDefs;

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
  towers: [Tower]
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
  workDescription: String
  partsUsed: String
  completedBy: String
}

type TowerService {
  _id: ID!
  dateCompleted: String
  uphillOrDownhill: String
  workDescription: String
  partsUsed: String
  completedBy: String
}

type Tower {
  _id: ID!
  name: String!
  services: [TowerService]
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
  services(componentId: ID!): [Service]
  towerServices (towerId: ID!): [TowerService]
}

type Mutation {
  addTower(name: String!, liftId: ID!): Tower
  createAccount(username: String!, password: String!): AuthPayload
  login(username: String!, password: String!): AuthPayload
  addAnnualService(componentId: ID!, task: String!, dateCompleted: String!, completedBy: String!, testValues: String, notes: String, procedureLocations: String): AnnualService
  addService(componentId: ID!, dateCompleted: String!, reason: String!, workDescription: String!, partsUsed: String!, completedBy: String!): Service
  addTowerService(towerId: ID!, dateCompleted: String!, uphillOrDownhill: String!, workDescription: String!, partsUsed: String!, completedBy: String!): TowerService
  addLift(name: String!): Lift
  addComponent(name: String!, liftId: ID!): Component
  addComponentToLifts(name: String!, liftIds: [ID!]!): Component
}
`;

module.exports = typeDefs;

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

type Part {
  _id: ID!
  name: String!
  cost: Float!
}

input PartInput {
  name: String!
  cost: Float!
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

type WorkOrder {
  _id: ID!
  job: String
  personnel: [String]
  toolsRequired: [String]
  partsUsed: [Part]
  timeWorked: String
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
  tower(_id: ID!): Tower
  towers: [Tower]
  components: [Component]
  component(_id: ID!): Component
  annualServices(componentId: ID!): [AnnualService]
  services(componentId: ID!): [Service]
  towerServices (towerId: ID!): [TowerService]
  workOrders: [WorkOrder]
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
  addComponentsToLift(liftId: ID!, components: [String!]!): Lift
  addTowersToLift(liftId: ID!, towerNames: [String!]!): Lift
  addWorkOrder(job: String!, personnel: [String]!, toolsRequired: [String]!, partsUsed: [PartInput]!, timeWorked: String!): WorkOrder
}
`;

module.exports = typeDefs;
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String
    role: String
  }

  type Lift {
    _id: ID!
    name: String!
    components: [Component]
    towers: [Tower]
  }

  type Todo {
    _id: ID!
    job: String!
  }

  type Component {
    _id: ID!
    name: String!
    services: [Service]
    procedures: [Procedure]
  }

  type Service {
    _id: ID!
    component: ID!
    dateCompleted: String!
    reason: String!
    workDescription: String!
    partsUsed: String!
    completedBy: String!
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

  type WorkOrder {
    _id: ID!
    job: String
    personnel: [String]
    toolsRequired: [String]
    partsUsed: [Part]
    timeWorked: String
  }

  type Procedure {
    _id: ID!
    name: String
    description: String
  }

  type AuthPayload {
    token: String
    user: Profile
  }

  type WinterTask {
    _id: ID!
    name: String!
    completed: Boolean!
    initials: String
    dateCompleted: String
  }

  type SpringTask {
    _id: ID!
    name: String!
    completed: Boolean!
    initials: String
    dateCompleted: String
  }

  type SummerTask {
    _id: ID!
    name: String!
    completed: Boolean!
    initials: String
    dateCompleted: String
  }

  type FallTask {
    _id: ID!
    name: String!
    completed: Boolean!
    initials: String
    dateCompleted: String
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
    annualServices(componentId: ID!, month: Int, year: Int): [AnnualService]
    services(componentId: ID!, month: Int, year: Int): [Service]
    towerServices(towerId: ID!, month: Int, year: Int): [TowerService]
    workOrders: [WorkOrder]
    procedures(componentId: ID!): [Procedure]
    todos: [Todo]
    winterTasks: [WinterTask]
    springTasks: [SpringTask]
    summerTasks: [SummerTask]
    fallTasks: [FallTask]
  }

  type Mutation {
    addTower(name: String!, liftId: ID!): Tower
    createAccount(username: String!, password: String!, role: String!): Profile
    login(username: String!, password: String!): AuthPayload
    addAnnualService(componentId: ID!, task: String!, dateCompleted: String!, completedBy: String!, testValues: String, notes: String, procedureLocations: String): AnnualService
    addService(componentId: ID!, dateCompleted: String!, reason: String!, workDescription: String!, partsUsed: String!, completedBy: String!): Service
    addTowerService(towerId: ID!, dateCompleted: String!, uphillOrDownhill: String!, workDescription: String!, partsUsed: String!, completedBy: String!): TowerService
    addLift(name: String!): Lift
    addComponent(name: String!, liftId: ID!): Component
    addComponentsToLift(liftId: ID!, components: [String!]!): Lift
    addTowersToLift(liftId: ID!, towerNames: [String!]!): Lift
    addWorkOrder(job: String!, personnel: [String], toolsRequired: [String], partsUsed: [PartInput], timeWorked: String): WorkOrder
    addProcedure(name: String!, description: String!, componentId: ID!): Procedure
    addTodo(job: String!): Todo
    removeTodo(_id: ID!): Todo
    addWinterTask(name: String!): WinterTask
    toggleWinterTask(_id: ID!, initials: String, dateCompleted: String): WinterTask
    uncheckAllWinterTasks: [WinterTask]
    deleteWinterTask(_id: ID!): WinterTask
    addSpringTask(name: String!): SpringTask
    toggleSpringTask(_id: ID!, initials: String, dateCompleted: String): SpringTask
    uncheckAllSpringTasks: [SpringTask]
    deleteSpringTask(_id: ID!): SpringTask
    addSummerTask(name: String!): SummerTask
    toggleSummerTask(_id: ID!, initials: String, dateCompleted: String): SummerTask
    uncheckAllSummerTasks: [SummerTask]
    deleteSummerTask(_id: ID!): SummerTask
    addFallTask(name: String!): FallTask
    toggleFallTask(_id: ID!, initials: String, dateCompleted: String): FallTask
    uncheckAllFallTasks: [FallTask]
    deleteFallTask(_id: ID!): FallTask
    deleteAnnualService(_id: ID!): AnnualService
    deleteService(_id: ID!): Service
    deleteWorkOrder(_id: ID!): WorkOrder
    deleteTowerService(_id: ID!): TowerService
  }
`;

module.exports = typeDefs;

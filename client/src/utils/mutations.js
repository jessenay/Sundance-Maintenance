import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ANNUAL_SERVICE = gql`
mutation AddAnnualService($componentId: ID!, $task: String!, $dateCompleted: String!, $completedBy: String!, $testValues: String, $notes: String, $procedureLocations: String) {
  addAnnualService(componentId: $componentId, task: $task, dateCompleted: $dateCompleted, completedBy: $completedBy, testValues: $testValues, notes: $notes, procedureLocations: $procedureLocations) {
    _id
    task
    dateCompleted
    completedBy
    testValues
    notes
    procedureLocations
  }
}
`;

export const ADD_SERVICE = gql`
mutation AddService($componentId: ID!, $dateCompleted: String!, $reason: String!, $workDescription: String!, $partsUsed: String!, $completedBy: String!) {
  addService(componentId: $componentId, dateCompleted: $dateCompleted, reason: $reason, workDescription: $workDescription, partsUsed: $partsUsed, completedBy: $completedBy) {
    _id
    dateCompleted
    reason
    workDescription
    partsUsed
    completedBy
  }
}
`;

export const ADD_TOWER = gql`
  mutation AddTower($name: String!, $liftId: ID!) {
    addTower(name: $name, liftId: $liftId) {
      _id
      name
    }
  }
`;

export const ADD_TOWER_SERVICE = gql`
mutation AddTowerService($towerId: ID!, $dateCompleted: String!, $uphillOrDownhill: String!, $workDescription: String!, $partsUsed: String!, $completedBy: String!) {
  addTowerService(towerId: $towerId, dateCompleted: $dateCompleted, uphillOrDownhill: $uphillOrDownhill, workDescription: $workDescription, partsUsed: $partsUsed, completedBy: $completedBy) {
    _id
    dateCompleted
    uphillOrDownhill
    workDescription
    partsUsed
    completedBy
  }
}
`;

export const ADD_WORK_ORDER = gql`
  mutation AddWorkOrder($job: String!, $personnel: [String]!, $toolsRequired: [String]!, $partsUsed: [PartInput]!, $timeWorked: String!) {
    addWorkOrder(job: $job, personnel: $personnel, toolsRequired: $toolsRequired, partsUsed: $partsUsed, timeWorked: $timeWorked) {
      _id
      job
      personnel
      toolsRequired
      partsUsed {
        _id
        name
        cost
      }
      timeWorked
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($job: String!) {
    addTodo(job: $job) {
      _id
      job
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($_id: ID!) {
    removeTodo(_id: $_id) {
      _id
      job
    }
  }
`;

export const ADD_PROCEDURE = gql`
  mutation AddProcedure($name: String!, $description: String!, $componentId: ID!) {
    addProcedure(name: $name, description: $description, componentId: $componentId) {
      _id
      name
      description
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!) {
    createAccount(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
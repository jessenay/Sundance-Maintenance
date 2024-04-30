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
